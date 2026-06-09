import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { formatPrice } from '../utils/formatPrice';

const ProductCard = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product.id);
  };

  const firstDescription = product.info && product.info.length > 0 
    ? product.info[0].description 
    : null;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${product.img}`} alt={product.name} />
      </Link>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        {firstDescription && (
          <p className="product-card__description">{firstDescription.substring(0, 60)}...</p>
        )}
        <p className="product-card__size">{product.size || 'стандарт'}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <button onClick={handleAddToCart} className="btn-cart">В корзину</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;