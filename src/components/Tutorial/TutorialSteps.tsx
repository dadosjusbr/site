import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import Video from '../Video';
import { Suspense } from 'react';

type TutorialStepsProps = {
  url: string;
  title: string;
  subtitle: string;
};

export default function TutorialSteps({
  url,
  title,
  subtitle,
}: TutorialStepsProps) {
  return (
    <Box mt={2}>
      <Suspense fallback={<CircularProgress />}>
        <Typography variant="h2" textAlign="center">
          {title}
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={11} md={10}>
            <Video.Player
              src={`https://www.youtube-nocookie.com/embed/${url}`}
              loading="lazy"
              allowFullScreen
              aria-label="Vídeo sobre o Portal de Remunerações"
            />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" textAlign="center">
          {subtitle}
        </Typography>
      </Suspense>
    </Box>
  );
}
