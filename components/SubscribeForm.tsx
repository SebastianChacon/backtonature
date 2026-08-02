"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitSubscribe } from "@/app/actions";
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
      {pending ? "Subscribing…" : "Subscribe"}
    </button>
  );
}

export default function SubscribeForm() {
  const [state, formAction] = useActionState(submitSubscribe, initialFormState);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-[3px] border border-bone/25 bg-ink-soft p-6 text-bone"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
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

      <Field id="firstName" label="Name" error={state.errors?.firstName}>
        {(props) => <input type="text" autoComplete="given-name" {...props} />}
      </Field>

      <Field id="email" label="Email" error={state.errors?.email}>
        {(props) => <input type="email" autoComplete="email" {...props} />}
      </Field>

      <div className="mt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
