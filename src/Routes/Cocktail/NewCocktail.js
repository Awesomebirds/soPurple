import { firestoreService } from "myFirebase";
import { useState } from "react";

const NewCocktail = () => {
  const [name, setName] = useState("");

  const onCocktailSubmit = async (event) => {
    event.preventDefault();
    await firestoreService.collection("cocktail").add({
      name: name,
    });
  };

  const onNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  return (
    <form onSubmit={onCocktailSubmit}>
      <input type="text" onChange={onNameChange} value={name} />
      <input type="submit" value="등록" />
    </form>
  );
};

export default NewCocktail;
