"use client";
import { useStore } from "../../store/login";

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

export default function StepsIndicator() {
  const { formIndex } = useStore((store) => store.state);
  const { setFormIndex } = useStore((store) => store.actions);

  return (
    <div className="flex flex-row md:flex-col gap-4">
      {stepsList.map((step) => (
        <div key={step.name} className="flex justify-start items-center gap-3">
          <button
            onClick={() => setFormIndex(step.step)}
            className={`rounded-full w-10 h-10 md:w-6 md:h-6 border flex justify-center items-center ${
              formIndex == step.step
                ? "bg-gray-200 text-indigo-600"
                : "bg-transparent text-gray-200"
            }`}
          >
            <span className="text-sm">{step.step}</span>
          </button>
          <div className="md:flex flex-col justify-start items-start text-gray-200">
            <span className="text-sm font-thin hidden md:flex">
              {step.text}
            </span>
            <span className="text-base uppercase lg:text-lg">{step.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
