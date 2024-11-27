import React, { useState } from "react";
import { Produto } from "../../Models/Produto";
import "../../styles.css"

function ProdutoBuscar() {
  const [id, setId] = useState<number>(0); 
  ///esse | null serve pra dizer que ainda não há nada dentro de produto, ele pode ter dois estados, um preenchido, q vai ser do tipo produto, e um do tipo vazio
  const [produto, setProduto] = useState<Produto | null>(null); 



  ///esse código é simples, funciona da seguinte forma: criei a constante id e iniciei ela vazia, dps o usuario vai escrever um numero pra ser o novo id
  ///dps que ele digitar, o id que tava vazio, passa a conter o numero digitado pelo usuario
  ///daí eu faço um fetch + id que agora tem o valor que o usuario digitou
  ///gero uma resposta, vejo se tem erro blabla, jogo essa resposta pra produto buscado
  ///seto a constante produto que ta vazia com esse produto buscado
  /// volto no html, verifico se produto ta vazio ou não, e imprimo cada um dos componentes dentro desse produto
 
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 

    fetch("http://localhost:5006/api/produto/buscar/id:" + id)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Produto não encontrado");
        }
        return resposta.json();
      })
      .then((produtoBuscado) => {
        if (!produtoBuscado) {
          throw new Error("Produto não cadastrado no sistema");
        }
        setProduto(produtoBuscado); 
      })
      ///igual aquela data lá, esse zera oq tava escrito
      .catch((erro) => {
        console.error(erro.message);
        setProduto(null); 
      });
  }


  ///esse "{produto &&("
  /// )} serve pra tipo, caso o valor de produto seja nulo -ele não encontrar um produto com o id fornecido- nada vai ser renderizado

  ///como dessa vez, não quero mostrar uma lista de produtos, apenas um, eu chamo produto && pra verificar se tem algum, e apenas mostro na tela os compenentes desse produto. Ou seja, não utilizo .map, .map é para arrays (listas)
  return (
    <div>
      <h2>Buscar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Digite o ID do produto:
          <input
            type="number"
            value={id}
            onChange={e => setId(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit">Procurar produto</button>
      </form>

      {produto && (
        <table className="tabela">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.valor}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProdutoBuscar;