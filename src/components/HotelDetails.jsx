import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import hotel1 from '../assets/hotel1.jpg'; 
import hotel2 from '../assets/hotel2.jpg'; 
import hotel3 from '../assets/hotel3.jpg'; 
import hotel4 from '../assets/hotel4.jpg'; 

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hotelEncontrado = hoteis.find(h => h.id === parseInt(id));
    setHotel(hotelEncontrado);
    console.log(hotelEncontrado);
  }, [id]);

  if (!hotel) {
    return <div>Carregando...</div>;
  }

  const galeriaImagens = [
    hotel1,
    hotel2,
    hotel3,
    hotel4
  ];

  return (
    <div className="container">
      <h1>{hotel.nome}</h1>
      <img src={hotel.imagem} alt={hotel.nome} className="img-fluid mainImage" />
      <p>Classificação: {hotel.estrelas} estrelas</p>
      <p>Cidade: {hotel.cidade}</p>
      <p>Estado: {hotel.estado}</p>
      <p>Preço: R$ {hotel.preco}</p>
      <p>Descrição: {hotel.descricao}</p>
      
      <h3>Imagens do local</h3>
      <div className="row">
        {galeriaImagens.map((img, index) => (
          <div className="col-6 col-md-3 mb-3" key={index}>
            <img src={img} alt={`Imagem ${index + 1}`} className="img-fluid thumbnail" />
          </div>
        ))}
      </div>

      <h3>Serviços e Itens Oferecidos</h3>
      <ul>
        <li>Wi-Fi gratuito</li>
        <li>Estacionamento gratuito</li>
        <li>Café da manhã incluso</li>
        <li>Piscina</li>
        <li>Academia</li>
      </ul>

      <Link to="/" className="btn btn-primary">Voltar</Link>
    </div>
  );
};

export default HotelDetails;
