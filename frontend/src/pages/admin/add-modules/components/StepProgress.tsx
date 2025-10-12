interface StepProgressProps {
  currentStep: number;
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === currentStep
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                    : step < currentStep
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`h-1 w-12 md:w-20 mx-1 rounded transition-all ${
                    step < currentStep ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
