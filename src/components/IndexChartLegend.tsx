import React from 'react';
import styled from 'styled-components';
import { Badge, Box } from '@mui/material';

const ChartLegend: React.FC = () => (
  <>
    <Box component="span" pr={4}>
      <StyledBadge badgeContent="" color="success">
        &nbsp;
      </StyledBadge>
      Índice de transparência
    </Box>
    <Box component="span" pr={4}>
      Dimensões:
    </Box>
    <Box component="span" pr={4}>
      <StyledBadge badgeContent="" color="warning">
        &nbsp;
      </StyledBadge>
      Completude
    </Box>
    <Box component="span" pr={4}>
      <StyledBadge badgeContent="" color="primary">
        &nbsp;
      </StyledBadge>
      Facilidade
    </Box>
  </>
);

const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    right: 15,
    top: 10,
  },
});

export default ChartLegend;
