import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Team() {
  const [teamMates] = useState([
    {
      name: 'Manuel Eduardo',
      tag: 'Developer',
      photoURL:
        'https://avatars.githubusercontent.com/u/57446204?s=400&u=119738df168b0617e080d17c17e543ba573aa5cb&v=4',
    },
    {
      name: 'Manuel Eduardo',
      tag: 'Developer',
      photoURL:
        'https://avatars.githubusercontent.com/u/57446204?s=400&u=119738df168b0617e080d17c17e543ba573aa5cb&v=4',
    },
    {
      name: 'Manuel Eduardo',
      tag: 'Developer',
      photoURL:
        'https://avatars.githubusercontent.com/u/57446204?s=400&u=119738df168b0617e080d17c17e543ba573aa5cb&v=4',
    },
  ]);
  return (
    <Page>
      <Head>
        <title>Equipe</title>
      </Head>
      <Header />
      <TeamList>
        <h1>Time</h1>
        <ul>
          {teamMates.map(teamMate => (
            <TeamMateProfile key={teamMate.name}>
              <img src={teamMate.photoURL} alt={teamMate.name} />
              <span>{teamMate.name}</span>
              <p>{teamMate.tag}</p>
            </TeamMateProfile>
          ))}
        </ul>
      </TeamList>
      <Footer />
    </Page>
  );
}
const Page = styled.div`
  background: #2fbb96;
`;
const TeamList = styled.div`
  margin: 10% 68px;

  @media (max-width: 600px) {
    padding: 0;
    margin: 10% 20px;
  }
  margin-top: 8%;
  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    font-family: 'Roboto Condensed', sans-serif;
    color: #3e5363;
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 6%;
  }
`;
const TeamMateProfile = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8%;
  @media (max-width: 600px) {
    padding: 0;
  }
  img {
    border-radius: 50%;
    width: 150px;
  }
  span {
    font-size: 1.7rem;
    font-weight: bold;
  }
  font-style: normal;
  font-size: 2.5rem;
  font-family: 'Roboto Condensed', sans-serif;
  color: #3e5363;
`;
