import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EditHotelForm.module.css';

const EditHotelForm = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({
    nome: '',
    imagem: '',
    estrelas: 0,
    cidade: '',
    estado: '',
    preco: 0,
    descricao: '',
    servicos: ''
  });

  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hotelEncontrado = hoteis.find(h => h.id === parseInt(id));
    if (hotelEncontrado) {
      setHotel(hotelEncontrado);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');



    if (!hotel.nome || !hotel.imagem || !hotel.cidade || !hotel.estado || !hotel.descricao || !hotel.servicos) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (hotel.preco < 0) {
      setError('O preço da diária não pode ser negativo.');
      return;
    }

    const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
    const index = hoteis.findIndex(h => h.id === parseInt(id));

    if (index !== -1) {
      hoteis[index] = { ...hotel }; 
      localStorage.setItem('hoteis', JSON.stringify(hoteis));
      setSuccess('Hotel editado com sucesso!');
      navigate('/'); 
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Editar Hotel</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Nome do Hotel:</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={hotel.nome}
            onChange={handleChange}
            placeholder="Nome do Hotel"
            required
          />
        </div>
        <div className="form-group">
          <label>URL da Imagem:</label>
          <input
            type="text"
            name="imagem"
            className="form-control"
            value={hotel.imagem}
            onChange={handleChange}
            placeholder="URL da Imagem"
            required
          />
        </div>
        <div className="form-group">
          <label>Classificação (Estrelas):</label>
          <input
            type="number"
            name="estrelas"
            className="form-control"
            value={hotel.estrelas}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="Classificação"
            required
          />
        </div>
        <div className="form-group">
          <label>Cidade:</label>
          <input
            type="text"
            name="cidade"
            className="form-control"
            value={hotel.cidade}
            onChange={handleChange}
            placeholder="Cidade"
            required
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <input
            type="text"
            name="estado"
            className="form-control"
            value={hotel.estado}
            onChange={handleChange}
            placeholder="Estado"
            required
          />
        </div>
        <div className="form-group">
          <label>Preço da Diária:</label>
          <input
            type="number"
            name="preco"
            className="form-control"
            value={hotel.preco}
            onChange={handleChange}
            placeholder="Preço da Diária"
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            className="form-control"
            value={hotel.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            required
          />
        </div>
        <div className="form-group">
          <label>Serviços:</label>
          <textarea
            name="servicos"
            className="form-control"
            value={hotel.servicos}
            onChange={handleChange}
            placeholder="Serviços"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">Salvar</button>
      </form>
    </div>
  );
};

export default EditHotelForm;
