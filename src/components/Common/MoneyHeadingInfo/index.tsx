import { Typography } from '@mui/material';

export default function MoneyHeadingInfo() {
  return (
    <Typography fontSize={{ xs: '0.8rem', md: '0.9rem' }}>
      <b>Auxílio-saúde: </b>
      Reembolso de despesas com planos de saúde, inclusive excedentes do teto.
      <hr />
      <b>Licença-prêmio: </b>
      A cada 5 anos de serviço, o servidor tem direito a 3 meses de licença.
      Alguns órgãos permitem a conversão em pecúnia.
      <hr />
      <b>Auxílio-alimentação: </b> Custeio de alimentação não incorporável ao
      salário.
      <hr />
      <b>Férias: </b>
      Recebimento do adicional constitucional de{' '}
      <span style={{ fontSize: 18 }}> &#8531; </span> no salário no período de
      descanso remunerado.
      <hr />
      <b>Indenização de Férias: </b>
      Venda de períodos de férias não usufruídos.
      <hr />
      <b>Gratificação Natalina: </b>
      Corresponde ao 13° salário.
      <hr />
      <b>Licença-compensatória: </b>
      Conversão em pecúnia de um benefício de dias de descanso por acúmulo de
      serviço, em caráter indenizatório, podem aumentar o vencimento bruto em
      até <span style={{ fontSize: 18 }}> &#8531; </span> ao mês.
    </Typography>
  );
}
