import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Team() {
  const [teamMates] = useState([
    {
      name: 'Juliana Sakai',
      role: 'Lider',
      profileURL: 'https://www.linkedin.com/in/julianasakai/',
      photoURL: '/img/team/ju_sakai.jpg',
    },
    {
      name: 'Manuel Eduardo',
      role: 'Developer',
      profileURL: 'https://github.com/Manuel-Antunes',
      photoURL:
        'https://avatars.githubusercontent.com/u/57446204?s=400&u=119738df168b0617e080d17c17e543ba573aa5cb&v=4',
    },
    {
      name: 'Daniel Fireman',
      role: 'Professor',
      profileURL: 'https://github.com/danielfireman',
      photoURL:
        'https://avatars2.githubusercontent.com/u/8951363?s=400&u=acdedbbd00a15d2f913e3e1bde6b14f2c7451f90&v=4',
    },
    {
      name: 'Nazareno Andrade',
      role: 'Professor',
      profileURL: 'https://github.com/nazareno',
      photoURL:
        'https://avatars0.githubusercontent.com/u/1053850?s=460&u=e1cbfe4f7cba06cf5908f8967c2db24e142ff7c7&v=4',
    },
    {
      name: 'Mariana Solto',
      role: 'UI/UX',
      profileURL: 'https://github.com/soutoam',
      photoURL:
        'https://avatars3.githubusercontent.com/u/15800324?s=400&u=11b49d52de39d773024ad1894cdbf33c1637532a&v=4',
    },
    {
      name: 'Samara Sonale',
      role: 'Developer',
      profileURL: 'https://www.linkedin.com/in/samara-sonale-4b805b194/',
      photoURL: '/img/team/samara_sonale.jpg',
    },
  ]);
  const [partners] = useState([
    {
      name: 'APBMP',
      img: '/img/partners/APBMP.svg',
    },
    {
      name: 'analytics',
      img: '/img/partners/analytics.svg',
    },
    {
      name: 'MPPB',
      img: '/img/partners/MPPB.svg',
    },
    {
      name: 'shuttleworth',
      img: '/img/partners/shuttleworth.svg',
    },
  ]);
  const [contribuitors] = useState([
    {
      name: 'TB',
      img: '/img/team/logo_transparencia_brasil.svg',
    },
    {
      name: 'UFCG',
      img: '/img/team/logo_ufcg.svg',
    },
  ]);
  return (
    <Page>
      <Head>
        <title>Equipe</title>
      </Head>
      <Header />
      <ResizableListWrapper>
        <h1>EQUIPE</h1>
        <ul>
          {teamMates.map(teamMate => (
            <TeamMateProfile key={teamMate.name}>
              <a href={teamMate.profileURL}>
                <img src={teamMate.photoURL} alt={teamMate.name} />
                <span>{teamMate.name}</span>
                <p>{teamMate.role}</p>
              </a>
            </TeamMateProfile>
          ))}
        </ul>
      </ResizableListWrapper>
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
          <a href="https://github.com/dadosjusbr/coletores">
            <Button
              hoverBackgroundColor="#FFF"
              hoverTextColor="#3e5363"
              borderColor="#FFF"
            >
              SAIBA MAIS AQUI
            </Button>
          </a>
        </div>
      </WantHelp>
      <ResizableListWrapper className="for-partners contribuitors">
        <h1>REALIZAÇÃO</h1>
        <ul>
          {contribuitors.map(contribuitor => (
            <Partner key={contribuitor.name}>
              <img src={contribuitor.img} alt={contribuitor.name} />
            </Partner>
          ))}
        </ul>
      </ResizableListWrapper>
      <ResizableListWrapper className="for-partners">
        <h1>PARCEIROS</h1>
        <ul>
          {partners.map(partner => (
            <Partner key={partner.name}>
              <img src={partner.img} alt={partner.name} />
            </Partner>
          ))}
        </ul>
      </ResizableListWrapper>
      <Footer />
    </Page>
  );
}
const Page = styled.div`
  background: #2fbb96;
`;
const ResizableListWrapper = styled.div`
  margin: 10% 68px 0%;

  @media (max-width: 600px) {
    padding: 0;
    margin: 10% 20px 0%;
  }
  margin-top: 8%;
  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 2.5rem;
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
  &.for-partners {
    margin-bottom: 5rem;
    padding: 0;
    @media (max-width: 600px) {
      margin: 10% 20px 0 20px;
    }
  }
  &.contribuitors {
    margin-bottom: 0;
    ul {
      justify-content: flex-start;
    }
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
  @media (max-width: 640px) {
    flex-direction: column;
    padding: 10% 3%;
    div {
      & + div {
        margin-left: 0;
        margin-top: 5rem;
      }
    }
  }
  background-color: #3e5363;
`;
const TeamMateProfile = styled.li`
  min-width: 30%;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10rem;

    img {
      border-radius: 50%;
      width: 20rem;
    }
    span {
      font-size: 2.3rem;
      font-weight: bold;
    }
    font-style: normal;
    font-size: 3.5rem;
    font-family: 'Roboto Condensed', sans-serif;
    color: #3e5363;
    @media (max-width: 600px) {
      padding: 0;
      font-size: 2.5rem;
      span {
        font-size: 1.7rem;
      }
      img {
        width: 15rem;
      }
    }
  }
`;
const Partner = styled.li`
  width: 30rem;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
  }
  @media (max-width: 760px) {
    width: 15rem;
  }
`;
