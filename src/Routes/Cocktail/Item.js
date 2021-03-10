import { Link } from "react-router-dom";
import { storageService } from "myFirebase";
import { useEffect, useState } from "react";
import styled from "styled-components";

//styles
const ItemContainer = styled.span`
  width: 100%;
  min-width: 150px;
  margin-bottom: 10px;
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
  border-radius: 16px;
`;

const Detail = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  letter-spacing: -1px;
  font-size: 18px;
  font-weight: 600;
`;

const Price = styled.div`
  margin-top: 2px;
  color: #767676;
  font-size: 14px;
  letter-spacing: -1px;
`;

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
    <ItemContainer>
      <Link to={`/cocktail/${name}`}>
        <Detail>
          {image && <Img image={image} />}
          <Name>{name}</Name>
          <Price>{price} 원</Price>
        </Detail>
      </Link>
    </ItemContainer>
  );
};

export default Item;
