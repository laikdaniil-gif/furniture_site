import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { formatPrice } from '../utils/formatPrice';
import { getImageUrl } from '../utils/getImageUrl';

const ProductCard = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите в аккаунт, чтобы добавить товар в корзину');
      return;
    }
    addItem(product.id);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={getImageUrl(product.img)} alt={product.name} onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Фурнитура'; }} />
      </Link>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
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