import { useState, useEffect } from "react";
import styles from "./Solicitacao.module.scss";
import Api from "../Services/Api"; //importando a api que está guardada na pasta Services

import Motivo from "../assets/motivo.png";
import Lixeira from "../assets/lixeira.png";

function Solicitacao() {
  const [colaborador, setColaborador] = useState(""); // Estado para o campo colaborador
  const [empresa, setEmpresa] = useState(""); // Estado para o campo empresa
  const [nPrestacao, setnPrestacao] = useState(""); // Estado para o campo número de prestação
  const [descricao, setDescricao] = useState(""); // Estado para o campo  descrição
  const [data, setData] = useState(""); // Estado para o campo data
  const [motivo, setMotivo] = useState(""); // Estado para o campo motivo  //ESSE ESTADO É PARA QUEM TÁ FAZENDO AVANÇADO UTILIZANDO MODAL
  const [tipoReembolso, setTipoReembolso] = useState(""); // Estado para o campo tipo de reembolso
  const [centroCusto, setCentroCusto] = useState(""); // Estado para o campo centro de custo
  const [ordemInterna, setOrdemInterna] = useState(""); // Estado para o campo ordem interna
  const [divisao, setDivisao] = useState(""); // Estado para o campo divisão
  const [pep, setPep] = useState(""); // Estado para o campo pep
  const [moeda, setMoeda] = useState(""); // Estado para o campo moeda
  const [distanciaKm, setDistanciaKm] = useState(""); // Estado para o campo distância km
  const [valorKm, setValorKm] = useState(""); // Estado para o campo valor km
  const [valorFaturado, setValorFaturado] = useState(""); // Estado para o campo valor faturado
  const [despesa, setDespesa] = useState(""); // Estado para o campo despesa

  const [dadosReembolso, setDadosReembolso] = useState([]);

  //FUNÇÃO PARA CAPTURAR OS VALORES DOS ESTADOS

  const handleSubmit = () => {
    const objetoReembolso = {
      colaborador,
      empresa,
      nPrestacao,
      descricao,
      data,
      tipoReembolso,
      ordemInterna,
      centroCusto,
      divisao,
      pep,
      moeda,
      distanciaKm,
      valorKm,
      valorFaturado,
      despesa,
    };

    setDadosReembolso(dadosReembolso.concat(objetoReembolso));
    limparCampos();
  };

  //FUNÇÃO PARA LIMPAR TODOS OS CAMPOS DO FORMULÁRIO

  const limparCampos = () => {
    setColaborador(""),
      setEmpresa(""),
      setnPrestacao(""),
      setDescricao(""),
      setData(""),
      setMotivo(""),
      setTipoReembolso(""),
      setCentroCusto(""),
      setOrdemInterna(""),
      setDivisao(""),
      setPep(""),
      setMoeda(""),
      setDistanciaKm(""),
      setValorKm(""),
      setValorFaturado(""),
      setDespesa("");
  };

  //FUNÇÃO PARA ENVIAR OS DADOS PARA A API
  const [foiEnviado, setFoiEnviado] = useState(false); //Esse estado serve para saber se o formulário foi enviado.

  const enviarParaAnalise = async () => {
    try {
      // const response = O resultado da resposta do servidor
      // await (esperar) = Faz com que o código espere a resposta da API
      // Api é a nossa api
      // post = é um método que serve para enviar algo para o servidor
      //             (1º argumento é o caminho da rota, 2º argumento é o que será enviado)
      const response = await Api.post("/refunds/new", dadosReembolso);
      console.log("Resposta da API", response); // Mostra no console a resposta da API (útil para os desenvolvedores testarem)
      alert("Reembolso solicitado com sucesso!"); //Mostra um alerda avisando que deu certo
      setFoiEnviado(true); //
    } catch (error) {
      //Caso dê erro na hora de enviar, ele mostra no console.
      console.log("Erro ao enviar", error); //Mostra o erro se algo der errado
    }
  };

  useEffect(() => {
    if (foiEnviado) {
      setDadosReembolso([]); //Zera o formulário depois do envio
      setFoiEnviado(false); //Voltou ao estado original (false)
    }
  }, [foiEnviado]); //observe essa variável


 //Resumo simplificado:
  //useState cria variáveis que guardam informações e atualizam a tela.
  //A função enviarParaAnalise manda os dados pra um servidor (API).
  // useEffect roda automaticamente quando a variável foiEnviado muda.
  //Depois que os dados são enviados, ele limpa tudo pra poder começar de novo.


  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <div>
            <label htmlFor="nome"> Nome Completo</label>
            <input
              value={colaborador}
              name="colaborador"
              type="text"
              onChange={(e) => setColaborador(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="empresa">Empresa</label>
            <input
              name="empresa"
              value={empresa}
              type="text"
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="prestacao"> Nº Prest. Contas</label>
            <input
              value={nPrestacao}
              type="number"
              name="nPrestacao"
              onChange={(e) => setnPrestacao(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="descricao">Descrição / Motivo do Reembolso</label>

            <textarea
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div></div>

        <div>
          <div>
            <label htmlFor="date"> Data</label>
            <input
              value={data}
              type="date"
              name="data"
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="tipoReembolso"> Tipo de Despesa </label>

            <select
              value={tipoReembolso}
              name="tipoReembolso"
              onChange={(e) => setTipoReembolso(e.target.value)}
            >
              <option value="selecionar">Selecionar</option>
              <option value="alimentacao">Alimentação</option>
              <option value="combustivel">Combustível</option>
              <option value="conducao">Condução</option>
              <option value="estacionamento">Estacionamento</option>
              <option value="viagem adm">Viagem admin.</option>
              <option value="viagem oper"> Viagem operacional</option>
              <option value="eventos">Eventos de representação</option>
            </select>
          </div>

          <div>
            <label htmlFor="custo">Centro de Custo</label>
            <select
              value={centroCusto}
              name="centroCusto"
              onChange={(e) => setCentroCusto(e.target.value)}
            >
              <option value="">Selecionar</option>
              <option value="FIN CONTROLES INTERNOS MTZ">
                1100109002 - FIN CONTROLES INTERNOS MTZ
              </option>
              <option value="FIN VICE-PRESIDENCIA FINANCAS MTZ">
                1100110002 - FIN VICE-PRESIDENCIA FINANCAS MTZ
              </option>
              <option value="FIN CONTABILIDADE MTZ">
                1100110101 - FIN CONTABILIDADE MTZ
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="ordemInterna">Ord. Int.</label>
            <input
              value={ordemInterna}
              name="ordemInterna"
              type="text"
              onChange={(e) => setOrdemInterna(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="divisao">Div.</label>
            <input
              type="text"
              name="divisao"
              value={divisao}
              onChange={(e) => setDivisao(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="pep">PEP</label>
            <input
              name="pep"
              type="text"
              value={pep}
              onChange={(e) => setPep(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="moeda">Moeda</label>
            <select
              name="moeda"
              value={moeda}
              onChange={(e) => setMoeda(e.target.value)}
            >
              <option value=""></option>
              <option value="brl">BRL</option>
              <option value="ars">ARS</option>
              <option value="usd">USD</option>
            </select>
          </div>

          <div>
            <label htmlFor="distancia">Dist. / Km</label>
            <input
              name="distanciaKm"
              type="text"
              value={distanciaKm}
              onChange={(e) => setDistanciaKm(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="valor">Valor / Km</label>
            <input
              name="valorKm"
              type="text"
              value={valorKm}
              onChange={(e) => setValorKm(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="faturado"> Val. Faturado </label>
            <input
              type="number"
              name="valorFaturado"
              value={valorFaturado}
              onChange={(e) => setValorFaturado(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="taxa"> Despesa </label>
            <input
              type="number"
              name="despesa"
              value={despesa}
              onChange={(e) => setDespesa(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" onClick={handleSubmit}>
              <img src="" alt="" /> Salvar
            </button>

            <button type="button" onClick={limparCampos}>
              <img src="" alt="" /> Deletar
            </button>
          </div>
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Colaborador(a)</th>
            <th>Empresa</th>
            <th>Nº Prest.</th>
            <th>Data</th>
            <th>Motivo</th>
            <th>Tipo de despesa</th>
            <th>Ctr. Custo</th>
            <th>Ord. Int.</th>
            <th>Div.</th>
            <th>PEP</th>
            <th>Moeda</th>
            <th>Dist. Km</th>
            <th>Val. Km</th>
            <th>Val. Faturado</th>
            <th>Despesa</th>
          </tr>
        </thead>

        <tbody>
          {dadosReembolso.map((item, index) => (
            <tr key={index}>
              <td>
                {" "}
                <img src={Lixeira} alt="" />{" "}
              </td>
              <td> {item.colaborador} </td>
              <td> {item.empresa} </td>
              <td>{item.nPrestacao}</td>
              <td>{item.data}</td>
              <td>
                {" "}
                <img src={Motivo} alt="" />{" "}
              </td>
              <td>{item.tipoReembolso}</td>
              <td>{item.centroCusto}</td>
              <td>{item.ordemInterna}</td>
              <td>{item.divisao}</td>
              <td>{item.pep}</td>
              <td>{item.moeda}</td>
              <td>{item.distanciaKm}</td>
              <td>{item.valorKm}</td>
              <td>{item.valorFaturado}</td>
              <td>{item.despesa}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={enviarParaAnalise}> Enviar para análise </button>
    </>
  );
}

export default Solicitacao;

//PASSO A PASSO

//1º ESTRUTURAMOS OS INPUTS

//2º GUARDAMOS CADA INPUT EM UM ESTADO, UTILIZANDO O HOOK USESTATE, SINTAXE: const [estado, setEstado] = useState("")

//3º PARA CADA VALUE="" DO INPUT, COLOCAR O ESTADO. EX: value="colaborador" E TAMBÉM UTILIZAMOS O EVENTO ONCHANGE, QUE É UM EVENTO NO REACT QUE DISPARA O QUANDO O VALOR DE UM CAMPO MUDA. EX: value="colaborador" onChange={(e) => setColaborador(e.target.value)}

//onchange: Esse é um evento do React que escuta qualquer mudança no campo (como digitar num input ou escolher uma opção num select).
//(e) => ... Aqui estamos usando uma arrow function que recebe o evento (e) como argumento. Esse 'e' representa o evento que foi disparado quando o valor do input mudou.
//e.target se refere ao próprio elemento input.
//.value é o valor digitado pelo usuário.

//Resumindo: Captura o novo valor e atualiza o estado colaborador com esse valor.

//4º CRIA A ESTRUTURA DA TABELA FORA DA TAG FORM, ELA RECEBERÁ OS DADOS ADICIONADOS NOS INPUTS

//5º ESSAS INFORMAÇÕES VÃO PRECISAR SER ARMAZENADAS EM ALGUM LUGAR, ENTÃO PRECISAMOS CRIAR UM ARRAY VAZIO PARA RECEBER ESSES DADOS.  const [dadosReembolso, setDadosReembolso] = useState([]);

//6º COM A ARRAY VAZIA, PRECISAMOS DE UMA FUNÇÃO PARA CAPTURAR OS VALORES DOS ESTADOS

//7º FUNÇÃO PARA CAPTURAR OS VALORES DOS ESTADOS (HANDLESUBMIT)
// Essa função captura os valores dos estados, coloca eles organizados em objetos que serão adicionados no array dadosReembolso para serem exibidos no map
// Função que é chamada quando o formulário é enviado
//Ela será ativada no botão enviar, e armazenada na tabela, que já vamos criar.

/* 8º map transformar cada item dessa lista em algo novo, sem mudar a lista original. O map é uma função que faz isso pra você!
dadosReembolso: é o array, a lista que vai mostrar.
item: é cada elemento da lista, um por um. 
index: é a posição do item na lista. Ex: 0, 1 ...
           
key={index} : é uma exigência do React para identificar cada elemento único na renderização (evita bugs e deixa o React mais rápido).
key:  é uma identificação única que o React usa pra saber qual item
index: número da posição do item
*/

//9º  PREVINIR O CARREGAMENTO DA PÁGINA UTOMATICAMENTE
// onSubmit:  É um evento que dispara quando você clica no botão de “Enviar”
// (e) => e.preventDefault():Essa é uma função que bloqueia o comportamento padrão do formulário.

/* OBS: Em HTML puro, quando você envia um <form>, ele recarrega a página automaticamente.
Só que no React a gente não quer que isso aconteça, porque a gente controla tudo com JavaScript e hooks (useState, useEffect, etc).
Por isso, usamos e.preventDefault() pra impedir o recarregamento da página. */
