import classNames from "classnames";
import { StepsProvider } from "./StepsProvider";
import Step from "./Step";
const Steps = (props) => {
  const { steps, step: currentStep, onChange } = props;

  return (
    <StepsProvider step={currentStep} onChange={onChange}>
      <div className="flex justify-between w-full">
        {steps.map((step, index) => {
          const lastStep = index === steps.length - 1;
          const isCompletedStep = index + 1 < currentStep;
          return (
            <div
              className={classNames(
                "flex items-center",
                !lastStep ? "flex-auto" : "flex-initial",
              )}
            >
              <Step
                key={step.key}
                label={step.label}
                step={index + 1}
                className="flex-shrink-0"
              />
              {!lastStep && (
                <div
                  className={classNames(
                    "w-full h-[2px] mx-2",
                    isCompletedStep ? "bg-primary" : "bg-grey",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </StepsProvider>
  );
};

export default Steps;
