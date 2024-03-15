import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type NewsProps = {
  title: string;
  date: number;
  formatedDate?: string;
  site: string;
  url: string;
};

function NewsClipping({ news }: { news: NewsProps[] }) {
  const formated = news.map((n: NewsProps) => {
    n.formatedDate = new Date(n.date * 1000).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    return n;
  });

  const list = formated
    .sort((a, b) => b.date - a.date)
    .map((n, i) => <NewsClip id={i} news={n} />);
  return list;
}

function NewsClip({ news, id }: { news: NewsProps; id: number }) {
  return (
    <Card
      id={`clipcard-${id}`}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent>
        <Typography color="text.secondary">{news.formatedDate}</Typography>
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
  );
}
export default NewsClipping;
