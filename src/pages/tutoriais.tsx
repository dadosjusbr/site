import { Box, Container, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Essentials/Header';
import Footer from '../components/Essentials/Footer';
import { Tutorial } from '../components/Tutorial';
import { TutorialStepContext } from '../contexts/tutorial-step-context';

const Tutoriais = () => {
  const [activeStep, setActiveStep] = useState(0);
  const smallDevice = useMediaQuery('(max-width:900px)');

  return (
    <>
      <Head>
        <title>DadosJusBr</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta property="og:title" content="DadosJusBr" />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro."
        />
      </Head>
      <Header />
      <TutorialStepContext.Provider
        value={{ activeStep, setActiveStep, smallDevice }}
      >
        <Container>
          <Box
            display="flex"
            my={4}
            border="1px solid rgba(255, 255, 255, 0.12)"
            borderRadius="12px"
          >
            {!smallDevice && (
              <Box
                p={2}
                bgcolor="rgb(217,217,217, 0.2)"
                maxWidth={320}
                borderRadius="12px 0 0 12px"
              >
                <Tutorial.Selection
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </Box>
            )}
            <Box width="100%">{Tutorial.ActivateSteps[activeStep]}</Box>
          </Box>
        </Container>
      </TutorialStepContext.Provider>
      <Footer />
    </>
  );
};

export default Tutoriais;
