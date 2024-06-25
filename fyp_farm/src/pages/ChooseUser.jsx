import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';
import { loginUser } from './redux/userRelated/userHandle';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, currentRole } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/admin/dashboard');
      } else if (currentRole === 'Farmer') {
        navigate('/farmer/dashboard');
      } else if (currentRole === 'Manager') {
        navigate('/manager/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage('Network Error');
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  const navigateHandler = async (user) => {
    setLoader(true);
    try {
      const email = prompt(`Enter the email for ${user}`);
      const password = prompt(`Enter the password for ${user}`);

      if (!email || !password) {
        setLoader(false);
        return;
      }

      const response = await axios.get(`http://localhost:8080/user/${user.toLowerCase()}`);
      const userFromDb = response.data.find((u) => u.email === email);

      if (!userFromDb) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, userFromDb.passwordHash);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const fields = { email, password };

      dispatch(loginUser(fields, user));
    } catch (error) {
      setLoader(false);
      setMessage(error.message || 'Network Error');
      setShowPopup(true);
    }
  };

  return (
    <StyledContainer>
      <StyledGridContainer>
        <div onClick={() => navigateHandler('Admin')}>
          <StyledPaper>
            <Box mb={2}>
              <StyledIcon className="admin-icon" />
            </Box>
            <StyledTypography>Admin</StyledTypography>
            Login as an administrator to access the dashboard to manage app data.
          </StyledPaper>
        </div>
        <div onClick={() => navigateHandler('Farmer')}>
          <StyledPaper>
            <Box mb={2}>
              <StyledIcon className="farmer-icon" />
            </Box>
            <StyledTypography>Farmer</StyledTypography>
            Login as a farmer to access your dashboard and manage your tasks.
          </StyledPaper>
        </div>
        <div onClick={() => navigateHandler('Manager')}>
          <StyledPaper>
            <Box mb={2}>
              <StyledIcon className="manager-icon" />
            </Box>
            <StyledTypography>Manager</StyledTypography>
            Login as a manager to oversee operations and manage resources.
          </StyledPaper>
        </div>
      </StyledGridContainer>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      {loader && (
        <Backdrop open>
          <CircularProgress color="inherit" />
          Please Wait
        </Backdrop>
      )}
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const StyledGridContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledPaper = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2c2c6c;
    color: white;
  }
`;

const Box = styled.div`
  margin-bottom: 16px;
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  color: #ffffff; /* Default color */
`;

const StyledIcon = styled.div`
  &.admin-icon::before {
    content: "\\E853"; /* Unicode for AccountCircle icon */
    font-family: 'Material Icons';
    font-size: 48px;
  }

  &.farmer-icon::before {
    content: "\\E2C7"; /* Unicode for Agriculture icon */
    font-family: 'Material Icons';
    font-size: 48px;
  }

  &.manager-icon::before {
    content: "\\E8F6"; /* Unicode for Supervisor Account icon */
    font-family: 'Material Icons';
    font-size: 48px;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircularProgress = styled.div`
  color: white;
  font-size: 24px;
  margin-right: 10px;
`;

const Popup = ({ message, setShowPopup, showPopup }) => (
  showPopup && (
  <PopupContainer>
    <PopupMessage>{message}</PopupMessage>
    <CloseButton onClick={() => setShowPopup(false)}>Close</CloseButton>
  </PopupContainer>
  )
);

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PopupMessage = styled.p`
  margin: 0 0 1rem 0;
`;

const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1f1f38;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2c2c6c;
  }
`;
