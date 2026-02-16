import { CheckCircle, Heart, HandHeart, Plus } from "lucide-react";

const LABELS = {
  thanksgiving: "Acción de gracias",
  petition: "Petición",
};

const ICONS = {
  thanksgiving: Heart,
  petition: HandHeart,
};

export default function MensajeExito({ tipo, onNueva }) {
  const Icon = ICONS[tipo] || Heart;

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Icono de éxito */}
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
            <CheckCircle
              className="w-10 h-10 text-green-600"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-2xl font-semibold text-stone-800">
            ¡Oración enviada!
          </h2>
        </div>

        {/* Mensaje */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <div className="inline-flex items-center gap-2 text-teal-600">
            <Icon className="w-5 h-5" strokeWidth={1.8} />
            <span className="text-sm font-medium">{LABELS[tipo]}</span>
          </div>
          <p className="text-stone-600 text-lg leading-relaxed">
            Tu oración ha sido compartida con la congregación. Estaremos orando
            contigo.
          </p>
        </div>

        {/* Botón nueva oración */}
        <button
          onClick={onNueva}
          className="
            inline-flex items-center gap-2 py-3 px-8 rounded-2xl
            bg-teal-500 text-white text-lg font-semibold
            hover:bg-teal-600 active:scale-[0.98]
            transition-all duration-200 shadow-md shadow-teal-200 cursor-pointer
            focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300
          "
        >
          <Plus className="w-5 h-5" />
          Enviar otra oración
        </button>
      </div>
    </div>
  );
}
