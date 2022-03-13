import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NovoGenero = () => {
  const [name, setName] = useState("");
  // const [success, setSuccess] = useState(false);

  const onChange = (evt) => {
    setName(evt.target.value);
  };

  let navigate = useNavigate();

  const save = () => {
    axios
      .post("/api/genres", {
        name,
      })
      .then(navigate("/generos"));
  };

  // if (success) {
  //   let navigate = useNavigate;
  //   // return <Navigate to="/generos"  />;
  //   return navigate("/generos");
  // }

  // let navigate = useNavigate();

  return (
    <div className="container">
      <h1>Novo Gênero</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nome do Gênero"
            value={name}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={save}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default NovoGenero;
