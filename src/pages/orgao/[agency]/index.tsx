import { GetServerSideProps } from 'next';
import React from 'react';

const Agency: React.FC = () => <></>;

export default Agency;

export const getServerSideProps: GetServerSideProps = async context => ({
  redirect: `/orgao/${context.params.agency}/${new Date().getFullYear()}`,
  props: {},
});
