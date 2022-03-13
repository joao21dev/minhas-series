import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "reactstrap";

const InfoSerie = () => {
  const [form, setForm] = useState({});
  // const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("EDIT");

  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");

  const [data, setData] = useState({});
  
  let { id } = useParams();

  //pegar o nome da série
  useEffect(() => {
    axios.get(`/api/series/${id}`).then((res) => {
      setData(res.data);
      setForm(res.data);
    });
  }, [`${id}`]);

  //pegar o nome de o gênero
  useEffect(() => {
    axios.get("/api/genres").then((res) => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find((value) => data.genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });
  }, [data]);

  //custom header
  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const onChange = (field) => (event) => {
    setForm({
      ...form,
      [field]: event.target.value,
    });
  };

  const seleciona = (value) => () => {
    setForm({
      ...form,
      status: value,
    });
  };

  let navigate = useNavigate();

  const save = () => {
    axios.put(`/api/series/${id}`, {
      ...form,
      genre_id: genreId,
    });

    // navigate("/series");
  };

  // if (success) {
  //   let navigate = useNavigate;
  //   // return <Navigate to="/generos"  />;
  //   return navigate("/generos");
  // }

  // let navigate = useNavigate();

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="h-100 container ">
            <div className="row h-100 align-items-center ">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  alt={data.name}
                  src={data.poster}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-light">{data.name}</h1>
                <div className="lead text-white">
                  <Badge color="success">Assistido</Badge>
                  <Badge color="warning">Para Assistir</Badge>
                  Gênero:{data.genre_id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div>
        <button className="btn btn-dark m-1" onClick={() => setMode("EDIT")}>
          Editar
        </button>
      </div>

      {mode === "EDIT" && (
        <div className="container">
          <h1>Sobre a Série</h1>
          <button className="btn btn-dark" onClick={() => setMode("INFO")}>
            Cancelar Edićão
          </button>
          <pre>{JSON.stringify(form)}</pre>
          <form>
            <div className="form-group">
              <label htmlFor="name"></label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nome da Série"
                value={form.name}
                onChange={onChange("name")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name"></label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Escreva Um Comentário"
                value={form.comments}
                onChange={onChange("comments")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Gêneros</label>
              <select className="form-control" onChange={onChange("genre_id")}>
                {genres.map((genre) => (
                  <option
                    select={genre.id === form.genre}
                    key={genre.id}
                    value={genre.id}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="assistido"
                value="ASSISTIDO"
                // checked
                onClick={seleciona("ASSISTIDO")}
              />
              <label className="form-check-label" htmlFor="assistido">
                Assistido
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="paraAssistir"
                value="PARA_ASSISTIR"
                onClick={seleciona("PARA_ASSISTIR")}
              />
              <label className="form-check-label" htmlFor="paraAssistir">
                Para Assistir
              </label>
            </div>

            <button type="submit" className="btn btn-primary" onClick={save}>
              Salvar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
