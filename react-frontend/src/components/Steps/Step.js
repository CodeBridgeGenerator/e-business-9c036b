import classNames from "classnames";
import { useSteps } from "./StepsProvider";

const Step = ({ label, step, className }) => {
  const { step: currentStep } = useSteps();

  const isCurrent = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className={classNames("flex items-center", className)}>
      <span
        className={classNames(
          "flex items-center justify-center rounded-full size-7 font-semibold flex-shrink-0",
          isCurrent || isCompleted
            ? "bg-primary text-white"
            : "text-grey border-2 border-grey",
        )}
      >
        {isCompleted ? <i className="text-xs pi pi-check"></i> : step}
      </span>
      <p
        className={classNames(
          "ml-2 font-semibold",
          isCurrent || isCompleted ? "text-black" : "text-grey",
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default Step;
