"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/actions";
import { initialFormState } from "@/lib/form-state";
import Field from "./Field";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-[2px] border border-brass bg-brass px-8 py-4 [font-size:var(--text-label)] tracking-[0.22em] text-ink uppercase transition-colors hover:bg-transparent hover:text-brass disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialFormState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[3px] border border-bone/25 bg-ink-soft p-8"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone">
          Message received
        </h2>
        <p className="mt-3 max-w-[40ch] text-sage">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {/* Honeypot anti-spam — invisible y fuera del orden de tabulación. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} />
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-[2px] border border-brass px-4 py-3 text-sm text-brass"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="firstName" label="First name" error={state.errors?.firstName}>
          {(props) => <input type="text" autoComplete="given-name" {...props} />}
        </Field>
        <Field id="lastName" label="Last name" error={state.errors?.lastName}>
          {(props) => (
            <input type="text" autoComplete="family-name" {...props} />
          )}
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="email" label="Email" error={state.errors?.email}>
          {(props) => <input type="email" autoComplete="email" {...props} />}
        </Field>
        <Field id="phone" label="Phone" error={state.errors?.phone}>
          {(props) => <input type="tel" autoComplete="tel" {...props} />}
        </Field>
      </div>

      <Field id="message" label="Message" error={state.errors?.message}>
        {(props) => (
          <textarea
            rows={6}
            placeholder="Tell us about the property and what you're hoping to do with it."
            {...props}
          />
        )}
      </Field>

      <div className="mt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
