import { Link } from "react-router-dom";
import { storageService } from "myFirebase";
import { useEffect, useState } from "react";

const Item = ({ cocktail }) => {
  const { id, name, price } = cocktail;
  const [image, setImage] = useState("");

  const loadImage = async (name) => {
    try {
      const iamgeRef = storageService.ref(`cocktail/${name}`);
      const imageUrl = await iamgeRef.getDownloadURL();
      return setImage(imageUrl);
    } catch {
      console.error((error) => error);
      return;
    }
  };

  useEffect(() => {
    loadImage(name);
  }, []);

  return (
    <div>
      <Link to={`/cocktail/${name}`}>
        <div>
          {image && <img src={image} width="100px" height="100px" />}
          <h3>{name}</h3>
          <h3>{price} 원</h3>
        </div>
      </Link>
    </div>
  );
};

export default Item;
