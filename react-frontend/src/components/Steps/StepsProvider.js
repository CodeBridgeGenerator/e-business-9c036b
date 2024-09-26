import { createContext, useContext, useState } from "react";

const StepContext = createContext({
  step: 1,
});

export const StepsProvider = ({ children, step = 1, onChange }) => {
  return (
    <StepContext.Provider value={{ step }}>{children}</StepContext.Provider>
  );
};

export const useSteps = () => {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error("useSteps must be used within a StepsProvider");
  }
  return context;
};
