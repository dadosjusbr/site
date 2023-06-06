import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const index = ({
  matches,
  totalMembers,
  maxWage,
  totalWage,
  maxPerk,
  totalPerks,
}: {
  matches: boolean;
  totalMembers: number;
  maxWage: number;
  totalWage: number;
  maxPerk: number;
  totalPerks: number;
}) => {
  return (
    <Grid item xs={12} md={20}>
      <Paper elevation={0}>
        <Box p={2} pb={0} textAlign="center">
          <Typography variant="h6">
            Resumo de remunerações de membros ativos
          </Typography>
        </Box>
        <Box p={2} pt={0}>
          <List dense>
            <Grid container justifyContent="space-between">
              <Grid item md={3}>
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
              <Grid item md={3}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountBalanceWalletIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Maior salário: R$ ${(maxWage / 1000).toFixed(
                      2,
                    )} mil`}
                    secondary={`Total de salários: R$ ${(
                      totalWage / 1000000
                    ).toFixed(2)}M`}
                  />
                </ListItem>
              </Grid>
              <Grid item md={3}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CardGiftcardIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Maior benefício: R$ ${(maxPerk / 1000).toFixed(
                      2,
                    )} mil`}
                    secondary={`Total de benefícios: R$ ${(
                      totalPerks / 1000000
                    ).toFixed(2)}M`}
                  />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Box>
      </Paper>
    </Grid>
  );
};

export default index;
