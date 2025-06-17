import { Box, BoxProps, Typography } from '@mui/material';

const rows = [
  {
    width: '20%',
  },
  {
    width: '45%',
  },
  {
    width: '50%',
  },
  {
    width: '35%',
  },
  {
    width: '45%',
  },
  {
    width: '45%',
  },
  {
    width: '50%',
  },
  {
    width: '45%',
  },
];

function DJBRGPTCard() {
  return (
    <Box
      width="100%"
      maxWidth="400px"
      borderRadius="8px"
      overflow="auto"
      bgcolor="white"
      sx={{ boxShadow: 1, cursor: 'pointer', textDecoration: 'none' }}
      component="a"
      href="https://chatgpt.com/g/g-67f804e0f7c081919a7dd6e9a46b14c1-dadosjusbr-gpt"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box bgcolor="rgba(242, 202, 75, 0.5)" padding="12px">
        <Box
          bgcolor="white"
          padding="12px"
          borderRadius="6px"
          gridTemplateColumns="0.2fr 0.01fr 1fr"
          gap={0.5}
          display="grid"
        >
          <Box my={1} display="flex" flexDirection="column" gap={1}>
            {Array.from({ length: 4 }).map(() => (
              <ChatRow
                width="90%"
                height={12}
                borderRadius={1}
                justifyContent="flex-start"
              />
            ))}
          </Box>
          <Box
            width="80%"
            display="flex"
            alignItems="center"
            bgcolor="#b3b3b3"
            borderRadius={4}
          />
          <Box display="flex" flexDirection="column" gap={0.3} ml={2}>
            {rows.map((c, index) => (
              <Box>
                <ChatRow
                  width={c.width}
                  justifyContent={index % 2 === 0 ? 'flex-end' : 'flex-start'}
                  boxProps={{
                    sx: {
                      opacity: 0,
                      animation: `fadeIn 0.5s ease-in-out forwards ${
                        index * 0.9
                      }s`,
                      '@keyframes fadeIn': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(10px)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box bgcolor="white" padding="12px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={20}
          width="fit-content"
          borderRadius={4}
          bgcolor="rgba(127, 61, 139, 0.45)"
          mb={1}
          px={2}
        >
          <Typography
            color="white"
            variant="h2"
            fontSize={11}
            fontWeight={700}
            p={0}
          >
            Inteligência Artificial
          </Typography>
        </Box>
        <Typography
          color="#000"
          variant="h3"
          fontSize={20}
          fontWeight={700}
          pb={0}
        >
          Utilize IA para analisar o sistema de Justiça
        </Typography>
        <Typography color="#000" variant="body1" mt={1}>
          O DadosJusBr desenvolveu uma extensão para o ChatGPT que automatiza as
          consultas dos contracheques. Clique e confira!
        </Typography>
      </Box>
    </Box>
  );
}

export default DJBRGPTCard;

const ChatRow = ({
  width,
  height = 8,
  borderRadius = 4,
  justifyContent,
  boxProps = {},
}: {
  width: string | number;
  height?: string | number;
  borderRadius?: number;
  justifyContent: string;
  boxProps?: BoxProps;
}) => (
  <Box
    width="100%"
    justifyContent={justifyContent}
    display="flex"
    {...boxProps}
  >
    <Box
      width={width}
      height={height}
      borderRadius={borderRadius}
      bgcolor="#D9D9D9"
    />
  </Box>
);
