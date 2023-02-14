import { GetServerSideProps } from 'next';
import React from 'react';
import { getCurrentYear } from '../../../functions/currentYear';

const Agency: React.FC = () => <></>;

export default Agency;

export const getServerSideProps: GetServerSideProps = async context => ({
  redirect: {
    destination: `/orgao/${context.params.agency}/${getCurrentYear()}`,
  },
  props: {},
});
