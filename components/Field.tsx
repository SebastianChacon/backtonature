import type { ReactNode } from "react";

/**
 * Campo de formulario accesible (A11Y):
 * label asociado por id, error enlazado con aria-describedby y aria-invalid.
 */
export default function Field({
  id,
  label,
  error,
  required = true,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    name: string;
    required: boolean;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    className: string;
  }) => ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <p className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="[font-size:var(--text-label)] tracking-[0.18em] text-sage uppercase"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-brass">
            *
          </span>
        )}
      </label>

      {children({
        id,
        name: id,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        className: `w-full rounded-[2px] border bg-transparent px-4 py-3 text-bone placeholder:text-stone focus:outline-none ${
          error ? "border-brass" : "border-bone/25 focus:border-bone/60"
        }`,
      })}

      {error && (
        <span id={errorId} className="text-sm text-brass">
          {error}
        </span>
      )}
    </p>
  );
}
