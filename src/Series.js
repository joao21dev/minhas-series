import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/series").then((res) => {
      setData(res.data.data);
    }, []);
  });

  const deleteSerie = (id) => {
    axios.delete("/api/series/" + id).then((res) => {
      const filtro = data.filter((item) => item.id !== id);
      setData(filtro);
    });
  };

  const renderizaLinha = (record) => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteSerie(record.id)}
          >
            Excluir
          </button>
          <Link className="btn btn-info" to={"/series/" + record.id}>
            Sobre
          </Link>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Séries</h1>

        <div className="alert alert-warning role='alert">
          Você não possui séries adicionados!
        </div>
        <Link className="btn btn-success" to="/series/novo">
        Adicionar Nova Série
      </Link>
      </div>
    );
  }


  return (
    <div className="container">
      <h1>Séries</h1>

      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOME</th>
            <th scope="col">Acões</th>
          </tr>
        </thead>
        <tbody>{data.map(renderizaLinha)}</tbody>
      </table>
      <Link className="btn btn-success" to="/series/novo">
        Adicionar Nova Série
      </Link>
    </div>
  );
};

export default Series;
