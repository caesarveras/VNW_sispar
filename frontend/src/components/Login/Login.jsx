import './Login.scss';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <>
      <main>
        <section className="Capa">          
        </section>
        <section className="Logo">
          <div className="Frame-logo">
            
          </div>
          <h1 >Boa Vindas ao <br/> Novo Portal SISPAR</h1>
          <p>Sistema de Emissão de Boletos e Parcelamento</p>
          <form action="" method="get">
            <input type="text" name="Email" placeholder="Email" className='Username'/>
            <input type="password" name="senha" placeholder="senha" className='Password'/>
            <a href="#">Esqueci a Minha Senha</a>
            <div className='btn'>
              <Link to="/Reembolsos">
              <button type="submit" className='Entrar'>Entrar</button>
              </Link>
              <button type="submit" className='CriarConta'>Criar Conta</button>
            </div>
            
          </form>          
        </section>
        
      
      </main>
    </>
  );
}

export default Login;
