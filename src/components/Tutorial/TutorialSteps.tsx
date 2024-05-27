import { Suspense } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import Video from '../Video';

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
  return (
    <Box mt={2}>
      <Suspense fallback={<CircularProgress />}>
        <Typography variant="h2" ml={4}>
          {title}
        </Typography>
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
