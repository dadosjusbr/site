import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MONTHS from '../@types/MONTHS';

function NewsClip({ news, id }) {
  return (
    <Grid id={`clip-${id}`} item sx={{ width: 692 }}>
      <Card id={`clipcard-${id}`}>
        <CardContent>
          <Typography color="text.secondary">
            {`${news.formatedDate.getDate()} de ${
              MONTHS[news.formatedDate.getMonth() + 1]
            } de
            ${news.formatedDate.getFullYear()}`}
          </Typography>
          <Typography variant="h5">{news.title}</Typography>
          <Typography color="text.secondary">{news.site}</Typography>
          <Box textAlign="right">
            <Button
              size="small"
              variant="outlined"
              color="info"
              endIcon={<OpenInNewIcon />}
              href={news.url}
              target="_blank"
            >
              Leia
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
export default NewsClip;
