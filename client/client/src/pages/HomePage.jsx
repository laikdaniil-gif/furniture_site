import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="hero">
        <h1 className="hero__title">Надёжная фурнитура <span className="hero__accent">для вашей мебели</span></h1>
        <p className="hero__subtitle">Петли, ручки, замки — всё для рукоделия и мелкого ремонта. Мелким оптом и в розницу.</p>
        <Link to="/catalog" className="btn btn-primary">Перейти в каталог →</Link>
      </div>
      <div className="features">
        <div className="feature-card"><i className="fas fa-cubes"></i><h3>Более 100 позиций</h3><p>Разнообразный ассортимент на любой вкус</p></div>
        <div className="feature-card"><i className="fas fa-truck-fast"></i><h3>Доставка за несколько дней</h3><p>По всей России</p></div>
        <div className="feature-card"><i className="fas fa-award"></i><h3>Гарантия качества</h3><p>Сертифицированная продукция</p></div>
      </div>
    </>
  );
};

export default HomePage;