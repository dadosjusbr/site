import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RemoveCircle from '@mui/icons-material/CancelPresentation';
import Payments from '@mui/icons-material/Payments';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InfoIcon from '@mui/icons-material/Info';
import { formatCurrencyValue } from '../../../functions/format';

const index = ({
  totalMembers,
  maxWage,
  totalWage,
  maxPerk,
  totalPerks,
  maxRemuneration,
  totalRemuneration,
  discounts,
  maxDiscounts,
}: {
  totalMembers: number;
  maxWage: number;
  totalWage: number;
  maxPerk: number;
  totalPerks: number;
  maxRemuneration: number;
  totalRemuneration: number;
  discounts: number;
  maxDiscounts: number;
}) => (
  <Grid item xs={12} md={20}>
    <Paper elevation={0}>
      <Box p={2} pb={0} textAlign="center">
        <Typography variant="h6">
          Resumo de remunerações de membros ativos
          <Tooltip
            placement="bottom"
            title={
              <Typography fontSize={{ xs: '0.8rem', md: '0.9rem' }}>
                <b>Remuneração:</b> Valor final da soma entre salário e
                benefícios, retirando os descontos.
                <hr />
                <b>Salário:</b> Valor recebido de acordo com a prestação de
                serviços, em decorrência do contrato de trabalho.
                <hr />
                <b>Benefícios:</b> Qualquer remuneração recebida por um
                funcionário que não seja proveniente de salário. Exemplos de
                benefícios são: diárias, gratificações, remuneração por função
                de confiança, benefícios pessoais ou eventuais, auxílios
                alimentação, saúde, escolar...
                <hr />
                <b>Descontos:</b> Valor retirado do salário ou de benefícios do
                funcionário de acordo com a lei, como imposto de renda,
                contribuição para previdência, pensão alimentícia, entre outros.
                <hr />
                <b>Membros:</b> Participantes ativos do órgao, incluindo os
                servidores públicos, os militares e os membros do Poder
                Judiciário.
                <hr />
                <b>Servidor:</b> Funcionário público que exerce cargo ou função
                pública, com vínculo empregatício, e que recebe remuneração fixa
                ou variável.
              </Typography>
            }
          >
            <IconButton aria-label="Botão de informações">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Box>
      <Box p={2} pt={0}>
        <List dense>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item md={3.5}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Payments />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Maior remuneração: ${formatCurrencyValue(
                    maxRemuneration,
                    1,
                  )}`}
                  secondary={`Total de remunerações: ${formatCurrencyValue(
                    totalRemuneration,
                    2,
                  )}`}
                />
              </ListItem>
            </Grid>
            <Grid item md={3.5}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Maior salário bruto: ${formatCurrencyValue(
                    maxWage,
                    1,
                  )}`}
                  secondary={`Total de salários brutos: ${formatCurrencyValue(
                    totalWage,
                    2,
                  )} `}
                />
              </ListItem>
            </Grid>
            <Grid item md={3.5}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CardGiftcardIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Maior benefício bruto: ${formatCurrencyValue(
                    maxPerk,
                    1,
                  )}`}
                  secondary={`Total de benefícios brutos: ${formatCurrencyValue(
                    totalPerks,
                    2,
                  )}`}
                />
              </ListItem>
            </Grid>
            <Grid item md={3.5}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RemoveCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Maior desconto: ${formatCurrencyValue(
                    maxDiscounts,
                    1,
                  )}`}
                  secondary={`Total de descontos: ${formatCurrencyValue(
                    discounts,
                    2,
                  )}`}
                />
              </ListItem>
            </Grid>
            <Grid item md={3.5}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmojiPeopleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Quantidade de membros: ${totalMembers}`}
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </Box>
    </Paper>
  </Grid>
);

export default index;
