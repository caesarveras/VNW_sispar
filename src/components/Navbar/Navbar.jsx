import { useNavigate } from "react-router";
import { useState } from "react";
import styles from "./Navbar.module.scss";
import FecharHeader from "/Header/imagem-fechar-header.png";
import People from "/Header/image.png";
import Home from "/Header/botao - Home.png";
import Historico from "/Header/Botão - Histórico.png";
import Pesquisa from "/Header/Botão - Pesquisa.png";
import Reembolso from "/Header/Botão - Reembolso.png";
import Sair from "/Header/Botão - Sair.png";



function NavBar() {

  const navigate = useNavigate()
  const [status, setStatus] = useState("fechado")

  function click() {
      if (status === "fechado") {
          setStatus("aberto")
      }
      else {
          setStatus("fechado")
      }
  }

  return (
      <nav className={`${styles.navBarEstilo} ${styles[status]}`}>
          <button onClick={() => click()}>
              <img src={FecharHeader} alt="Botão abrir e fechar" />
          </button>

          <section>
              <div className={styles.navbarPeople}>
              <img src={People} alt="Foto Perfil" />
              
              <h2>ADRIANO COSTA</h2>
              <p>Marketing</p>
              </div>

              <div className={styles.containerNavbar}> 

                  <div className={styles.buttonNav}>
                  <button onClick={() => {
                      navigate("/reembolsos");
                  }}>
                      <img src={Home} alt="Botão do Home" />
                  </button>
                  <p>Inicio</p>
                  </div>

                  <div className={styles.buttonNav}>
                  <button onClick={() => { navigate("/reembolsos") }}aria-label="Ir para a página de Reembolsos">
                      <img src={Reembolso} alt="Botão Reembolso" />
                  </button>
                  <p>Reembolsos</p>
                  </div>

                  <div className={styles.buttonNav}>
                  <button onClick={() => { navigate("/reembolsos") }}>
                      <img src={Pesquisa} alt="Botão Pesquisa" />
                  </button>
                  <p>Pesquisa</p>
                  </div>

                  <div className={styles.buttonNav}>
                  <button onClick={() => { navigate("/solicitacao") }}>
                      <img src={Historico} alt="Botão Histórico" />
                  </button>
                  <p>Histórico</p>
                  </div>
              </div>
          </section>



          <button className={styles.buttonSair} onClick={() => { navigate("/") }}>
              <img src={Sair} alt="Botão Sair" />
          </button>
      </nav>
  );
}

export default NavBar;