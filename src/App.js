import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Generos from "./Generos";
import Home from "./Home";
import NovoGenero from "./NovoGenero";
import EditarGenero from "./EditarGenero";
import Series from "./Series";
import NovaSerie from "./NovaSerie";
import InfoSerie from "./InfoSerie";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generos/:id" element={<EditarGenero />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/generos/novo" element={<NovoGenero />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/novo" element={<NovaSerie />} />
        <Route path="/series/:id" element={<InfoSerie />} />
      </Routes>
    </Router>
  );
}

export default App;
