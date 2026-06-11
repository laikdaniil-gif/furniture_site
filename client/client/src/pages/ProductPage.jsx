import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/formatPrice';
import { getImageUrl } from '../utils/getImageUrl';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        alert('Ошибка загрузки товара');
        navigate('/catalog');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите в аккаунт, чтобы добавить товар в корзину');
      return;
    }
    try {
      await addItem(product.id);
      alert('Товар добавлен в корзину');
    } catch (err) {
      alert('Ошибка добавления в корзину');
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div className="text-center">Товар не найден</div>;

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <img src={getImageUrl(product.img)} alt={product.name} onError={(e) => (e.target.src = 'https://placehold.co/600x400?text=Фурнитура')} />
      </div>
      <div className="product-detail__info">
        <h1>{product.name}</h1>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="size">Размер: {product.size || 'стандарт'}</p>
        <p className="quantity">В наличии: {product.quantity} шт.</p>
        {product.info && product.info.length > 0 && (
          <div className="characteristics">
            <h3>Характеристики</h3>
            <ul>
              {product.info.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={handleAddToCart} className="btn btn-primary">Добавить в корзину</button>
      </div>
    </div>
  );
};

export default ProductPage;