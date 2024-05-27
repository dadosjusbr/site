import styled from 'styled-components';
import { Step, StepLabel, Typography } from '@mui/material';
import TutorialSteps from './TutorialSteps';
import { Playlist } from './Playlist';

export const activeSteps = Playlist.map((step, index) => {
  const step_num = index + 1;

  return (
    <TutorialSteps
      key={`step-${step_num}`}
      url={step.url}
      title={step.title}
      subtitle={step.subtitle}
    />
  );
});

export const StepsNames = ({
  setActiveStep,
}: {
  setActiveStep: (n: number) => void;
}) =>
  Playlist.map((step, index) => {
    const pointer_step_num = index + 1;

    return (
      <PointerStep
        key={`pointer-step-${pointer_step_num}`}
        onClick={() => setActiveStep(index)}
      >
        <StepLabel>
          <PTypography>{step.title}</PTypography>
        </StepLabel>
      </PointerStep>
    );
  });

const PointerStep = styled(Step)`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const PTypography = styled(Typography)`
  font-weight: bold;
  padding: 0;
`;
