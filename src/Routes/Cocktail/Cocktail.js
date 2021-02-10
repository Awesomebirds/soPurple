import { firestoreService } from "myFirebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";

const StyledButton = styled(Link)`
  border: solid 1px gray;
  color: white;
  background-color: gray;
`;

const Button = styled.button`
  background-color: ${(props) => (props.selected ? "#7626f3" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
`;

const Cocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  const [spirits, setSpirits] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  //스피릿, 태그 로드
  const proofs = ["약함", "중간", "강함"];

  const loadTags = async () => {
    const tagsRef = firestoreService.collection("tag");
    const docs = (await tagsRef.get()).docs;
    const docsArray = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTags(docsArray);
  };

  const loadSpirits = async () => {
    const spiritsRef = firestoreService.collection("spirit");
    const docs = (await spiritsRef.get()).docs;
    const docsArray = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSpirits(docsArray);
  };

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
    //칵테일 로드
    firestoreService.collection("cocktail").onSnapshot((snapshot) => {
      const cocktailArray = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCocktails(cocktailArray);
    });
    //스피릿 태그 로드
    loadSpirits();
    loadTags();
  }, []);

  return (
    <>
      <h1>Cocktail</h1>
      <div>
        <div>
          <h3>도수 선택</h3>
          {proofs.map((proof) => (
            <Button
              selected={selectedTags.includes(proof)}
              key={proof}
              onClick={() => onTagSelect(proof)}
            >
              {proof}
            </Button>
          ))}
        </div>
        <div>
          <h3>베이스 선택</h3>
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
        </div>
        <div>
          <h3>태그 선택</h3>
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
        </div>
        <div></div>
      </div>
      <StyledButton to="/cocktail/new">new</StyledButton>
      {cocktails.map(
        (cocktail) =>
          isFiltered(cocktail) && <Item key={cocktail.id} cocktail={cocktail} />
      )}
    </>
  );
};

export default Cocktail;
