import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function DownloadPopover({
  children,
  open,
  anchorEl,
  handlePopoverClose,
  downloadSize,
}) {
  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(dm))} ${sizes[i]}`;
  }
  return (
    <div>
      {children}

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          mt: 0.5,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography
          sx={{
            p: 1,
            minWidth: 100,
            textAlign: 'center',
            backgroundColor: '#4d606f',
            color: 'white',
          }}
        >
          {formatBytes(downloadSize)}
        </Typography>
      </Popover>
    </div>
  );
}
