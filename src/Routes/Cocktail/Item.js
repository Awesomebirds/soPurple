import { Link } from "react-router-dom";

const Item = ({ cocktail }) => {
  const { id, name, price, image } = cocktail;

  return (
    <div>
      <Link to={`/cocktail/${name}`}>
        <div>
          <h3>{name}</h3>
          <h3>{price} 원</h3>
          <img src={image} width="100px" height="100px" />
        </div>
      </Link>
    </div>
  );
};

export default Item;
