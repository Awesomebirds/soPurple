import { firestoreService, storageService } from "myFirebase";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Detail = ({ uid }) => {
  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");
  const [isManager, setIsManager] = useState(false);

  const checkManager = () => {
    if (uid) {
      if (uid === "lST7WLz2WDSCdctfFrZ2gMta9m93") {
        setIsManager(true);
      } else {
        setIsManager(false);
      }
    }
  };
  const onDeleteClick = () => {
    const deleteCocktail = async () => {
      //칵테일 데이터삭제
      const docRef = firestoreService.collection("cocktail").doc(data.id);
      await docRef.delete();

      //칵테일 사진 삭제
      const imgRef = storageService.ref(`cocktail/${data.name}`);
      await imgRef.delete();

      history.push("/cocktail")
    };

    window.confirm(
      `정말 ${data.name} 삭제하나요?? \n *되돌릴 수 없습니다!!!*`
    ) && deleteCocktail();
  };

  const onEditClick = () => {
    history.push(`new?id=${data.id}`)
  }

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
      ...data
    }
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
    //관리자 확인
    checkManager();
  }, []);

  return data ? (
    <>
      <h1>{data.name}</h1>
      <img src={image} width="100px" height="100px" />
      <div>
        {data.ingredients &&
          data.ingredients.map((ingredient) => (
            <span key={ingredient}>{ingredient}</span>
          ))}
      </div>
      <div>
        {data.tags && data.tags.map((tag) => <span key={tag}>#{tag}</span>)}
      </div>
      <h2>{data.detail}</h2>
      {isManager && <div>
        <button onClick={onDeleteClick}>❌</button>
        <button onClick={onEditClick}>🖋</button> 
        </div>}
    </>
  ) : (
    ""
  );
};

export default Detail;
