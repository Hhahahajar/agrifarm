import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import FarmImage from '../data/farm.jpg';
import { Button } from '../components';

const Homepage = () => (
  <StyledContainer>
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <StyledImage src={FarmImage} alt="Farm Image" />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledPaper elevation={3}>
          <StyledTitle>
            Welcome to Farm Fleet Management System
          </StyledTitle>
          <StyledText>
            Efficiently manage your farm operations with our comprehensive fleet management solution.
            Monitor vehicles, equipment, and personnel to streamline productivity and enhance efficiency.
          </StyledText>
          <StyledBox>
            <StyledLink to="/login">
              <Button variant="contained" fullWidth>
                Sign In
              </Button>
            </StyledLink>
            <StyledLink to="/about">
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2, mb: 1, color: '#7f56da', borderColor: '#7f56da' }}
              >
                About Us
              </Button>
            </StyledLink>
            <StyledLink to="/contact">
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 3, color: '#7f56da', borderColor: '#7f56da' }}
              >
                Contact Us
              </Button>
            </StyledLink>
          </StyledBox>
        </StyledPaper>
      </Grid>
    </Grid>
  </StyledContainer>
);

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
`;

const StyledText = styled.p`
  color: #252525;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

