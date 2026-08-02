/**
 * Estado compartido de los formularios.
 *
 * Vive fuera de app/actions.ts a propósito: un módulo "use server" solo puede
 * exportar funciones async, así que el estado inicial no puede convivir con las
 * actions.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Errores por campo, para pintarlos junto a su input. */
  errors?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle", message: "" };
