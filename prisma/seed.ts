import { PrismaClient, Role, ConsultationType, PricingModel, BookingStatus, PaymentStatus, LawyerPlan } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting LegalEase database seed...')

  // 1. Password hashes
  const adminHash = await bcrypt.hash('Admin@123', 10)
  const lawyerHash = await bcrypt.hash('Lawyer@123', 10)
  const studentHash = await bcrypt.hash('Student@123', 10)
  const clientHash = await bcrypt.hash('Test@123', 10)

  // 2. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@legalease.in' },
    update: {},
    create: {
      email: 'admin@legalease.in',
      name: 'LegalEase Administrator',
      password: adminHash,
      role: Role.ADMIN,
      city: 'Hyderabad',
      state: 'Telangana',
      language: 'English',
      isActive: true,
      emailVerified: new Date(),
    },
  })
  console.log(`✅ Admin seeded: ${admin.email}`)

  // 3. Create Lawyers
  // 1. Priya Sharma
  const priyaUser = await prisma.user.upsert({
    where: { email: 'priya@legalease.in' },
    update: {},
    create: {
      email: 'priya@legalease.in',
      name: 'Adv. Priya Sharma',
      password: lawyerHash,
      role: Role.LAWYER,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543201',
      language: 'Telugu',
      isActive: true,
      emailVerified: new Date(),
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
  })

  const priya = await prisma.lawyer.upsert({
    where: { userId: priyaUser.id },
    update: {},
    create: {
      userId: priyaUser.id,
      barCouncilId: 'BAR/TS/2012/001',
      enrollmentYear: 2012,
      specializations: ['Civil Law', 'Property Law', 'RERA', 'Land Acquisition', 'Tenant Rights'],
      experienceYears: 12,
      court: 'Telangana High Court',
      bio: 'Senior advocate specialising in property disputes and land titles. Represented 500+ cases at Telangana High Court and Civil Courts since 2012.',
      education: 'NALSAR University of Law, 2012',
      feePerHour: 599,
      feePerMinute: 12,
      pricingModel: PricingModel.PER_HOUR,
      minimumMinutes: 15,
      emergencyFee: 999,
      consultationTypes: ['VIDEO', 'PHONE', 'INPERSON'],
      languages: ['Telugu', 'Hindi', 'English'],
      isVerified: true,
      isOnline: true,
      isEmergencyAvailable: true,
      extensionAutoApprove: true,
      subscriptionPlan: LawyerPlan.PRO,
      rating: 4.9,
      reviewCount: 312,
      successRate: 87.0,
      responseTime: 15.0,
      totalEarnings: 186888,
      totalConsultations: 312,
      profileViews: 1420,
      availableDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      referralCode: 'PRIYA2012',
    },
  })

  // 2. Anjali Kapoor
  const anjaliUser = await prisma.user.upsert({
    where: { email: 'anjali@legalease.in' },
    update: {},
    create: {
      email: 'anjali@legalease.in',
      name: 'Adv. Anjali Kapoor',
      password: lawyerHash,
      role: Role.LAWYER,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543202',
      language: 'English',
      isActive: true,
      emailVerified: new Date(),
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80',
    },
  })

  const anjali = await prisma.lawyer.upsert({
    where: { userId: anjaliUser.id },
    update: {},
    create: {
      userId: anjaliUser.id,
      barCouncilId: 'BAR/TS/2016/042',
      enrollmentYear: 2016,
      specializations: ['Family Law', 'Divorce', 'Child Custody', 'Domestic Violence', 'Alimony'],
      experienceYears: 8,
      court: 'Hyderabad Family Court',
      bio: 'Dedicated family law advocate committed to compassionate mediation, fair child custody, and mutual separation settlements.',
      education: 'Symbiosis Law School, Pune',
      feePerHour: 799,
      feePerMinute: 15,
      pricingModel: PricingModel.PER_HOUR,
      minimumMinutes: 20,
      emergencyFee: 1299,
      consultationTypes: ['VIDEO', 'INPERSON'],
      languages: ['Telugu', 'Hindi', 'English', 'Urdu'],
      isVerified: true,
      isOnline: true,
      isEmergencyAvailable: false,
      extensionAutoApprove: false,
      subscriptionPlan: LawyerPlan.ELITE,
      rating: 4.8,
      reviewCount: 245,
      successRate: 91.0,
      responseTime: 20.0,
      totalEarnings: 195755,
      totalConsultations: 245,
      profileViews: 1180,
      availableDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      referralCode: 'ANJALI2016',
    },
  })

  // 3. Suresh Reddy
  const sureshUser = await prisma.user.upsert({
    where: { email: 'suresh@legalease.in' },
    update: {},
    create: {
      email: 'suresh@legalease.in',
      name: 'Adv. Suresh Reddy',
      password: lawyerHash,
      role: Role.LAWYER,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543203',
      language: 'Telugu',
      isActive: true,
      emailVerified: new Date(),
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    },
  })

  await prisma.lawyer.upsert({
    where: { userId: sureshUser.id },
    update: {},
    create: {
      userId: sureshUser.id,
      barCouncilId: 'BAR/TS/2018/089',
      enrollmentYear: 2018,
      specializations: ['Labour Law', 'Employment', 'PF', 'ESIC', 'Wrongful Termination'],
      experienceYears: 6,
      court: 'Hyderabad Labour Court',
      bio: 'Employment rights advocate helping corporate employees, gig workers, and factory staff recover dues, gratuity, and severance.',
      education: 'Osmania University Law College',
      feePerHour: 499,
      feePerMinute: 10,
      pricingModel: PricingModel.PER_MINUTE,
      minimumMinutes: 15,
      emergencyFee: 799,
      consultationTypes: ['VIDEO', 'PHONE'],
      languages: ['Telugu', 'English'],
      isVerified: true,
      isOnline: true,
      isEmergencyAvailable: true,
      extensionAutoApprove: true,
      subscriptionPlan: LawyerPlan.PRO,
      rating: 4.7,
      reviewCount: 189,
      successRate: 83.0,
      responseTime: 10.0,
      totalEarnings: 94311,
      totalConsultations: 189,
      profileViews: 920,
      availableDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      referralCode: 'SURESH2018',
    },
  })

  // 4. Fatima Khan
  const fatimaUser = await prisma.user.upsert({
    where: { email: 'fatima@legalease.in' },
    update: {},
    create: {
      email: 'fatima@legalease.in',
      name: 'Adv. Fatima Khan',
      password: lawyerHash,
      role: Role.LAWYER,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543204',
      language: 'Urdu',
      isActive: true,
      emailVerified: new Date(),
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
  })

  await prisma.lawyer.upsert({
    where: { userId: fatimaUser.id },
    update: {},
    create: {
      userId: fatimaUser.id,
      barCouncilId: 'BAR/TS/2019/112',
      enrollmentYear: 2019,
      specializations: ['Consumer Law', 'RERA', 'Builder Disputes', 'E-commerce Fraud'],
      experienceYears: 5,
      court: 'Telangana State Consumer Commission',
      bio: 'Consumer rights champion fighting builder possession delays, defective goods, and insurance repudiation claims.',
      education: 'Aligarh Muslim University (AMU)',
      feePerHour: 449,
      feePerMinute: 9,
      pricingModel: PricingModel.PER_HOUR,
      minimumMinutes: 15,
      emergencyFee: 699,
      consultationTypes: ['VIDEO', 'PHONE'],
      languages: ['Urdu', 'Hindi', 'English', 'Telugu'],
      isVerified: true,
      isOnline: true,
      isEmergencyAvailable: false,
      extensionAutoApprove: false,
      subscriptionPlan: LawyerPlan.FREE,
      rating: 4.5,
      reviewCount: 134,
      successRate: 79.0,
      responseTime: 30.0,
      totalEarnings: 60166,
      totalConsultations: 134,
      profileViews: 650,
      availableDays: ['MON', 'WED', 'FRI', 'SAT'],
      referralCode: 'FATIMA2019',
    },
  })

  // 5. Kiran Kumar
  const kiranUser = await prisma.user.upsert({
    where: { email: 'kiran@legalease.in' },
    update: {},
    create: {
      email: 'kiran@legalease.in',
      name: 'Adv. Kiran Kumar',
      password: lawyerHash,
      role: Role.LAWYER,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543205',
      language: 'Telugu',
      isActive: true,
      emailVerified: new Date(),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
  })

  await prisma.lawyer.upsert({
    where: { userId: kiranUser.id },
    update: {},
    create: {
      userId: kiranUser.id,
      barCouncilId: 'BAR/TS/2014/055',
      enrollmentYear: 2014,
      specializations: ['Criminal Law', 'Bail', 'FIR', 'Sessions', 'Cheque Bounce (S.138)'],
      experienceYears: 10,
      court: 'City Criminal Court, Nampally',
      bio: 'Trial lawyer specializing in criminal defense, anticipatory bail, and Section 138 NI Act litigation.',
      education: 'Kakatiya University',
      feePerHour: 699,
      feePerMinute: 13,
      pricingModel: PricingModel.PER_HOUR,
      minimumMinutes: 20,
      emergencyFee: 1199,
      consultationTypes: ['VIDEO', 'PHONE', 'INPERSON'],
      languages: ['Telugu', 'Hindi', 'English'],
      isVerified: true,
      isOnline: true,
      isEmergencyAvailable: true,
      extensionAutoApprove: true,
      subscriptionPlan: LawyerPlan.PRO,
      rating: 4.6,
      reviewCount: 201,
      successRate: 85.0,
      responseTime: 12.0,
      totalEarnings: 140499,
      totalConsultations: 201,
      profileViews: 980,
      availableDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      referralCode: 'KIRAN2014',
    },
  })

  console.log('✅ 5 Verified Advocates seeded successfully.')

  // 4. Create Students (2)
  // Rohan Mehta
  const rohanUser = await prisma.user.upsert({
    where: { email: 'rohan@legalease.in' },
    update: {},
    create: {
      email: 'rohan@legalease.in',
      name: 'Rohan Mehta',
      password: studentHash,
      role: Role.STUDENT,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543206',
      language: 'English',
      isActive: true,
      emailVerified: new Date(),
    },
  })

  await prisma.student.upsert({
    where: { userId: rohanUser.id },
    update: {},
    create: {
      userId: rohanUser.id,
      university: 'NALSAR University of Law',
      yearOfStudy: 5,
      graduationYear: 2026,
      specializations: ['Consumer Law', 'RTI', 'Labour Rights'],
      feePerHour: 199,
      feePerMinute: 4,
      pricingModel: PricingModel.PER_HOUR,
      minimumMinutes: 15,
      languages: ['English', 'Hindi'],
      isVerified: true,
      rating: 4.8,
      reviewCount: 42,
    },
  })

  // Vikram Singh
  const vikramUser = await prisma.user.upsert({
    where: { email: 'vikram@legalease.in' },
    update: {},
    create: {
      email: 'vikram@legalease.in',
      name: 'Vikram Singh',
      password: studentHash,
      role: Role.STUDENT,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543207',
      language: 'Hindi',
      isActive: true,
      emailVerified: new Date(),
    },
  })

  const vikramStudent = await prisma.student.upsert({
    where: { userId: vikramUser.id },
    update: {},
    create: {
      userId: vikramUser.id,
      university: 'Symbiosis Law School, Hyderabad',
      yearOfStudy: 4,
      graduationYear: 2027,
      specializations: ['Criminal Law', 'FIR Procedures', 'Police Interaction'],
      feePerHour: 149,
      feePerMinute: 3,
      pricingModel: PricingModel.PER_MINUTE,
      minimumMinutes: 10,
      languages: ['Hindi', 'English', 'Telugu'],
      isVerified: true,
      rating: 4.7,
      reviewCount: 38,
    },
  })
  console.log('✅ 2 Verified Law Students seeded.')

  // 5. Create Client (Rahul Kumar)
  const rahul = await prisma.user.upsert({
    where: { email: 'rahul@test.com' },
    update: {},
    create: {
      email: 'rahul@test.com',
      name: 'Rahul Kumar',
      password: clientHash,
      role: Role.CLIENT,
      city: 'Hyderabad',
      state: 'Telangana',
      phone: '+919876543210',
      language: 'Telugu',
      isActive: true,
      emailVerified: new Date(),
    },
  })
  console.log(`✅ Client seeded: ${rahul.name} (${rahul.email})`)

  // 6. Bookings for Rahul (3)
  // Booking 1: Rahul -> Priya (Property dispute)
  const threeDaysAhead = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  threeDaysAhead.setHours(11, 0, 0, 0)

  const booking1 = await prisma.booking.upsert({
    where: { bookingReference: 'LX-2025-847291' },
    update: {},
    create: {
      bookingReference: 'LX-2025-847291',
      clientId: rahul.id,
      lawyerId: priya.id,
      date: threeDaysAhead,
      timeSlot: '11:00 AM - 12:00 PM',
      durationMinutes: 60,
      consultationType: ConsultationType.VIDEO,
      pricingModel: PricingModel.PER_HOUR,
      status: BookingStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PAID,
      fee: 599,
      platformFee: 60,
      serviceCharge: 19,
      gst: 63,
      totalAmount: 741,
      discount: 0,
      extensionAmount: 199,
      extensionCount: 1,
      meetLink: 'https://meet.google.com/leg-ease-priya',
      meetEventId: 'meet_event_847291',
      issueDescription: 'Property boundary dispute. Neighbour built wall on my land in Kompally.',
      issueCategory: 'Property Law',
      documentUrls: ['https://example.com/docs/sale_deed_kompally.pdf'],
      recordingConsent: true,
    },
  })

  // SessionExtension on Booking 1
  await prisma.sessionExtension.create({
    data: {
      bookingId: booking1.id,
      extensionNumber: 1,
      minutes: 30,
      originalFee: 299,
      discountPercent: 33,
      discountedFee: 199,
      isPaid: true,
      lawyerAccepted: true,
      razorpayPaymentId: 'pay_ext_mock199',
    },
  })

  // Booking 2: Rahul -> Anjali (Divorce consultation)
  const sevenDaysAhead = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  sevenDaysAhead.setHours(15, 0, 0, 0)

  const booking2 = await prisma.booking.upsert({
    where: { bookingReference: 'LX-2025-623847' },
    update: {},
    create: {
      bookingReference: 'LX-2025-623847',
      clientId: rahul.id,
      lawyerId: anjali.id,
      date: sevenDaysAhead,
      timeSlot: '03:00 PM - 04:00 PM',
      durationMinutes: 60,
      consultationType: ConsultationType.INPERSON,
      pricingModel: PricingModel.PER_HOUR,
      status: BookingStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PAID,
      fee: 799,
      platformFee: 80,
      serviceCharge: 19,
      gst: 60,
      totalAmount: 958,
      discount: 0,
      issueDescription: 'Divorce filing and child custody mutual settlement queries.',
      issueCategory: 'Family Law',
    },
  })

  // Booking 3: Rahul -> Vikram (RTI road query - completed)
  const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  tenDaysAgo.setHours(17, 0, 0, 0)

  const booking3 = await prisma.booking.upsert({
    where: { bookingReference: 'LX-2025-512034' },
    update: {},
    create: {
      bookingReference: 'LX-2025-512034',
      clientId: rahul.id,
      studentId: vikramStudent.id,
      date: tenDaysAgo,
      timeSlot: '05:00 PM - 05:47 PM',
      durationMinutes: 47,
      actualDurationSeconds: 2843,
      consultationType: ConsultationType.PHONE,
      pricingModel: PricingModel.PER_MINUTE,
      status: BookingStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
      fee: 142,
      platformFee: 21,
      serviceCharge: 19,
      gst: 7,
      totalAmount: 189,
      preAuthorizedAmount: 149,
      refundAmount: 7,
      isEscrowReleased: true,
      issueDescription: 'RTI filing assistance for uncompleted road construction in Kompally.',
      issueCategory: 'RTI & Public Law',
    },
  })

  // CallSummary for Booking 3
  await prisma.callSummary.create({
    data: {
      bookingId: booking3.id,
      clientId: rahul.id,
      issueDiscussed: 'RTI for road construction status in Kompally, Hyderabad',
      keyFacts: [
        'Resident for 5 years in Kompally',
        'Road dug up Jan 2025 without timeline board',
        'No progress visible from GHMC contractors',
      ],
      adviceGiven: 'File formal RTI application with GHMC Public Information Officer (PWD dept). Request contractor work order, sanctioned budget, and scheduled completion date.',
      legalSectionsReferenced: ['RTI Act 2005 S.6', 'GHMC Act 1955 S.98'],
      nextStepsForClient: [
        'Draft RTI application using LegalEase RTI Template',
        'Submit to GHMC Circle Office with Rs.10 court fee stamp',
        'Wait 30 statutory days for response',
        'File first appeal with Appellate Authority if no reply received',
      ],
      followUpRecommended: true,
      followUpTimeline: '35 days',
      durationMinutes: 47,
      aiGenerated: true,
      isSharedWithClient: true,
    },
  })
  console.log('✅ 3 Bookings + CallSummary seeded.')

  // 7. Cases (2 for Rahul)
  // Case 1 (Booking 1)
  const case1 = await prisma.case.upsert({
    where: { bookingId: booking1.id },
    update: {},
    create: {
      bookingId: booking1.id,
      clientId: rahul.id,
      lawyerId: priya.id,
      caseNumber: 'LE-2025-PROP-01',
      title: 'Property Boundary Dispute',
      description: 'Neighbour encroached 2 feet by constructing boundary wall on registered plot in Kompally.',
      category: 'Property Law',
      currentStage: 2, // Under Review
      predictedMinMonths: 4,
      predictedMaxMonths: 8,
      courtName: 'Telangana High Court / Kukatpally Civil Court',
    },
  })

  // Case 1 Updates (Stages 0, 1, 2)
  await prisma.caseUpdate.createMany({
    data: [
      {
        caseId: case1.id,
        stage: 0,
        stageName: 'Consultation Booked',
        notes: 'Consultation booked. Client asked to upload registered sale deed and link documents.',
        updatedById: priyaUser.id,
      },
      {
        caseId: case1.id,
        stage: 1,
        stageName: 'Documents Submitted',
        notes: 'Client uploaded sale deed and survey map. Document verification completed.',
        updatedById: priyaUser.id,
      },
      {
        caseId: case1.id,
        stage: 2,
        stageName: 'Under Review',
        notes: 'Reviewing layout boundary coordinates against GHMC approved plan. Drafting statutory notice.',
        updatedById: priyaUser.id,
      },
    ],
  })

  // Case 2 (Booking 2)
  await prisma.case.upsert({
    where: { bookingId: booking2.id },
    update: {},
    create: {
      bookingId: booking2.id,
      clientId: rahul.id,
      lawyerId: anjali.id,
      caseNumber: 'LE-2025-FAM-02',
      title: 'Divorce Consultation',
      description: 'Mutual consent divorce and alimony guidelines discussion.',
      category: 'Family Law',
      currentStage: 0,
      predictedMinMonths: 6,
      predictedMaxMonths: 12,
      courtName: 'Hyderabad Family Court',
    },
  })
  console.log('✅ 2 Cases with Swiggy-style timeline updates seeded.')

  // 8. CaseKnowledge for Priya (2)
  await prisma.caseKnowledge.createMany({
    data: [
      {
        lawyerId: priya.id,
        caseTitle: 'Property Boundary Dispute',
        caseCategory: 'Property Law',
        issueDescription: 'Neighbour built wall encroaching client registered land parcel in Medchal-Malkajgiri.',
        keyFacts: ['Registered sale deed dated 2018', 'Town survey number clear', 'Adjacent owner built wall during client out-of-station'],
        solutionSummary: 'Issued legal notice under Transfer of Property Act 1882 S.5. Coordinated with Revenue Inspector for land demarcation survey. Neighbour voluntarily dismantled wall upon survey report.',
        legalSectionsUsed: ['TPA 1882 S.5', 'CrPC S.145'],
        actsReferenced: ['Transfer of Property Act', 'Code of Criminal Procedure'],
        outcome: 'Resolved amicably — wall removed within 60 days',
        resolutionMonths: 2,
        complexity: 'medium',
        courtName: 'Malkajgiri Revenue Court',
        tags: ['boundary', 'neighbour', 'notice', 'HMDA', 'survey'],
        isPrivate: false,
        viewCount: 84,
      },
      {
        lawyerId: priya.id,
        caseTitle: 'RERA Complaint vs Builder',
        caseCategory: 'Consumer Law',
        issueDescription: 'Builder delayed delivery of 3BHK flat in Gachibowli by 18 months without reasonable cause.',
        keyFacts: ['Agreement of sale signed 2021', 'Handover promised Dec 2023', 'Project stalled at 80% completion'],
        solutionSummary: 'Filed complaint before Telangana RERA Authority claiming statutory delayed interest at SBI MCLR + 2% per annum and compensation for mental agony.',
        legalSectionsUsed: ['RERA 2016 S.18', 'Consumer Protection Act 2019 S.35'],
        actsReferenced: ['Real Estate (Regulation and Development) Act 2016'],
        outcome: 'Rs. 1,80,000 compensation & monthly interest awarded until possession',
        resolutionMonths: 4,
        complexity: 'high',
        courtName: 'Telangana RERA Authority',
        tags: ['RERA', 'builder', 'delay', 'compensation', 'possession'],
        isPrivate: false,
        viewCount: 156,
      },
    ],
  })
  console.log('✅ CaseKnowledge entries seeded.')

  // 9. Forum Questions & Answers (3)
  const fq1 = await prisma.forumQuestion.create({
    data: {
      userId: rahul.id,
      title: 'Can landlord withhold security deposit for regular repainting in Hyderabad?',
      category: 'Property Law',
      body: 'I vacated my 2BHK flat in Madhapur after 2 years of tenancy. Landlord is deducting entire ₹40,000 security deposit citing repainting charges. Is this legal under Telangana tenancy rules?',
      state: 'Telangana',
      tags: ['rent', 'tenant', 'deposit', 'hyderabad'],
      views: 340,
    },
  })

  await prisma.forumAnswer.create({
    data: {
      questionId: fq1.id,
      lawyerId: priyaUser.id,
      body: 'Under Indian rental jurisprudence, standard wear-and-tear (which includes fading paint after 2 years) cannot be deducted from security deposit unless specific malicious damage is proven. You can issue a formal demand notice for deposit refund with 18% interest.',
      isPriority: true,
      isAccepted: true,
      upvotes: 18,
    },
  })

  const fq2 = await prisma.forumQuestion.create({
    data: {
      userId: rahul.id,
      title: 'How long does mutual consent divorce take in Telangana Family Court?',
      category: 'Family Law',
      body: 'Both parties are agreeable to separation with mutually agreed terms on alimony. Can the 6-month statutory cooling period be waived?',
      state: 'Telangana',
      tags: ['divorce', 'family', 'mutual-consent'],
      views: 520,
    },
  })

  await prisma.forumAnswer.create({
    data: {
      questionId: fq2.id,
      lawyerId: anjaliUser.id,
      body: 'Yes, pursuant to Supreme Court landmark ruling in Amardeep Singh v. Harveen Kaur (2017), the Family Court has discretion to waive the 6-month statutory waiting period under Section 13B(2) if all mediation efforts have failed and parties have lived apart for over 18 months.',
      isPriority: true,
      isAccepted: true,
      upvotes: 27,
    },
  })

  const fq3 = await prisma.forumQuestion.create({
    data: {
      userId: rahul.id,
      title: 'Is employer allowed to hold back relieving letter if notice period is bought out?',
      category: 'Labour Law',
      body: 'Company employment contract allows notice period buyout in lieu of 60 days. HR is refusing to release Experience and Relieving Letter even after deduction.',
      state: 'Telangana',
      tags: ['labour', 'employment', 'relieving-letter', 'it-jobs'],
      views: 410,
    },
  })

  await prisma.forumAnswer.create({
    data: {
      questionId: fq3.id,
      lawyerId: sureshUser.id,
      body: 'No employer can legally hold back experience certification if notice pay deduction terms are complied with. You can file a representation before the Labour Commissioner under the Telangana Shops and Establishments Act.',
      isPriority: true,
      isAccepted: true,
      upvotes: 14,
    },
  })
  console.log('✅ 3 Forum questions and answers seeded.')

  // 10. Legal Document Templates (4)
  await prisma.template.createMany({
    data: [
      {
        title: 'Residential Lease Agreement (Telangana & AP)',
        category: 'Property Law',
        state: 'Telangana',
        language: 'English',
        description: 'Comprehensive 11-month rental agreement template with standard maintenance and deposit refund clauses.',
        fileUrl: '/templates/residential_lease_agreement.docx',
        isPremium: false,
        price: 0,
        downloadCount: 1240,
      },
      {
        title: 'Legal Notice for Cheque Dishonour (S.138 NI Act)',
        category: 'Civil Law',
        state: 'All India',
        language: 'English',
        description: 'Statutory 15-day demand notice template drafted under Section 138 of Negotiable Instruments Act.',
        fileUrl: '/templates/cheque_bounce_notice.docx',
        isPremium: false,
        price: 0,
        downloadCount: 890,
      },
      {
        title: 'Right to Information (RTI) Application Form',
        category: 'RTI & Public Law',
        state: 'All India',
        language: 'English',
        description: 'Standard Form-A RTI application for state and central government departments.',
        fileUrl: '/templates/rti_application_form.docx',
        isPremium: false,
        price: 0,
        downloadCount: 2150,
      },
      {
        title: 'Comprehensive Non-Disclosure Agreement (NDA)',
        category: 'Corporate Law',
        state: 'All India',
        language: 'English',
        description: 'Mutual non-disclosure and intellectual property protection agreement for startups, agencies, and contractors.',
        fileUrl: '/templates/mutual_nda_startup.docx',
        isPremium: true,
        price: 299,
        downloadCount: 460,
      },
    ],
  })
  console.log('✅ 4 Legal Templates seeded.')

  // 11. News Articles (3)
  await prisma.newsArticle.createMany({
    data: [
      {
        slug: 'new-criminal-laws-bns-bnss-india-2024',
        title: 'Navigating India’s New Criminal Codes: BNS, BNSS, and BSA Explained',
        summary: 'A quick breakdown of how Bharatiya Nyaya Sanhita replaces IPC, and what changes for bail and FIR registrations.',
        body: 'The implementation of Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA) marks a historic transition in India’s penal architecture...',
        category: 'Criminal Law',
        tags: ['BNS', 'BNSS', 'criminal-law', 'reforms'],
        authorId: priyaUser.id,
        readTime: 6,
        isPublished: true,
        views: 2450,
        publishedAt: new Date(),
      },
      {
        slug: 'rera-compensation-guide-telangana-homebuyers',
        title: 'Telangana RERA Guide: How Homebuyers Can Claim Compensation for Builder Delays',
        summary: 'Step-by-step procedure to file a grievance before TSRERA and calculate statutory compounding interest.',
        body: 'Homebuyers facing construction delays in Hyderabad can invoke Section 18 of RERA 2016 to claim immediate interest on deposited capital...',
        category: 'Property Law',
        tags: ['RERA', 'homebuyers', 'hyderabad', 'property'],
        authorId: priyaUser.id,
        readTime: 5,
        isPublished: true,
        views: 1890,
        publishedAt: new Date(),
      },
      {
        slug: 'supreme-court-posh-act-workplace-guidelines',
        title: 'Supreme Court Strengthens POSH Act Compliance for Startups and MSMEs',
        summary: 'Mandatory constitution of Internal Complaints Committees (ICC) and penal liabilities for non-compliance.',
        body: 'The Supreme Court of India in its recent directives has reiterated that every workplace employing 10 or more individuals must actively maintain an ICC...',
        category: 'Labour Law',
        tags: ['POSH', 'workplace', 'women-rights', 'compliance'],
        authorId: anjaliUser.id,
        readTime: 4,
        isPublished: true,
        views: 1120,
        publishedAt: new Date(),
      },
    ],
  })
  console.log('✅ 3 Legal News Articles seeded.')

  // 12. Reviews for Priya (2)
  await prisma.review.createMany({
    data: [
      {
        bookingId: booking1.id,
        clientId: rahul.id,
        lawyerId: priya.id,
        rating: 5,
        reviewText: 'Adv. Priya Sharma is exceptional. She reviewed my Kompally property papers thoroughly and pinpointed the boundary issue in 10 minutes. Highly recommended for property matters.',
        isVerifiedBooking: true,
        lawyerResponse: 'Thank you Rahul. Glad we could resolve the survey queries clearly before issuing the notice.',
        helpfulCount: 14,
        sentimentScore: 0.95,
      },
      {
        bookingId: booking2.id,
        clientId: rahul.id,
        lawyerId: priya.id,
        rating: 5,
        reviewText: 'Very professional, patient, and transparent with legal fees. No hidden charges and Google Meet consultation started on the dot.',
        isVerifiedBooking: true,
        helpfulCount: 8,
        sentimentScore: 0.92,
      },
    ],
  })
  console.log('✅ 2 Reviews seeded for Adv. Priya.')

  // 13. Notifications for Rahul (3)
  await prisma.notification.createMany({
    data: [
      {
        userId: rahul.id,
        title: 'Consultation Confirmed',
        body: 'Your consultation with Adv. Priya Sharma is scheduled for 11:00 AM. Google Meet link is active.',
        type: 'BOOKING',
        bookingId: booking1.id,
        isRead: false,
        actionUrl: `/video/${booking1.id}`,
      },
      {
        userId: rahul.id,
        title: 'Case Status Updated: Under Review',
        body: 'Adv. Priya Sharma moved your Property Boundary Dispute case to Stage 2 (Under Review).',
        type: 'CASE',
        bookingId: booking1.id,
        isRead: false,
        actionUrl: `/dashboard/cases/${case1.id}`,
      },
      {
        userId: rahul.id,
        title: 'Call Summary Available',
        body: 'Your consultation summary and RTI action plan from Vikram Singh is ready to download.',
        type: 'SYSTEM',
        bookingId: booking3.id,
        isRead: false,
        actionUrl: `/dashboard/bookings`,
      },
    ],
  })
  console.log('✅ 3 Notifications seeded for Rahul.')

  console.log('🎉 Seed complete! LegalEase is fully populated with production test data.')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
