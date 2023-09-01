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
      <Box pt={2} textAlign="center">
        <Typography variant="h6">
          Resumo de remunerações de membros
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
                <b>Membros:</b> Participantes do órgao, incluindo os servidores
                públicos, os militares e os membros do Poder Judiciário.
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
      <Box p={2} pt={0} ml="6%">
        <List dense>
          <Grid container justifyContent="flex-start" alignItems="center">
            <Grid item>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Payments />
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <ListItemText primaryTypographyProps={{ lineHeight: 1 }}>
                    Remuneração média:{' '}
                    {formatCurrencyValue(totalRemuneration / totalMembers, 2)}
                  </ListItemText>
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Maior remuneração: ${formatCurrencyValue(
                      maxRemuneration,
                      1,
                    )}`}
                  />
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Total de remunerações:
                    ${formatCurrencyValue(totalRemuneration, 2)}`}
                  />
                </Box>
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <ListItemText primaryTypographyProps={{ lineHeight: 1 }}>
                    Salário bruto médio:{' '}
                    {formatCurrencyValue(totalWage / totalMembers, 2)}
                  </ListItemText>
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Maior salário bruto: ${formatCurrencyValue(
                      maxWage,
                      1,
                    )}`}
                  />
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Total de salários brutos:
                    ${formatCurrencyValue(totalWage, 2)}`}
                  />
                </Box>
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CardGiftcardIcon />
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <ListItemText primaryTypographyProps={{ lineHeight: 1 }}>
                    Benefício bruto médio:{' '}
                    {formatCurrencyValue(totalPerks / totalMembers, 2)}
                  </ListItemText>
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Maior benefício bruto: ${formatCurrencyValue(
                      maxPerk,
                      1,
                    )}`}
                  />
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Total de benefícios brutos:
                    ${formatCurrencyValue(totalPerks, 2)}`}
                  />
                </Box>
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RemoveCircle />
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <ListItemText primaryTypographyProps={{ lineHeight: 1 }}>
                    Desconto médio:{' '}
                    {formatCurrencyValue(discounts / totalMembers, 2)}
                  </ListItemText>
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Maior desconto: ${formatCurrencyValue(
                      maxDiscounts,
                      1,
                    )}`}
                  />
                  <ListItemText
                    secondaryTypographyProps={{ lineHeight: 1 }}
                    secondary={`Total de desconto:
                    ${formatCurrencyValue(discounts, 2)}`}
                  />
                </Box>
              </ListItem>
            </Grid>
            <Grid item>
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
