const API_BASE = "/oraciones/api/v1/prayers";

/**
 * POST /oraciones/api/v1/prayers
 * Envía una nueva oración (acción de gracias o petición)
 */
export async function enviarOracion({ tipo, contenido }) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: tipo,
      content: contenido.trim(),
    }),
  });

  if (response.status === 429) {
    throw new Error(
      "Has enviado demasiadas oraciones en poco tiempo. Espera un momento e intenta nuevamente.",
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || "Ocurrió un error al enviar tu oración.",
    );
  }

  return response.json();
}
