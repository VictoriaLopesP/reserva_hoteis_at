import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Favoritos.module.css';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosSalvos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosSalvos);
  }, []);

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="text-center mb-4">Hotéis Favoritos</h1>
      <div className="row">
        {favoritos.length > 0 ? (
          favoritos.map((hotel) => (
            <div className="col-md-4" key={hotel.id}>
              <div className="card mb-4">
                <img src={hotel.imagem} className="card-img-top" alt={hotel.nome} />
                <div className="card-body">
                  <h5 className="card-title">{hotel.nome}</h5>
                  <p className="card-text">Classificação: {hotel.estrelas} estrelas</p>
                  <Link to={`/hotel/${hotel.id}`} className="btn btn-info">Ver Detalhes</Link>
                  <Link to={`/editar/${hotel.id}`} className="btn btn-secondary ms-2">Editar</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum hotel favorito encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Favoritos;
