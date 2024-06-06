import { Suspense, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import { TutorialStepContext } from '../../contexts/tutorial-step-context';
import Drawer from '../Common/Drawer';
import Video from '../Video';
import { Tutorial } from '.';

type TutorialStepsProps = {
  url: string;
  title: string;
  subtitle: React.ReactNode;
};

export default function TutorialSteps({
  url,
  title,
  subtitle,
}: TutorialStepsProps) {
  const { activeStep, setActiveStep, smallDevice } =
    useContext(TutorialStepContext);

  return (
    <Box mt={2}>
      <Suspense fallback={<CircularProgress />}>
        <Box display="flex">
          {smallDevice && (
            <Drawer>
              <Tutorial.Selection
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Drawer>
          )}
          <Typography variant="h2" ml={1}>
            {title}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container justifyContent="center">
          <Grid item xs={11} md={10} my={2}>
            <Video.Player
              src={`https://www.youtube-nocookie.com/embed/${url}`}
              loading="lazy"
              allowFullScreen
              aria-label="Vídeo tutorial sobre a plataforma do DadosJusBr"
            />
          </Grid>
        </Grid>
        <Box pb={2}>{subtitle}</Box>
      </Suspense>
    </Box>
  );
}
