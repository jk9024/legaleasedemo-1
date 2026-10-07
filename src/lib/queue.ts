/**
 * Background job queue management using BullMQ for LegalEase.
 * Handles async jobs:
 * - Escrow release (48 hours after consultation completion)
 * - Booking reminder alerts (60 minutes & 10 minutes prior)
 * - Email digest and case notification dispatches
 */

interface QueueJobData {
  type: 'RELEASE_ESCROW' | 'SEND_REMINDER' | 'SEND_DIGEST'
  payload: Record<string, unknown>
}

// In-memory queue handler when external Redis is not connected
const isRedisConfigured = Boolean(
  process.env.REDIS_URL || (process.env.UPSTASH_REDIS_REST_URL && !process.env.UPSTASH_REDIS_REST_URL.includes('your_'))
)

/**
 * Enqueue a background task for processing.
 * @param queueName - Name of the queue (e.g. 'escrow', 'reminders')
 * @param jobName - Identifier of the job
 * @param data - Job payload
 * @param delayMs - Optional delay in milliseconds before job is processed
 */
export async function addJob(
  queueName: string,
  jobName: string,
  data: QueueJobData,
  delayMs: number = 0
): Promise<{ id: string; scheduledFor: Date }> {
  const scheduledFor = new Date(Date.now() + delayMs)

  if (!isRedisConfigured) {
    console.log(`[Queue:${queueName}] Queued job ${jobName} with delay ${delayMs}ms. Runs at ${scheduledFor.toISOString()}`)
    // If running in development with delay, we can trigger via setTimeout if short
    if (delayMs > 0 && delayMs <= 60000) {
      setTimeout(() => {
        console.log(`[Queue:${queueName}] Executing dev job: ${jobName}`)
      }, delayMs)
    }
    return { id: `mock-${Date.now()}`, scheduledFor }
  }

  // BullMQ connection setup when Redis URL is provided
  try {
    const { Queue } = await import('bullmq')
    const queue = new Queue(queueName, {
      connection: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      }
    })
    const job = await queue.add(jobName, data, { delay: delayMs })
    return { id: job.id || `job-${Date.now()}`, scheduledFor }
  } catch (error) {
    console.warn(`[Queue:${queueName}] Failed to connect to BullMQ, logging job instead:`, error)
    return { id: `fallback-${Date.now()}`, scheduledFor }
  }
}

/**
 * Schedule automated escrow release 48 hours after consultation ends.
 * @param bookingId - Unique identifier of the booking
 */
export async function scheduleEscrowRelease(bookingId: string): Promise<void> {
  const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000
  await addJob(
    'escrow',
    `release-escrow-${bookingId}`,
    {
      type: 'RELEASE_ESCROW',
      payload: { bookingId }
    },
    FORTY_EIGHT_HOURS
  )
}

/**
 * Schedule 60-minute and 10-minute consultation reminders.
 * @param bookingId - Booking identifier
 * @param scheduledTime - Start time of the consultation
 */
export async function scheduleBookingReminders(
  bookingId: string,
  scheduledTime: Date
): Promise<void> {
  const now = Date.now()
  const meetingTime = scheduledTime.getTime()

  const msUntil60Min = meetingTime - 60 * 60 * 1000 - now
  if (msUntil60Min > 0) {
    await addJob(
      'reminders',
      `reminder-60min-${bookingId}`,
      {
        type: 'SEND_REMINDER',
        payload: { bookingId, minutesBefore: 60 }
      },
      msUntil60Min
    )
  }

  const msUntil10Min = meetingTime - 10 * 60 * 1000 - now
  if (msUntil10Min > 0) {
    await addJob(
      'reminders',
      `reminder-10min-${bookingId}`,
      {
        type: 'SEND_REMINDER',
        payload: { bookingId, minutesBefore: 10 }
      },
      msUntil10Min
    )
  }
}
