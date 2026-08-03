"use server";

import { z } from "zod";
import { site } from "@/content/site";
import type { FormState } from "@/lib/form-state";

/**
 * F-03 · Formularios.
 *
 * Validación en servidor con Zod (nunca se confía en la del navegador),
 * honeypot anti-spam y notificación por email vía Resend.
 *
 * Sin RESEND_API_KEY el envío se registra en el log del servidor y la persona
 * recibe confirmación igualmente: así el sitio es funcional en desarrollo y en
 * preview sin credenciales, y solo hay que añadir la variable en producción.
 */

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name."),
  lastName: z.string().trim().min(1, "Please enter your last name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a phone number we can reach."),
  propertyLocation: z
    .string()
    .trim()
    .min(1, "Please tell us the town and state."),
  propertySize: z.enum(["Under 1 acre", "1–3 acres", "3–5 acres", "5+ acres"], {
    message: "Please select the approximate property size.",
  }),
  projectType: z.enum(
    [
      "New design / build",
      "Ongoing maintenance",
      "Edible garden & culinary",
      "Not sure yet",
    ],
    { message: "Please select the type of project." },
  ),
  budgetRange: z.enum(
    [
      "Under $50k",
      "$50k – $100k",
      "$100k – $250k",
      "$250k+",
      "Prefer not to say",
    ],
    { message: "Please select a budget range." },
  ),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about the project."),
});

const subscribeSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
});

function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

async function deliver(subject: string, lines: string[]): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "web@backtonature.net";

  if (!apiKey) {
    console.info(`[form] ${subject}\n${lines.join("\n")}`);
    return true;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("[form] Resend rejected the request", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[form] Could not reach the email provider", error);
    return false;
  }
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot: campo invisible que solo un bot rellena.
  if (formData.get("website")) {
    return { status: "success", message: "Thank you — we'll be in touch." };
  }

  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    propertyLocation: formData.get("propertyLocation"),
    propertySize: formData.get("propertySize"),
    projectType: formData.get("projectType"),
    budgetRange: formData.get("budgetRange"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const d = parsed.data;
  const sent = await deliver(`New enquiry — ${d.firstName} ${d.lastName}`, [
    `Name: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Location: ${d.propertyLocation}`,
    `Property size: ${d.propertySize}`,
    `Project type: ${d.projectType}`,
    `Budget: ${d.budgetRange}`,
    "",
    d.message,
  ]);

  if (!sent) {
    return {
      status: "error",
      message: `Something went wrong sending your message. Please call us on ${site.contact.phone}.`,
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your message is with the studio. We usually reply within one to two days.",
  };
}

export async function submitSubscribe(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (formData.get("website")) {
    return { status: "success", message: "Thank you for subscribing." };
  }

  const parsed = subscribeSchema.safeParse({
    firstName: formData.get("firstName"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const sent = await deliver(`New subscriber — ${parsed.data.firstName}`, [
    `Name: ${parsed.data.firstName}`,
    `Email: ${parsed.data.email}`,
  ]);

  if (!sent) {
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    };
  }

  return {
    status: "success",
    message: "You're on the list — thank you.",
  };
}
