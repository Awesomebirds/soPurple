import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 50px;
  box-shadow: 0 1px 6px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;

const HomeLogo = styled(Link)`
  font-size: 18px;
  letter-spacing: 3px;
  font-weight: 600;
  padding: 10px;
  color: #7626f3;
`;

const Header = ({ uid }) => {
  return (
    <Container>
      <HomeLogo to="/">SO PURPLE</HomeLogo>
    </Container>
  );
};

export default Header;
