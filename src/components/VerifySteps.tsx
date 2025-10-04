"use client";

type Props = {
  currentStep: number;
};

const steps = [
  "البيانات الأساسية",
  "الهوية (وجه أمامي)",
  "الهوية (وجه خلفي)",
  "رفع سيلفي",
];

export default function VerifySteps({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;

        return (
          <div key={idx} className="flex-1 text-center">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 
                ${isDone ? "bg-green-500 text-white" : isActive ? "bg-cyan-600 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              {stepNum}
            </div>
            <p className="text-xs sm:text-sm">{step}</p>
          </div>
        );
      })}
    </div>
  );
}
