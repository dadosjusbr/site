import { Box, Button, Backdrop, Modal, Fade, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type TransitionModalProps = {
  children: React.ReactNode;
  agency: Agency;
  open: boolean;
  handleClose: () => void;
  style: Record<string, unknown>;
};

const index = ({
  children,
  agency,
  open,
  handleClose,
  style,
}: TransitionModalProps) => (
  <div>
    {children}
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 800 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Ajude na inclusão de dados do {agency?.nome}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2, textAlign: 'justify' }}
          >
            Para ajudar a incluir os dados deste tribunal no DadosJusBr, você
            pode protocolar um requerimento na ouvidoria solicitando mudanças na
            {agency?.coletando[0].descricao.map((desc: string, i: number) => (
              <span key={desc}>
                {` ${desc.split(' ').at(0).toLowerCase()} ${desc
                  .split(' ')
                  .at(1)} ${desc.split(' ').at(2)}
                    ${
                      agency?.coletando[0].descricao.length > 1 && i === 0
                        ? 'e'
                        : ''
                    }`}
              </span>
            ))}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              color="info"
              href={agency?.ouvidoria}
              target="_blank"
              endIcon={<ArrowForwardIosIcon />}
            >
              Ir para a ouvidoria
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  </div>
);

export default index;
