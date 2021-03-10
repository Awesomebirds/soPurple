import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  padding: 30px 20px;
  background-color: #eee;
  color: #999;
`;

const StyledP = styled.p`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const Footer = () => {
  return (
    <Container>
      <StyledP>ⓒ 쏘퍼플 All Right Reserved.</StyledP>
      <StyledP>광주광역시 북구 호동로 43번길 64 2층</StyledP>
      <StyledP>매일 18:00 - 02:00 월요일 휴무</StyledP>
    </Container>
  );
};

export default Footer;
