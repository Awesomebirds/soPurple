import { Link } from "react-router-dom";

const Item = ({ cocktail }) => {
  const { name, price } = cocktail;

  return (
    <div>
      <Link to={`/cocktail/${name}`}>
        <div>
          <h3>{name}</h3>
          <h3>{price} 원</h3>
        </div>
      </Link>
    </div>
  );
};

export default Item;
