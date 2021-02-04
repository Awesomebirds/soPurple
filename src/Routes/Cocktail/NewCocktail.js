import { firestoreService, storageService } from "myFirebase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => (props.selected ? "#7626f3" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
`;

const NewCocktail = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [spirits, setSpirits] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [detail, setDetail] = useState("");
  const [imageFile, setImageFile] = useState(null);

  //최종 서브밋
  const onCocktailSubmit = async (event) => {
    event.preventDefault();
    await firestoreService.collection("cocktail").add({
      name,
      tags: selectedTags,
      ingredients,
      detail,
    });
    const storageRef = storageService.ref();
    const ImageRef = storageRef.child(`cocktail/${name}`);
    await ImageRef.putString(imageFile, "data_url");
  };

  //칵테일 이름
  const onNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
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

  //재료 추가폼
  const onIngredientChange = (event) => {
    event.preventDefault();
    setIngredientValue(event.target.value);
  };

  const onIngredientSubmit = (event) => {
    event.preventDefault();
    setIngredients([...ingredients, ingredientValue]);
    setIngredientValue("");
    console.log(ingredients);
  };

  const onIngredientDelete = (ingredient) => {
    const newArray = [...ingredients];
    const index = ingredients.indexOf(ingredient);
    newArray.splice(index, 1);
    setIngredients(newArray);
  };

  //설명칸
  const onDetailChange = (event) => {
    event.preventDefault();
    setDetail(event.target.value);
  };

  //load data
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

  //사진
  const onImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setImageFile(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    loadTags();
    loadSpirits();
  }, []);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <h3>칵테일 이름</h3>
      <input
        type="text"
        onChange={onNameChange}
        value={name}
        placeholder="이름"
      />
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
      <div>
        <h3>재료 추가</h3>
        <input
          type="text"
          onChange={onIngredientChange}
          value={ingredientValue}
        />
        <button onClick={onIngredientSubmit}>추가</button>
        <div>
          <h4>재료</h4>
          {ingredients.map((ingredient) => (
            <div>
              <span key={ingredient}>{ingredient}</span>
              <span onClick={() => onIngredientDelete(ingredient)}>❌</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>설명</h3>
        <input type="text" onChange={onDetailChange} value={detail} />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={onImageChange} />
        {imageFile && <img src={imageFile} width="50px" height="50px" />}
      </div>
      <div>
        <button onClick={onCocktailSubmit}>등록</button>
      </div>
    </form>
  );
};

export default NewCocktail;
