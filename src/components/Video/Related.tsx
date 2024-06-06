import { useState } from 'react';
import {
  Button,
  ClickAwayListener,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  styled as muiStyled,
  Box,
  ButtonProps,
  Grid,
} from '@mui/material';

type RelatedProps = {
  setVideoURL: (url: string) => void;
  relatedVideos: string[];
  buttonProps?: ButtonProps;
};

export default function Related({
  setVideoURL,
  relatedVideos,
  buttonProps,
}: RelatedProps) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <HtmlTooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableTouchListener
        title={
          <Grid container gap={2}>
            {relatedVideos.map(videoId => (
              <Grid item key={videoId}>
                <img
                  src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                  width={170}
                  height={(9 / 16) * 170}
                  onClick={() => setVideoURL(videoId)}
                  style={{ borderRadius: 4, cursor: 'pointer' }}
                />
              </Grid>
            ))}
          </Grid>
        }
      >
        <Button onClick={handleTooltipOpen} sx={{ py: 0 }} {...buttonProps}>
          Relacionados com esse conteúdo
        </Button>
      </HtmlTooltip>
    </ClickAwayListener>
  );
}

const HtmlTooltip = muiStyled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f5',
    color: 'rgba(0, 0, 0, 0.87)',
    width: 375,
    maxWidth: 'fit-content',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    padding: theme.spacing(1),
  },
}));
