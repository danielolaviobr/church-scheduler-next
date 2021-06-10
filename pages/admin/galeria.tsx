import React, { useCallback, useEffect, useMemo, useState } from "react";


import api from "../../services/api";

interface Person {
  id: number;
  name: string;
  scheduled_to: string;
}

function AdminGaleriaPage() {
  const [users, setUsers] = useState<Person[]>([]);
  const [nextEvent, setNextEvent] = useState<string>("");

  const getPersons = useCallback(async () => {
    const re = /\//gi;
    const response = await api.get(`galeria/${nextEvent.replace(re, "-")}`);
    setUsers(response.data);
  }, [nextEvent]);

  const deletePerson = useCallback(
    async (id: number) => {
      await api.delete(`galeria/${id}`);
      getPersons();
    },
    [getPersons]
  );

  const scheduledPersons = useMemo(() => {
    return users.map((person) => (
      <div key={person.id} className="persons">
        <li>{person.name}</li>
        <img
          className="delete-icon"
          src={"/images/delete.svg"}
          alt="Deletar"
          onClick={() => deletePerson(person.id)}
        />
      </div>
    ));
  }, [users, deletePerson]);

  const getDate = useCallback(async () => {
    const response = await api.get("galeria_date");
    setNextEvent(response.data.date);
  }, []);

  useEffect(() => {
    getDate();
    if (nextEvent !== "") {
      getPersons();
    }
  }, [getDate, getPersons, nextEvent]);

  return (
    <div id="admin-galeria-page">
      {/* <Link to="/" className="logo">
        <img src={smallLogo} alt="Início" height={150} />
      </Link> */}
      <div className="content-wrapper">
        <header>Cadastrados {nextEvent}</header>
        <div className="srollable-list">
          <ul>{scheduledPersons}</ul>
        </div>
      </div>
    </div>
  );
}

export default AdminGaleriaPage;
