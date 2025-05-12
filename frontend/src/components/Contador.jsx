import { useState } from "react";

function Contador() {
  const [numero, setNumero] = useState(0);

  return (
    <>
      <h2> 0 </h2>
      <h2> {numero} </h2>
      <button onClick={() => setNumero(numero + 1)}> + </button>
    </>
  );
}

export default Contador;
