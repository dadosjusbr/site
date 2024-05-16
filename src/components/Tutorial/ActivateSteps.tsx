import styled from 'styled-components';
import TutorialSteps from './TutorialSteps';
import { Step, StepLabel, Typography } from '@mui/material';

const activeStepsObj = [
  {
    url: '4PB39l4IykI',
    title: 'Como consultar os dados',
    subtitle: 'Teste Subtitle',
  },
  {
    url: 'TaQN-gLEV0Y',
    title: 'Como baixar contracheques',
    subtitle: 'Teste Subtitle',
  },
  {
    url: 'zDCiDV-IUR0',
    title: 'Baixando conjuntos de dados',
    subtitle: 'Teste Subtitle',
  },
  {
    url: 'w4S9PdZOB9U',
    title: 'Como realizar uma pesquisa avançada',
    subtitle: 'Teste Subtitle',
  },
  {
    url: 'dXC9nYYNBtY',
    title: 'Quais órgãos de justiça são monitorados',
    subtitle: 'Teste Subtitle',
  },
  {
    url: 'JElQeMFHDcM',
    title: 'Importando dados da plataforma',
    subtitle: 'Teste Subtitle',
  },
  {
    url: 'ubccAzz4Sfo',
    title: 'O índice de transparência',
    subtitle: 'Teste Subtitle',
  },
];

export const activeSteps = activeStepsObj.map((step, index) => (
  <TutorialSteps
    key={`step-${index}`}
    url={step.url}
    title={step.title}
    subtitle={step.subtitle}
  />
));

export const StepsNames = ({
  setActiveStep,
}: {
  setActiveStep: (n: number) => void;
}) =>
  activeStepsObj.map((step, index) => (
    <PointerStep onClick={() => setActiveStep(index)}>
      <StepLabel>
        <PTypography>{step.title}</PTypography>
      </StepLabel>
    </PointerStep>
  ));

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
