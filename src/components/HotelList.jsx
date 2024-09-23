import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/HotelList.module.css';
import hotelA from '../assets/hotelA.jpg';
import hotelB from '../assets/hotelB.jpg';
import hotelC from '../assets/hotelC.jpg';

const HotelList = ({ onHotelAdded }) => {
  const [hoteis, setHoteis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriterion, setSortCriterion] = useState('preco');
  const [favoritos, setFavoritos] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    
    if (hoteisSalvos.length === 0) {
      const dadosExemplo = [
        {
          id: 1,
          nome: 'Hotel Maravilha',
          imagem: hotelA,
          estrelas: 5,
          cidade: 'São Paulo',
          estado: 'SP',
          preco: 200,
          descricao: 'Localizado no coração de São Paulo, o Hotel Maravilha oferece uma experiência de luxo com acomodações elegantes e serviço excepcional. Os hóspedes podem desfrutar de um spa completo, restaurante gourmet e acesso fácil a atrações locais, tornando-o perfeito para viagens de negócios ou lazer.',
        },
        {
          id: 2,
          nome: 'Hotel Tropical Paradise',
          imagem: hotelB,
          estrelas: 4,
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          preco: 150,
          descricao: 'O Hotel Tropical Paradise é um refúgio à beira-mar no Rio de Janeiro, ideal para quem busca relaxamento e diversão. Com uma piscina infinita com vista para o mar, restaurante de cozinha internacional e quartos confortáveis, este hotel é o lugar perfeito para uma escapada romântica ou férias em família.'
        },
        {
          id: 3,
          nome: 'Aconchego na Lagoa',
          imagem: hotelC,
          estrelas: 3,
          cidade: 'Belo Horizonte',
          estado: 'MG',
          preco: 100,
          descricao: 'Situado em Belo Horizonte, o hotel Aconchego na Lagoa combina conforto e modernidade. Oferece uma variedade de serviços, incluindo academia, Wi-Fi gratuito e café da manhã incluso. Perto de importantes centros comerciais e culturais, é a escolha ideal para quem deseja explorar a cidade enquanto desfruta de um ambiente acolhedor.'
        },
      ];
      localStorage.setItem('hoteis', JSON.stringify(dadosExemplo));
      setHoteis(dadosExemplo);
    } else {
      setHoteis(hoteisSalvos);
    }

    const favoritosSalvos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosSalvos);

    document.body.className = isDarkTheme ? 'dark' : 'light';
  }, [onHotelAdded, isDarkTheme]);

  const handleDelete = (id) => {
    const hoteisAtualizados = hoteis.filter(hotel => hotel.id !== id);
    setHoteis(hoteisAtualizados);
    localStorage.setItem('hoteis', JSON.stringify(hoteisAtualizados));
  };

  const toggleFavorito = (hotel) => {
    const isFavorito = favoritos.some(f => f.id === hotel.id);
    const novosFavoritos = isFavorito
      ? favoritos.filter(f => f.id !== hotel.id)
      : [...favoritos, hotel];

    setFavoritos(novosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme ? 'dark' : 'light';
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const filteredHoteis = hoteis.filter(hotel =>
    hotel.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedHoteis = filteredHoteis.sort((a, b) => {
    if (sortCriterion === 'preco') {
      return a.preco - b.preco;
    } else if (sortCriterion === 'classificacao') {
      return b.estrelas - a.estrelas; 
    }
    return 0;
  });

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="text-center mb-4">Reserve seu hotel aqui</h1>

      <div className="mb-3">
        <label htmlFor="sort" className="form-label">Ordenar por:</label>
        <select
          id="sort"
          className="form-select"
          value={sortCriterion}
          onChange={(e) => setSortCriterion(e.target.value)}
        >
          <option value="preco">Preço da diária</option>
          <option value="classificacao">Classificação</option>
        </select>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Pesquisar por nome do hotel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mb-3">
        <Link to="/cadastro" className="btn btn-primary">Cadastrar Novo Hotel</Link>
        <Link to="/favoritos" className="btn btn-outline-secondary ms-2">Meus Favoritos</Link>
        <button className="btn btn-outline-warning ms-2" onClick={toggleTheme}>
          <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
        </button>
      </div>
      <div className="row">
        {sortedHoteis.map((hotel) => (
          <div className="col-md-4" key={hotel.id}>
            <div className="card mb-4">
              <div className="position-relative">
                <img src={hotel.imagem} className="card-img-top" alt={hotel.nome} />
                <button
                  className={`btn position-absolute top-0 end-0 m-2 ${favoritos.some(f => f.id === hotel.id) ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={() => toggleFavorito(hotel)}
                  style={{ zIndex: 1 }} 
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{hotel.nome}</h5>
                <p className="card-text">Classificação: {hotel.estrelas} estrelas</p>
                <p className="card-text">Cidade: {hotel.cidade}</p>
                <p className="card-text">Estado: {hotel.estado}</p>
                <p className="card-text">Preço: R$ {hotel.preco}</p>
                <Link to={`/hotel/${hotel.id}`} className="btn btn-info">Ver Detalhes</Link>
                <Link to={`/editar/${hotel.id}`} className="btn btn-secondary ms-2">Editar</Link>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(hotel.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
