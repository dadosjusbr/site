import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import MONTHS from '../../../@types/MONTHS';

type ReportsProps = {
  title: string;
  glimpse: string;
  date: string;
  site: string;
  url: string;
};

function NewsClipping({ reports }: { reports: ReportsProps[] }) {
  const formated = reports.sort((a, b) => {
    const dateA = new Date(
      +a.date.split('/')[1],
      MONTHS[a.date.split('/')[0]],
      1,
    );
    const dateB = new Date(
      +b.date.split('/')[1],
      MONTHS[b.date.split('/')[0]],
      1,
    );

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
  });

  const list = formated.map((n, i) => <NewsClip id={i} report={n} />);
  return list;
}

function NewsClip({ report, id }: { report: ReportsProps; id: number }) {
  return (
    <Card
      id={`clipcard-${id}`}
      onClick={() => {
        window.open(report.url, '_blank');
      }}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: { xs: 200, md: 280 },
        }}
      >
        <Box>
          <Typography variant="h5">{report.title}</Typography>
          <Typography color="text.secondary" mt={2}>
            {report.glimpse}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography color="text.secondary">{report.date}</Typography>
          <Typography color="text.secondary">{report.site}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default NewsClipping;
