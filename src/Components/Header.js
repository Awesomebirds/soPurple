import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { authService, googleProvider } from "myFirebase";

const Container = styled.div`
  width: 100%;
  height: 50px;
  box-shadow: 0 1px 6px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;

const HomeLogo = styled(Link)`
  font-size: 18px;
  letter-spacing: 3px;
  font-weight: 600;
  color: #7626f3;
`;

const IconContainer = styled.span`
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const signInGoogle = async () => {
  await authService.signInWithRedirect(googleProvider);
};

const Header = () => {
  return (
    <Container>
      <IconContainer>
        <img src={require("assets/svg/menu.svg").default} />
      </IconContainer>
      <HomeLogo to="/">SO PURPLE</HomeLogo>
      <IconContainer onClick={signInGoogle}>
        <img src={require("assets/svg/profile.svg").default} />
      </IconContainer>
    </Container>
  );
};

export default Header;
