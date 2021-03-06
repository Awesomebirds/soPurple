import { firestoreService, storageService } from "myFirebase";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";

const StyledForm = styled.div`
  margin: 16px;
`;

const Title = styled.h3`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 17px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.selected ? "#7626f3" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
`;

const DeatilInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 1px solid #d3d3d3;
  border-radius: 7px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NewCocktail = ({ cocktails, tags, spirits, proofs }) => {
  //states
  const [cocktailId, setCocktailId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [ingredientValue, setIngredientValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [detail, setDetail] = useState("");
  const [imageFile, setImageFile] = useState(null);

  //history
  let history = useHistory();
  const location = useLocation();

  //칵테일 수정
  const loadCocktail = async () => {
    const { search } = location;
    if (search) {
      //query에 id값이 있을 때(수정일 때)
      const parsedSearch = qs.parse(search, { ignoreQueryPrefix: true });
      const id = parsedSearch.id;
      setCocktailId(id);

      const theCocktail = cocktails.filter((cocktail) => cocktail.id === id);
      if (theCocktail && theCocktail.length > 0) {
        const data = theCocktail[0];
        if (data) {
          setName(data.name);
          setPrice(data.price);
          setSelectedTags(data.tags);
          setIngredients(data.ingredients);
          setDetail(data.detail);

          //사진 받아오기
          const Ref = storageService.ref(`cocktail/${data.name}`);
          setImageFile(await Ref.getDownloadURL());
        }
      }
    }
  };

  //최종 서브밋
  const onCocktailSubmit = async (event) => {
    event.preventDefault();

    if (cocktailId) {
      //수정일때 서브밋
      const docRef = firestoreService.collection("cocktail").doc(cocktailId);
      await docRef.update({
        name,
        price,
        tags: selectedTags,
        ingredients,
        detail,
      });
    } else {
      //아닐때 서브밋
      await firestoreService.collection("cocktail").add({
        name,
        price,
        tags: selectedTags,
        ingredients,
        detail,
      });
    }
    //콜렉션에 도큐먼트 등록

    //스토리지에 사진 등록
    if (document.querySelector(".imageInput").value) {
      //이미지 있음
      const storageRef = storageService.ref();
      const ImageRef = storageRef.child(`cocktail/${name}`);
      await ImageRef.putString(imageFile, "data_url");
    }

    //서브밋 후 디테일창으로 푸시
    history.push(`/cocktail/${name}`);
  };

  //칵테일 이름
  const onNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  //칵테일 가격
  const onPriceChange = (event) => {
    event.preventDefault();
    setPrice(event.target.value);
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
    loadCocktail();
  }, [cocktails]);

  return (
    <StyledForm>
      <Title>칵테일 이름</Title>
      <input
        type="text"
        onChange={onNameChange}
        value={name}
        placeholder="이름"
      />
      <div>
        <Title>가격</Title>
        <input
          type="text"
          onChange={onPriceChange}
          value={price}
          placeholder={"가격"}
        />
      </div>
      <div>
        <Title>도수 선택</Title>
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
        <Title>베이스 선택</Title>
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
        <Title>태그 선택</Title>
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
        <Title>재료 추가</Title>
        <input
          type="text"
          onChange={onIngredientChange}
          value={ingredientValue}
        />
        <button onClick={onIngredientSubmit}>추가</button>
        <div>
          {ingredients.map((ingredient) => (
            <div>
              <span key={ingredient}>{ingredient}</span>
              <span onClick={() => onIngredientDelete(ingredient)}>❌</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Title>설명</Title>
        <DeatilInput onChange={onDetailChange} value={detail} />
      </div>
      <div>
        <input
          className="imageInput"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
        {imageFile && <img src={imageFile} width="50px" height="50px" />}
      </div>
      <div>
        <button onClick={onCocktailSubmit}>등록</button>
      </div>
    </StyledForm>
  );
};

export default NewCocktail;
