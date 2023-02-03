import React from 'react';

import NewsClip from './NewsClip';

function NewsClipping({ news }) {
  const formated = news.map((n: any) => {
    n.formatedDate = new Date(n.date * 1000);
    return n;
  });

  const list = formated
    .sort((a, b) => b.date - a.date)
    .map((n, i) => <NewsClip id={i} news={n} />);
  return list;
}
export default NewsClipping;
