import { useState } from "react";
import { Heart, Send, Loader2, HandHeart } from "lucide-react";
import { enviarOracion } from "../services/oracionesApi";
import MensajeExito from "./MensajeExito";

const TIPOS_ORACION = [
  {
    value: "thanksgiving",
    label: "Acción de gracias",
    icon: Heart,
    descripcion: "Agradecer a Dios por sus bendiciones",
  },
  {
    value: "petition",
    label: "Petición",
    icon: HandHeart,
    descripcion: "Presentar una necesidad ante Dios",
  },
];

export default function FormularioOracion() {
  const [tipo, setTipo] = useState("");
  const [contenido, setContenido] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState("");

  const puedeEnviar = tipo && contenido.trim().length >= 5 && !enviando;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!tipo) {
      setError("Por favor selecciona el tipo de oración.");
      return;
    }

    if (contenido.trim().length < 5) {
      setError("Por favor escribe al menos unas palabras.");
      return;
    }

    try {
      setEnviando(true);
      await enviarOracion({ tipo, contenido });
      setExito(true);
    } catch (err) {
      setError(err.message || "Ocurrió un error al enviar tu oración.");
    } finally {
      setEnviando(false);
    }
  }

  function handleNuevaOracion() {
    setTipo("");
    setContenido("");
    setExito(false);
    setError("");
  }

  if (exito) {
    return <MensajeExito tipo={tipo} onNueva={handleNuevaOracion} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-start justify-center px-4 pt-12 pb-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
            <Heart className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-semibold text-stone-800 tracking-tight">
            Muro de Oración
          </h1>
          <p className="text-stone-500 mt-2 text-lg">
            Comparte tu oración con la congregación
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tipo de oración */}
          <fieldset>
            <legend className="text-base font-medium text-stone-700 mb-3">
              ¿Qué deseas compartir?
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIPOS_ORACION.map((opcion) => {
                const Icon = opcion.icon;
                const seleccionado = tipo === opcion.value;
                return (
                  <button
                    key={opcion.value}
                    type="button"
                    onClick={() => setTipo(opcion.value)}
                    className={`
                      relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 
                      transition-all duration-200 cursor-pointer
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300
                      ${
                        seleccionado
                          ? "border-teal-500 bg-teal-50 shadow-sm"
                          : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
                      }
                    `}
                    aria-pressed={seleccionado}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        seleccionado ? "text-teal-600" : "text-stone-400"
                      }`}
                      strokeWidth={1.8}
                    />
                    <span
                      className={`text-base font-medium ${
                        seleccionado ? "text-teal-800" : "text-stone-700"
                      }`}
                    >
                      {opcion.label}
                    </span>
                    <span
                      className={`text-sm ${
                        seleccionado ? "text-teal-600" : "text-stone-400"
                      }`}
                    >
                      {opcion.descripcion}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Textarea */}
          <div>
            <label
              htmlFor="contenido"
              className="block text-base font-medium text-stone-700 mb-2"
            >
              Tu oración
            </label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder={
                tipo === "thanksgiving"
                  ? "Escribe aquí tu agradecimiento..."
                  : tipo === "petition"
                    ? "Escribe aquí tu petición..."
                    : "Selecciona primero el tipo de oración..."
              }
              rows={5}
              maxLength={500}
              className="
                w-full rounded-2xl border-2 border-stone-200 bg-white px-5 py-4
                text-lg text-stone-800 placeholder:text-stone-300
                resize-none transition-colors duration-200
                focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100
              "
            />
            <div className="flex justify-between mt-2 px-1">
              <span className="text-sm text-stone-400">
                Mínimo 5 caracteres
              </span>
              <span
                className={`text-sm ${
                  contenido.length > 450 ? "text-teal-600" : "text-stone-400"
                }`}
              >
                {contenido.length}/500
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-base"
            >
              {error}
            </div>
          )}

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={!puedeEnviar}
            className={`
              w-full flex items-center justify-center gap-3 py-4 px-6 
              rounded-2xl text-lg font-semibold transition-all duration-200
              focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300
              ${
                puedeEnviar
                  ? "bg-teal-500 text-white hover:bg-teal-600 active:scale-[0.98] shadow-md shadow-teal-200 cursor-pointer"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }
            `}
          >
            {enviando ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar oración
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
