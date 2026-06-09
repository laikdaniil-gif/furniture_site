import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="hero">
        <h1 className="hero__title">Надёжная фурнитура <span className="hero__accent">для вашей мебели</span></h1>
        <p className="hero__subtitle">Петли, направляющие, ручки, замки — всё для производства и ремонта. Оптом и в розницу.</p>
        <Link to="/catalog" className="btn btn-primary">Перейти в каталог →</Link>
      </div>
      <div className="features">
        <div className="feature-card"><i className="fas fa-cubes"></i><h3>Более 5000 позиций</h3><p>Склад в Москве и СПб</p></div>
        <div className="feature-card"><i className="fas fa-truck-fast"></i><h3>Доставка за 1 день</h3><p>По всей России</p></div>
        <div className="feature-card"><i className="fas fa-award"></i><h3>Гарантия качества</h3><p>Сертифицированная продукция</p></div>
      </div>
    </>
  );
};

export default HomePage;