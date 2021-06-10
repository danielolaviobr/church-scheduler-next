import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Alert } from "@material-ui/lab";

import api from "../services/api";

function CelulaPage() {
  interface alertDataType {
    type: "success" | "warning" | "info" | "error" | undefined;
    message: string | undefined;
    visible: boolean;
  }

  const [fullName, setFullName] = useState<string>("");
  const [nextEvent, setNextEvent] = useState<string>();
  const [alertData, setAlertData] = useState<alertDataType>({
    type: undefined,
    message: undefined,
    visible: false,
  });
  const [displayAlert, setDisplayAlert] = useState<any>(undefined);

  function submitForm() {
    api
      .post("celula", {
        name: fullName,
        date: nextEvent,
      })
      .then((response) => {
        response &&
          setAlertData({
            type: "success",
            message: "Inscrição realizada com sucesso",
            visible: true,
          });
      })
      .catch((error) => {
        setAlertData({
          type: "error",
          message:
            error.response.status === 400
              ? "Ocorreu um erro ao realizar a inscrição"
              : "Lotação máxima alcançada",
          visible: true,
        });
      });

    setFullName("");
  }

  async function getDate() {
    const response = await api.get("/date/celula");
    setNextEvent(response.data.date);
  }

  useEffect(() => {
    getDate();
    // setDisplayAlert(
    //   alertData.visible ? (
    //     <Alert severity={alertData.type}>{alertData.message}</Alert>
    //   ) : undefined
    // );
  }, [alertData]);

  return (
    <div id="celula-page">
      {/* <Link to="/" className="logo">
        <img src={smallLogo} alt="Início" height={150} />
      </Link> */}
      <main>
        {/* {displayAlert} */}
        <div className="header">
          <h2>Célula de quinta-feira</h2>
          <h3>{nextEvent}</h3>
        </div>
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Nome Completo"
        />

        <Link href="/celula">
          <a onClick={submitForm} className="confirm">
            Inscrever-se
          </a>
        </Link>
        <Link href="/">
          <a className="cancel">Voltar</a>
        </Link>
      </main>
    </div>
  );
}

export default CelulaPage;
