/**
 * Reseñas de clientes.
 *
 * Vacío a propósito: no hay testimonios publicados en backtonature.net (ni home
 * ni about), y las reseñas de terceros (Angi, Tripadvisor) no se reproducen sin
 * permiso explícito del autor. En cuanto el cliente autorice 2-3 reseñas reales,
 * se agregan aquí como entradas — el componente `Testimonials` las recoge solo.
 */

export type Testimonial = {
  quote: string;
  author: string;
  /** Ej. "Google review", "Angi", "Bernardsville, NJ client". */
  source?: string;
};

export const testimonials: Testimonial[] = [];
