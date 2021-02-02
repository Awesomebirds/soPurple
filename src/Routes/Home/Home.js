import { Link } from "react-router-dom";
import styled from "styled-components";
import Banner from "./Banner";

const Container = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border: solid 2px #7626f3;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -1px;
`;

const Home = () => {
  return (
    <Container>
      <Banner />
      <ButtonContainer>
        <StyledButton to="/cocktail">칵테일 전체보기 {`>`}</StyledButton>
      </ButtonContainer>
      <ButtonContainer>
        <StyledButton to="/whisky">위스키 전체보기 {`>`}</StyledButton>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
