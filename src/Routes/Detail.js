import { firestoreService, storageService } from "myFirebase";
import { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import styled from "styled-components";

//이미지
const Container = styled.div`
  min-height: 1000px;
  padding: 20px;
`;

const Img = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  &::after {
    content: "";
    display: block;
    padding-bottom: 120%;
  }
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`;

//디테일
const DetailContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//제목
const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-top: 8px;
  margin-bottom: 11px;
`;

//재료
const IngredientContainer = styled.div`
  margin-bottom: 1px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #777;
`;

const Ingredient = styled.span`
  margin: 0 2px;
  letter-spacing: -2px;
`;

//태그
const TagContainer = styled.div``;

const Tag = styled.span`
  color: #7626f3;
  font-size: 14px;
  letter-spacing: -1px;
  margin: 0 2px;
`;

const Price = styled.div`
  font-size: 22px;
`;

//설명
const Text = styled.p`
  margin-bottom: 20px;
  width: 100%;
  line-height: 1.5;
  white-space: pre-line;
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
  width: 100%;
  height: 50px;
  border: solid 1px #ccc;
  color: #999;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -1px;
`;

const Detail = ({ isManager }) => {
  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");

  const onDeleteClick = () => {
    const deleteCocktail = async () => {
      //칵테일 데이터삭제
      const docRef = firestoreService.collection("cocktail").doc(data.id);
      await docRef.delete();

      //칵테일 사진 삭제
      const imgRef = storageService.ref(`cocktail/${data.name}`);
      await imgRef.delete();

      history.push("/cocktail");
    };

    window.confirm(
      `정말 ${data.name} 삭제하나요?? \n *되돌릴 수 없습니다!!!*`
    ) && deleteCocktail();
  };

  const onEditClick = () => {
    history.push(`new?id=${data.id}`);
  };

  const cocktailName = location.pathname.split("/")[2];
  const loadCocktail = async () => {
    //칵테일 정보 로드
    const cocktailRef = firestoreService.collection("cocktail");
    const query = cocktailRef.where("name", "==", cocktailName);
    const doc = await query.get();
    const docRef = doc.docs;
    const data = docRef[0].data();
    const dataWithId = {
      id: docRef[0].id,
      ...data,
    };
    setData(dataWithId);

    //칵테일 사진 로드
    try {
      const ImgRef = storageService.ref(`/cocktail/${cocktailName}`);
      const ImgUrl = await ImgRef.getDownloadURL();
      setImage(ImgUrl);
    } catch {
      console.error((error) => error);
    }
  };

  useEffect(() => {
    //칵테일 불러오기
    loadCocktail();
  }, []);

  return data ? (
    <Container>
      {image ? <Img image={image} /> : <Img />}
      <DetailContainer>
        <TagContainer>
          {data.tags && data.tags.map((tag) => <Tag key={tag}>#{tag}</Tag>)}
        </TagContainer>
        <Title>{data.name}</Title>
        <Price>{data.price} 원</Price>
        <IngredientContainer>
          재료:{" "}
          {data.ingredients &&
            data.ingredients.map((ingredient) => (
              <Ingredient key={ingredient}>{ingredient}</Ingredient>
            ))}
        </IngredientContainer>
        <Text>{data.detail}</Text>
        {isManager && (
          <div>
            <button onClick={onDeleteClick}>❌</button>
            <button onClick={onEditClick}>🖋</button>
          </div>
        )}
      </DetailContainer>
      <ButtonContainer>
        <StyledButton to="/cocktail">뒤로 가기</StyledButton>
      </ButtonContainer>
    </Container>
  ) : (
    ""
  );
};

export default Detail;
