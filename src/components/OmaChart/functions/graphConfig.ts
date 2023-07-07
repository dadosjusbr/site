export const graphOptions = {
  legend: {
    show: false,
  },
  colors: ['#c9a0d0', '#513658'],
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
  },
  responsive: [
    {
      breakpoint: 500,
      options: {
        chart: {
          width: '95%',
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '70%',
    },
  },
  yaxis: {
    decimalsInFloat: 2,
    labels: {
      show: true,
      minWidth: 0,
      maxWidth: 160,
      style: {
        colors: [],
        fontSize: '14px',
        fontFamily: 'Roboto Condensed, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-label',
      },
    },
    title: {
      text: 'Valor',
      offsetX: 5,
    },
  },
  xaxis: {
    categories: [
      '> R$ 50 mil',
      'R$ 40-50 mil',
      'R$ 30-40 mil',
      'R$ 20-30 mil',
      'R$ 10-20 mil',
      '< R$ 10 mil',
    ],
    title: {
      text: 'Quantidade',
      offsetY: 10,
    },
  },
  fill: {
    opacity: 1,
  },
  dataLabels: {
    enabled: false,
  },
};
