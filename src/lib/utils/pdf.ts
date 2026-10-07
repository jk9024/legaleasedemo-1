/**
 * PDF generator utility for LegalEase consultations, invoices, and call summaries.
 * Generates structured HTML-to-PDF templates with brand styling (Navy + Gold).
 */

export interface InvoicePDFData {
  invoiceNumber: string
  date: string
  clientName: string
  clientEmail: string
  clientPhone: string
  lawyerName: string
  lawyerBarId: string
  consultationType: string
  bookingRef: string
  lawyerFee: number
  platformFee: number
  serviceCharge: number
  gst: number
  total: number
  paymentMethod: string
}

/**
 * Returns formatted HTML for legal consultation GST tax invoice.
 * Can be rendered directly or converted to PDF.
 */
export function generateInvoiceHTML(data: InvoicePDFData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Tax Invoice — ${data.invoiceNumber}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px; color: #0B1F3A; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #C9A84C; padding-bottom: 20px; }
        .logo { font-size: 26px; font-weight: 800; color: #0B1F3A; }
        .logo span { color: #C9A84C; }
        .meta { text-align: right; font-size: 13px; color: #475569; }
        .billing-grid { display: flex; justify-content: space-between; margin: 30px 0; }
        .col { width: 48%; }
        h4 { margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; color: #475569; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #E2E8F0; }
        .table th { background: #F8FAFC; color: #0B1F3A; font-weight: 600; }
        .total-box { margin-top: 30px; text-align: right; }
        .total-row { font-size: 18px; font-weight: bold; color: #0B1F3A; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Legal<span>Ease</span></div>
        <div class="meta">
          <strong>TAX INVOICE</strong><br />
          Invoice No: ${data.invoiceNumber}<br />
          Date: ${data.date}<br />
          Booking Ref: ${data.bookingRef}
        </div>
      </div>

      <div class="billing-grid">
        <div class="col">
          <h4>Billed To (Client):</h4>
          <strong>${data.clientName}</strong><br />
          ${data.clientEmail}<br />
          ${data.clientPhone}
        </div>
        <div class="col" style="text-align: right;">
          <h4>Service Provider (Advocate):</h4>
          <strong>${data.lawyerName}</strong><br />
          Bar Council ID: ${data.lawyerBarId}<br />
          Mode: ${data.consultationType} Consultation
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: right;">Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Professional Consultation Fee (${data.lawyerName})</td>
            <td style="text-align: right;">₹${data.lawyerFee.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>Platform Facilitation & Escrow Fee</td>
            <td style="text-align: right;">₹${data.platformFee.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>Technology & Video Service Charge</td>
            <td style="text-align: right;">₹${data.serviceCharge.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>GST @ 18% (on Platform & Tech Charge)</td>
            <td style="text-align: right;">₹${data.gst.toLocaleString('en-IN')}</td>
          </tr>
        </tbody>
      </table>

      <div class="total-box">
        <p class="total-row">Total Paid: ₹${data.total.toLocaleString('en-IN')}</p>
        <p style="font-size: 13px; color: #0D7A55;">Payment Verified via Razorpay (${data.paymentMethod})</p>
      </div>

      <div class="footer">
        LegalEase Technologies Pvt Ltd • Hyderabad, Telangana • support@legalease.in<br />
        This is a computer-generated tax invoice. No signature required.
      </div>
    </body>
    </html>
  `
}
