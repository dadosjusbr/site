import {
  Stepper,
  stepConnectorClasses,
  StepConnector,
  styled,
} from '@mui/material';
import { StepsNames } from './ActivateSteps';

type SelectionStepperProps = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

function SelectionStepper({
  activeStep,
  setActiveStep,
}: SelectionStepperProps) {
  const QontoConnector = styled(StepConnector)(() => {
    return {
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
      },
      [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: '#fff',
        },
      },
      [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: '#fff',
        },
      },
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#ffffff90',
        borderTopWidth: 3,
        borderRadius: 1,
      },
    };
  });

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      connector={<QontoConnector />}
    >
      {StepsNames({ setActiveStep })}
    </Stepper>
  );
}

export default SelectionStepper;
