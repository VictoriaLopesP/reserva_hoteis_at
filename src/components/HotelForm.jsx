import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HotelForm.module.css';

const HotelForm = ({ onHotelAdded, hotelData }) => {
  const [nome, setNome] = useState(hotelData ? hotelData.nome : '');
  const [imagem, setImagem] = useState(hotelData ? hotelData.imagem : '');
  const [estrelas, setEstrelas] = useState(hotelData ? hotelData.estrelas : 1);
  const [cidade, setCidade] = useState(hotelData ? hotelData.cidade : '');
  const [estado, setEstado] = useState(hotelData ? hotelData.estado : '');
  const [preco, setPreco] = useState(hotelData ? hotelData.preco : '');
  const [descricao, setDescricao] = useState(hotelData ? hotelData.descricao : '');
  const [servicos, setServicos] = useState(hotelData ? hotelData.servicos : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome || !imagem || !cidade || !estado || !descricao || !servicos) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (preco < 0) {
      setError('O preço da diária não pode ser negativo.');
      return;
    }

    const novoHotel = {
      id: hotelData ? hotelData.id : new Date().getTime(),
      nome,
      imagem,
      estrelas,
      cidade,
      estado,
      preco,
      descricao,
      servicos,
      imagensAdicionais: []
    };

    const hoteisExistentes = JSON.parse(localStorage.getItem('hoteis')) || [];

    try {
      if (hotelData) {
        const index = hoteisExistentes.findIndex(hotel => hotel.id === hotelData.id);
        hoteisExistentes[index] = novoHotel;
      } else {
        hoteisExistentes.push(novoHotel);
      }

      localStorage.setItem('hoteis', JSON.stringify(hoteisExistentes));

      if (onHotelAdded) {
        onHotelAdded();
      }

      setSuccess(hotelData ? 'Hotel editado com sucesso!' : 'Hotel cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      setError('Erro ao salvar no local storage. Tente novamente! :(');
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="text-center mb-4">{hotelData ? 'Editar Hotel' : 'Cadastro de Hotel'}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Hotel</label>
          <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">URL da Imagem</label>
          <input type="url" className="form-control" id="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="estrelas" className="form-label">Classificação (Estrelas)</label>
          <select className="form-select" id="estrelas" value={estrelas} onChange={(e) => setEstrelas(Number(e.target.value))} required>
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>{star}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cidade" className="form-label">Cidade</label>
          <input type="text" className="form-control" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <input type="text" className="form-control" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço da Diária (R$)</label>
          <input type="number" className="form-control" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea className="form-control" id="descricao" rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="servicos" className="form-label">Serviços</label>
          <textarea className="form-control" id="servicos" rows="3" value={servicos} onChange={(e) => setServicos(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">{hotelData ? 'Salvar Alterações' : 'Cadastrar Hotel'}</button>
      </form>
    </div>
  );
};

export default HotelForm;
