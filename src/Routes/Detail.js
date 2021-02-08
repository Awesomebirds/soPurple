import { firestoreService, storageService } from "myFirebase";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");

  const cocktailName = location.pathname.split("/")[2];
  const loadCocktail = async () => {
    //칵테일 정보 로드
    const cocktailRef = firestoreService.collection("cocktail");
    const query = cocktailRef.where("name", "==", cocktailName);
    const doc = await query.get();
    const docRef = doc.docs;
    const data = docRef[0].data();
    setData(data);

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
    loadCocktail();
  }, []);

  return data ? (
    <>
      <h1>{data.name}</h1>
      <img src={image} width="100px" height="100px" />
      <div>
        {data.ingredients &&
          data.ingredients.map((ingredient) => <span>{ingredient}</span>)}
      </div>
      <div>{data.tags && data.tags.map((tag) => <span>#{tag}</span>)}</div>
      <h2>{data.detail}</h2>
    </>
  ) : (
    ""
  );
};

export default Detail;
