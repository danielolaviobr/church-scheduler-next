import React from "react";
import Link from "next/link";

function LandingPage() {
  return (
    <div id="landing-page">
      <div className="content-wrapper">
        <main>
          <h1>Jovens Presbiteriana do Recreio</h1>
          <p>Agende sua visita</p>
        </main>
        <footer>
          <Link href="/celula">
            <a className="redirect-button">Célula</a>
          </Link>
          <Link href="/galeria">
            <a className="redirect-button">Galeria</a>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
