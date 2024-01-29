const stepsList = [
  {
    step: 1,
    name: "Login",
    text: "Have an account?",
  },
  {
    step: 2,
    name: "Create Account",
    text: "New Here?",
  },
];

interface StepsIndicatorProps {
  current: number;
}

export default function StepsIndicator({ current }: StepsIndicatorProps) {
  return (
    <div className="flex flex-row md:flex-col gap-3">
      {stepsList.map((step) => (
        <div key={step.name} className="flex justify-start items-center gap-3">
          <button
            className={`rounded-full w-10 h-10 md:w-6 md:h-6 border flex justify-center items-center ${
              current == step.step
                ? "bg-gray-200 text-indigo-600"
                : "bg-transparent text-gray-200"
            }`}
          >
            <span className="text-sm">{step.step}</span>
          </button>
          <div className="md:flex flex-col justify-start items-start hidden text-gray-200">
            <span className="text-sm font-thin">{step.text}</span>
            <span className="text-lg uppercase">{step.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
