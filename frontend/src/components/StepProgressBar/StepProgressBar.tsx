type Props = {
  currentStep: number; // 1 = Carrito, 2 = Envío, 3 = Pago, 4 = Confirmación
};

const steps = ["Carrito", "Envío", "Pago", ];

export default function StepProgressBar({ currentStep }: Props) {
  const progress = (currentStep - 1) / (steps.length - 1);

  return (
    <div className="w-full flex flex-col max-w-md mx-auto px-7 mt-6">
      <div className="relative mb-2 h-6">
        {/* Línea base */}
        <div className="absolute top-1/2 left-[10px] right-[10px] h-[2px] bg-[#E0DBD8] -translate-y-1/2 rounded-full" />

        {/* Línea de progreso */}
        <div
          className="absolute top-1/2 left-[10px] h-[2px] bg-[#918183] -translate-y-1/2 rounded-full transition-all duration-500 origin-left"
          style={{
            width: `calc(${progress * 92}% - ${progress === 1 ? 0 : 0.5}rem)`,
          }}
        />

        {/* Círculos */}
        <div className="relative flex justify-between z-10">
          {steps.map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber <= currentStep;

            return (
              <div key={index} className="flex flex-col items-center w-5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold
                  ${isCompleted ? "bg-[#6E635B] text-white" : "bg-[#E0DBD8] text-[#8C857C]"}`}
                >
                  {stepNumber}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      
     
    </div>
  );
}
