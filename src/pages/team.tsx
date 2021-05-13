import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
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
      <WantHelp>
        <div>
          <h2> SE INTERESSOU, QUER AJUDAR?</h2>
          <br />O sistema de justiça brasileiro é composto por uma grande
          quantidade de órgãos federais e estaduais distribuídos por todo o
          território nacional.
          <br />
          <br />
          Por isso, precisamos de contribuidores para criar crawlers e parsers
          para alimentar nossa base de dados.
        </div>
        <div>
          <Button
            hoverBackgroundColor="#FFF"
            hoverTextColor="#3e5363"
            borderColor="#FFF"
          >
            SAIBA MAIS AQUI
          </Button>
        </div>
      </WantHelp>
      <Footer />
    </Page>
  );
}
const Page = styled.div`
  background: #2fbb96;
`;
const TeamList = styled.div`
  margin: 10% 68px 0%;

  @media (max-width: 600px) {
    padding: 0;
    margin: 10% 20px 0%;
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
const WantHelp = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 10% 5%;
  padding-right: 10%;
  div {
    display: flex;
    font-size: 2rem;
    flex-direction: column;
    * {
      font-size: 2rem;
    }
    & + div {
      margin-left: 15rem;
      align-items: center;
      justify-content: center;
    }
    font-family: 'Roboto Condensed', sans-serif;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
  background-color: #3e5363;
`;
const TeamMateProfile = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 7%;
  margin-bottom: 10rem;

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
