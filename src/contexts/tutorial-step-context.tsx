import { createContext } from 'react';

type TutorialStepContextType = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  smallDevice: boolean;
};

export const TutorialStepContext = createContext<TutorialStepContextType>(
  {} as TutorialStepContextType,
);
