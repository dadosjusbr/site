import React from 'react';
import styled from 'styled-components';
import { Badge, Box, Grid } from '@mui/material';

const ChartLegend: React.FC = () => (
  <Grid container color="#000" ml={{ xs: 1, md: 4 }}>
    <Grid item>
      <Box component="span" pr={3}>
        <StyledBadge badgeContent="" color="success">
          &nbsp;
        </StyledBadge>
        Índice de transparência
      </Box>
    </Grid>
    <Grid item>
      <Box component="span" pr={1}>
        Dimensões:
      </Box>
      <Box component="span" pr={3}>
        <StyledBadge badgeContent="" color="warning">
          &nbsp;
        </StyledBadge>
        Completude
      </Box>
      <Box component="span">
        <StyledBadge badgeContent="" color="primary">
          &nbsp;
        </StyledBadge>
        Facilidade
      </Box>
    </Grid>
  </Grid>
);

const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    right: 15,
    top: 10,
    position: 'relative',
  },
});

export default ChartLegend;
