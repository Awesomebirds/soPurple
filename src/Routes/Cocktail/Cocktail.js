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

const Cocktail = () => {
  const [cocktails, setCocktails] = useState([]);

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
  }, []);

  return (
    <>
      <h1>Cocktail</h1>
      <div></div>
      <StyledButton to="/cocktail/new">new</StyledButton>
      {cocktails.map((cocktail) => (
        <Item cocktail={cocktail} />
      ))}
    </>
  );
};

export default Cocktail;
