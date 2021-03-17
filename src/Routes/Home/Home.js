import { Link } from "react-router-dom";
import Item from "Routes/Cocktail/Item";
import styled from "styled-components";
import Banner from "./Banner";

//Styles
const Container = styled.div`
  margin: 0 16px;
`;

//태그
const TagContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 4px;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
`;

const TagButton = styled.span`
  margin: 5px;
  padding-bottom: 2px;
  padding-left: 1px;
  padding-right: 1px;
  font-weight: 700;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

//칵테일
const CocktailContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  > span {
    margin: 0 6px;
  }
`;

//링크 버튼
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

const Home = ({ cocktails, tags }) => {
  return (
    <>
      <Banner />
      <Container>
        <TagContainer>
          <TagButton>#클래식</TagButton>
        </TagContainer>
        <CocktailContainer>
          {cocktails &&
            cocktails.map(
              (cocktail) =>
                cocktail.tags.includes("클래식") && (
                  <Item key={cocktail.id} cocktail={cocktail} />
                )
            )}
        </CocktailContainer>
        <TagContainer>
          <TagButton>#시그니처</TagButton>
        </TagContainer>
        <CocktailContainer>
          {cocktails &&
            cocktails.map(
              (cocktail) =>
                cocktail.tags.includes("시그니처") && (
                  <Item key={cocktail.id} cocktail={cocktail} />
                )
            )}
        </CocktailContainer>
        <ButtonContainer>
          <StyledButton to="/cocktail">칵테일 전체보기 {`>`}</StyledButton>
        </ButtonContainer>
        {/* <ButtonContainer>
          <StyledButton to="/whisky">위스키 전체보기 {`>`}</StyledButton>
        </ButtonContainer> */}
      </Container>
    </>
  );
};

export default Home;
