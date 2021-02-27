import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";

//Styles
const CocktailContaier = styled.div`
  margin: 20px 16px;
`;

//태그
const TagContainer = styled.div``;

const SelectContainer = styled.div`
  margin-bottom: 20px;
`;

const TagTitleContainer = styled.div`
  margin-bottom: 15px;
`;

const TagTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -1px;
  border-bottom: 1px solid #d3d3d3;
  padding: 4px 0;
`;

const TagButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const Button = styled.div`
  padding: 6px 10px;
  margin-right: 6px;
  margin-bottom: 6px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? "#7626f3" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  font-size: 13px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

//칵테일 카드들
const ItemContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;

//관리자용 칵테일 새로 만들기
const CreateContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateNew = styled(Link)`
  padding: 4px;
  border: solid 1px #d3d3d3;
  border-radius: 4px;
  font-weight: 600;
`;

const Cocktail = ({ isManager, cocktails, spirits, tags, proofs }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [manager, setManager] = useState(false);

  //태그 선택
  const onTagSelect = (tagName) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    } else {
      const newArray = [...selectedTags];
      const index = newArray.indexOf(tagName);
      if (index > -1) {
        newArray.splice(index, 1);
      }
      setSelectedTags(newArray);
    }
  };

  //태그 필터
  const isFiltered = (cocktail) => {
    const { tags } = cocktail;
    let obj = {};
    tags.forEach((element, index) => {
      obj[element] = index;
    });
    const check = selectedTags.every((element) => obj[element] !== undefined);
    return check;
  };

  useEffect(() => {
    isManager && setManager(true);
  }, [isManager]);

  return (
    <CocktailContaier>
      <TagContainer>
        <SelectContainer>
          <TagTitleContainer>
            <TagTitle>도수 선택</TagTitle>
          </TagTitleContainer>
          <TagButtonContainer>
            {proofs.map((proof) => (
              <Button
                selected={selectedTags.includes(proof)}
                key={proof}
                onClick={() => onTagSelect(proof)}
              >
                {proof}
              </Button>
            ))}
          </TagButtonContainer>
        </SelectContainer>
        <SelectContainer>
          <TagTitleContainer>
            <TagTitle>베이스 선택</TagTitle>
          </TagTitleContainer>
          <TagButtonContainer>
            {spirits &&
              spirits.map((spirit) => (
                <Button
                  selected={selectedTags.includes(spirit.name)}
                  key={spirit.id}
                  onClick={() => onTagSelect(spirit.name)}
                >
                  {spirit.name}
                </Button>
              ))}
          </TagButtonContainer>
        </SelectContainer>
        <SelectContainer>
          <TagTitleContainer>
            <TagTitle>태그 선택</TagTitle>
          </TagTitleContainer>
          <TagButtonContainer>
            {tags &&
              tags.map((tag) => (
                <Button
                  selected={selectedTags.includes(tag.name)}
                  key={tag.id}
                  onClick={() => onTagSelect(tag.name)}
                >
                  {tag.name}
                </Button>
              ))}
          </TagButtonContainer>
        </SelectContainer>
      </TagContainer>
      {manager && (
        <CreateContainer>
          <CreateNew to="/cocktail/new">칵테일 추가</CreateNew>
        </CreateContainer>
      )}
      <ItemContainer>
        {cocktails.map(
          (cocktail) =>
            isFiltered(cocktail) && (
              <Item key={cocktail.id} cocktail={cocktail} />
            )
        )}
      </ItemContainer>
    </CocktailContaier>
  );
};

export default Cocktail;
