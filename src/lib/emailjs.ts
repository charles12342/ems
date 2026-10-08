// Lightweight EmailJS sender using the public REST API (no extra package needed).
// Docs: https://www.emailjs.com/docs/rest-api/send/
const ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export type EmailParams = Record<string, string>;

export async function sendEmail(templateParams: EmailParams, templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.");
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service_id: serviceId, template_id: templateId, user_id: publicKey, template_params: templateParams }),
  });
  if (!res.ok) throw new Error(`EmailJS error (${res.status}): ${await res.text()}`);
}

export function sendActivationEmail(p: { email: string; employeeId: string; firstName: string; username: string; tempPassword: string }) {
  return sendEmail({
    to_email: p.email,
    to_name: p.firstName,
    email: p.email,
    employee_id: p.employeeId,
    username: p.username,
    temp_password: p.tempPassword,
    login_url: typeof window !== "undefined" ? window.location.origin : "",
    activated_at: new Date().toLocaleString("en-PH", { dateStyle: "long", timeStyle: "short" }),
    app_name: "JobQuest EMS",
  });
}
