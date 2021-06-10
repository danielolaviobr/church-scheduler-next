import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

import api from "../../services/api";
import Link from "next/link";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

function AdminPage() {
  const [galeriaDate, setGaleriaDate] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [celulaCapacity, setCelulaCapacity] = useState("");
  const [galeriaCapacity, setGaleriaCapacity] = useState("");
  const [celulaCapacityServer, setCelulaCapacityServer] = useState("");
  const [galeriaCapacityServer, setGaleriaCapacityServer] = useState("");

  function handleSendDate() {
    const date = {
      date: `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`,
    };

    api.post("galeria_date", date).then((response) => {
      setGaleriaDate(response.data.date);
    });
  }

  function handleCapacityUpdate(event: string, capacity: string) {
    if (Number(capacity)) {
      api
        .post(`/max_capacity/${event}`, { capacity: capacity })
        .then((response) => {
          if (event === "celula") {
            setCelulaCapacityServer(response.data.max_capacity);
            setCelulaCapacity("");
          } else if (event === "galeria") {
            setGaleriaCapacityServer(response.data.max_capacity);
            setGaleriaCapacity("");
          }
        });
    }
  }

  useEffect(() => {
    api.get("/max_capacity/celula").then((response) => {
      setCelulaCapacityServer(response.data.max_capacity);
    });
    api.get("/max_capacity/galeria").then((response) => {
      setGaleriaCapacityServer(response.data.max_capacity);
    });
    api.get("/galeria_date").then((response) => {
      setGaleriaDate(response.data.date);
    });
  }, []);

  return (
    <div id="admin-page">
      <div className="content-wrapper">
        <header>Selecionar data do Galeria</header>
        <p>{galeriaDate}</p>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          isClearable
          placeholderText="dd/mm/aaaa"
          locale="pt-BR"
        />
        <button className="action-button" onClick={handleSendDate}>
          Agendar Galeria
        </button>
        <header>Selecionar lotação Célula</header>
        <p>{celulaCapacityServer}</p>
        <input
          type="text"
          value={celulaCapacity}
          onChange={(event) => setCelulaCapacity(event.target.value)}></input>
        <button
          className="action-button"
          onClick={() => handleCapacityUpdate("celula", celulaCapacity)}>
          Configurar
        </button>
        <header>Selecionar lotação Galeria</header>
        <p>{galeriaCapacityServer}</p>
        <input
          type="text"
          value={galeriaCapacity}
          onChange={(event) => setGaleriaCapacity(event.target.value)}></input>
        <button
          className="action-button"
          onClick={() => handleCapacityUpdate("galeria", galeriaCapacity)}>
          Configurar
        </button>
        <div className="events">
          <Link href="/admin/galeria">
            <a className="event-button">Galeria</a>
          </Link>
          <Link href="/admin/celula">
            <a className="event-button">Célula</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
