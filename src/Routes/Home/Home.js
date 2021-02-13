import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item from "Routes/Cocktail/Item";
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

const TagButton = styled.button`
  padding: 5px;
  font-weight: ${(props) => (props.isSelected ? "700" : "500")};
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
    <Container>
      <Banner />
      <div>
        <div>
          {tags &&
            tags.map((tag) => (
              <TagButton
                onClick={() => onTagClick(tag.name)}
                isSelected={tag.name === seletedTag}
              >
                {tag.name}
              </TagButton>
            ))}
        </div>
        <div>
          {cocktails &&
            cocktails.map(
              (cocktail) =>
                cocktail.tags.includes(seletedTag) && (
                  <Item key={cocktail.id} cocktail={cocktail} />
                )
            )}
        </div>
      </div>
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
