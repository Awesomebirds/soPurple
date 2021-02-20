import { useEffect, useState } from "react";
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
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
`;

const TagButton = styled.span`
  margin: 5px;
  padding-bottom: 2px;
  padding-left: 1px;
  padding-right: 1px;
  border-bottom: ${(props) => (props.isSelected ? "2px solid" : "none")};
  font-weight: ${(props) => (props.isSelected ? "700" : "500")};
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
  const [seletedTag, setSelectedTag] = useState("");

  const onTagClick = (tag) => {
    setSelectedTag(tag);
  };
  useEffect(() => {
    tags && tags.length > 0 && setSelectedTag(tags[0].name);
  }, [tags]);

  return (
    <>
      <Banner />
      <Container>
        <TagContainer>
          {tags &&
            tags.map(
              (tag, index) =>
                index < 3 && (
                  <TagButton
                    onClick={() => onTagClick(tag.name)}
                    isSelected={tag.name === seletedTag}
                  >
                    #{tag.name}
                  </TagButton>
                )
            )}
        </TagContainer>
        <CocktailContainer>
          {cocktails &&
            cocktails.map(
              (cocktail) =>
                cocktail.tags.includes(seletedTag) && (
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
