import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import Video from '../Video';
import React, { Suspense } from 'react';

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
              aria-label="Vídeo sobre o Portal de Remunerações"
            />
          </Grid>
        </Grid>
        <Box pb={2}>{subtitle}</Box>
      </Suspense>
    </Box>
  );
}
