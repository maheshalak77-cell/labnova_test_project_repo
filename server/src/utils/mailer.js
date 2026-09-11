// import nodemailer from "nodemailer";

// const {
//   SMTP_HOST,
//   SMTP_PORT = "587",
//   SMTP_USER,
//   SMTP_PASS,
//   SMTP_FROM_NAME = "LabNova",
//   QUOTE_NOTIFICATION_EMAIL,
// } = process.env;

// let transporter = null;

// function getTransporter() {
//   if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
//   if (!transporter) {
//     transporter = nodemailer.createTransport({
//       host: SMTP_HOST,
//       port: Number(SMTP_PORT),
//       secure: Number(SMTP_PORT) === 465,
//       auth: { user: SMTP_USER, pass: SMTP_PASS },
//       // Many cloud hosts (Railway included) advertise IPv6 without a working
//       // outbound route to it, which makes SMTP connections to Gmail hang
//       // until they time out. Forcing IPv4 avoids that entirely.
//       family: 4,
//       connectionTimeout: 10_000,
//       greetingTimeout: 10_000,
//       socketTimeout: 10_000,
//     });
//   }
//   return transporter;
// }

// const money = (value) =>
//   new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
//     Number(value) || 0,
//   );

// function buildHtml({ fullName, email, phone, message, items, total, type }) {
//   const isQuestion = type === "question";
//   const rows = items
//     .map(
//       (item) => `
//       <tr>
//         <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${item.product_name}${item.size ? ` — ${item.size}` : ""}</td>
//         <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.quantity}</td>
//         <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">${money(item.unit_price)}</td>
//         <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">${money(item.line_total)}</td>
//       </tr>`,
//     )
//     .join("");

//   return `
//   <div style="font-family:Arial,Helvetica,sans-serif;color:#172554;max-width:640px;margin:auto;">
//     <h2 style="color:#0A2342;">${isQuestion ? "New general enquiry" : "New quotation request"} — LabNova Scientific</h2>
//     <p><strong>Name:</strong> ${fullName}<br/>
//        <strong>Email:</strong> ${email}<br/>
//        <strong>Phone:</strong> ${phone || "—"}</p>
//     ${message ? `<p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
//     ${
//       isQuestion
//         ? ""
//         : `<table style="border-collapse:collapse;width:100%;margin-top:16px;">
//       <thead>
//         <tr style="background:#0A2342;color:#fff;">
//           <th style="padding:8px 12px;text-align:left;">Product</th>
//           <th style="padding:8px 12px;text-align:center;">Qty</th>
//           <th style="padding:8px 12px;text-align:right;">Unit price</th>
//           <th style="padding:8px 12px;text-align:right;">Line total</th>
//         </tr>
//       </thead>
//       <tbody>${rows || `<tr><td style="padding:8px 12px;" colspan="4">No products attached to this enquiry.</td></tr>`}</tbody>
//     </table>
//     <p style="text-align:right;font-weight:bold;margin-top:8px;">Indicative total: ${money(total)}</p>`
//     }
//     <p style="color:#64748b;font-size:12px;margin-top:24px;">
//       This is an automated notification from the LabNova Scientific website ${isQuestion ? "contact" : "quotation"} form.
//     </p>
//   </div>`;
// }

// /**
//  * Sends the quote-request notification email. Returns true if the email was
//  * sent, false if SMTP isn't configured or sending failed (the quote request
//  * itself is still saved to the database either way).
//  */
// export async function sendQuoteEmail(quote) {
//   const transport = getTransporter();
//   if (!transport) {
//     console.warn(
//       "[mailer] SMTP is not configured — skipping quote notification email.",
//     );
//     return false;
//   }

//   const to = QUOTE_NOTIFICATION_EMAIL || SMTP_USER;

//   try {
//     await transport.sendMail({
//       from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
//       to,
//       replyTo: quote.email,
//       subject: `${quote.type === "question" ? "New enquiry" : "New quotation request"} from ${quote.fullName}`,
//       html: buildHtml(quote),
//     });
//     return true;
//   } catch (err) {
//     console.error(
//       "[mailer] Failed to send quote email:",
//       err.code || "",
//       err.message,
//     );
//     return false;
//   }
// }

import { Resend } from "resend";

const {
  RESEND_API_KEY,
  RESEND_FROM,
  SMTP_FROM_NAME = "LabNova",
  QUOTE_NOTIFICATION_EMAIL,
  SMTP_USER, // kept as a fallback recipient if QUOTE_NOTIFICATION_EMAIL isn't set
} = process.env;

let resend = null;

function getClient() {
  if (!RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(RESEND_API_KEY);
  return resend;
}

const money = (value) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
    Number(value) || 0,
  );

function buildHtml({ fullName, email, phone, message, items, total, type }) {
  const isQuestion = type === "question";
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${item.product_name}${item.size ? ` — ${item.size}` : ""}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">${money(item.unit_price)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">${money(item.line_total)}</td>
      </tr>`,
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#172554;max-width:640px;margin:auto;">
    <h2 style="color:#0A2342;">${isQuestion ? "New general enquiry" : "New quotation request"} — LabNova Scientific</h2>
    <p><strong>Name:</strong> ${fullName}<br/>
       <strong>Email:</strong> ${email}<br/>
       <strong>Phone:</strong> ${phone || "—"}</p>
    ${message ? `<p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
    ${
      isQuestion
        ? ""
        : `<table style="border-collapse:collapse;width:100%;margin-top:16px;">
      <thead>
        <tr style="background:#0A2342;color:#fff;">
          <th style="padding:8px 12px;text-align:left;">Product</th>
          <th style="padding:8px 12px;text-align:center;">Qty</th>
          <th style="padding:8px 12px;text-align:right;">Unit price</th>
          <th style="padding:8px 12px;text-align:right;">Line total</th>
        </tr>
      </thead>
      <tbody>${rows || `<tr><td style="padding:8px 12px;" colspan="4">No products attached to this enquiry.</td></tr>`}</tbody>
    </table>
    <p style="text-align:right;font-weight:bold;margin-top:8px;">Indicative total: ${money(total)}</p>`
    }
    <p style="color:#64748b;font-size:12px;margin-top:24px;">
      This is an automated notification from the LabNova Scientific website ${isQuestion ? "contact" : "quotation"} form.
    </p>
  </div>`;
}

/**
 * Sends the quote-request notification email via the Resend HTTPS API.
 *
 * Why not SMTP: cloud hosts (Railway, Render, Fly.io, AWS, etc.) share IP
 * ranges that major inbox providers — Gmail especially — silently blackhole
 * for anti-spam reasons. HTTPS (what this API uses) doesn't have that
 * problem — it's the same protocol every other outbound API call already
 * uses successfully.
 *
 * Returns true if the email was sent, false if it's not configured or
 * sending failed. The quote itself is always saved to the database first,
 * regardless of what happens here.
 */
export async function sendQuoteEmail(quote) {
  const client = getClient();
  if (!client) {
    console.warn(
      "[mailer] RESEND_API_KEY is not configured — skipping quote notification email.",
    );
    return false;
  }

  const to = QUOTE_NOTIFICATION_EMAIL || SMTP_USER;
  if (!to) {
    console.warn(
      "[mailer] No recipient configured — set QUOTE_NOTIFICATION_EMAIL.",
    );
    return false;
  }

  // Resend's shared "onboarding@resend.dev" sender works immediately with no
  // domain setup, but can only deliver to the email address you signed up to
  // Resend with. Once you verify your own domain, set RESEND_FROM to
  // something like "LabNova <quotes@yourdomain.com>" to send to anyone.
  const from = RESEND_FROM || `${SMTP_FROM_NAME} <onboarding@resend.dev>`;

  try {
    const { error } = await client.emails.send({
      from,
      to,
      replyTo: quote.email,
      subject: `${quote.type === "question" ? "New enquiry" : "New quotation request"} from ${quote.fullName}`,
      html: buildHtml(quote),
    });

    if (error) {
      console.error("[mailer] Resend API error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[mailer] Failed to send quote email:", err.message);
    return false;
  }
}
