import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListIcon from '@mui/icons-material/List';

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
  children: any;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#3e5363',
}));

export default function Drawer(props: Props) {
  const { window, children } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ textAlign: 'end', py: 1 }}>
        <Button onClick={toggleDrawer(true)}>
          <ListIcon fontSize="large" color="info" />
        </Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}
