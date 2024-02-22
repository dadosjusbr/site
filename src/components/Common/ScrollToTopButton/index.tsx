import { Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fab
      color="primary"
      size="small"
      aria-label="scroll-to-top"
      title="Voltar ao topo da página"
      onClick={handleScrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: showScrollToTop ? 'flex' : 'none',
      }}
    >
      <KeyboardArrowUpIcon
        sx={{
          pointerEvents: 'none',
        }}
      />
    </Fab>
  );
};

export default ScrollToTopButton;
