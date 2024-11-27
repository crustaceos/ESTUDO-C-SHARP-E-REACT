import { useEffect, useState } from "react";
import { Produto } from "../../Models/Produto"
import "../../styles.css"

function ProdutoLista() {


///cria uma constante da seguinte forma: "produtos" é o estado atual que ele está, no inicio, ta vazio
///"setProdutos" vai ser o que vai atualizar o valor dentro de "produtos"
///useState<> define o tipo que será armazenado em "produtos", por exemplo, nesse caso, ele vai armazenar em "produto" uma array (lista) de produtos, ou poderia ser só a classe produto, mas nesse caso vamos listar todos os produtos
///agora os () após o <> vai ser o valor inicial do estado de "produtos"
const[produtos, setProdutos] = useState<Produto[]>([]);



///fetch faz a requisição do método http. Toda vez que um fizer um fetch, ele vai me retornar um objeto, que seria um resposta, que vai ser todas as informações e dados daquele método http.
/// eu estou dizendo que "resposta" é esse objeto, que vai trazer todas as informações e dados que estão na resposta da requisição em http nesse primeiro ".fetch"
///daí retorno a resposta como json, (igual quando vai criar uma tabela com informações no http)
///o segundo ".then" ele vai pegar a tranformação da "resposta" que foi transformada em json, e vai jogar ela pra dentro de produtos (no caso, vai jogar todas as informações do método http, agora dentro de produtos, antes estava em resposta)
/// daí, o "setProdutos" vai atualizar o estado "produtos" com os dados recebidos


useEffect(() => {
  // O fetch deve ser chamado apenas uma vez, assim que o componente for montado, para isso que serve o useEffect
  ///O fetch sozinho, por padrão, sempre usa o método GET
  fetch("http://localhost:5006/api/produto/listarTudo")
    .then((resposta) => resposta.json())
    .then((produtos) => {
      console.log("Produtos recebidos:", produtos);
      setProdutos(produtos);
    })
    .catch((error) => console.error("Erro ao buscar produtos:", error));
}, []); 




  ///<tr> é a linha, <th> oq vai estar no cabeçalho (usar em <thead> que é o próprio cabeçalho), <td> corpo da tabela (usar em <tbody> que é o corpo da tabela)
  ///"produtos.map((produto))" "produtos" é a array (lista) (nesse caso, pq talvez em outros não seja lista) .map, vai passar por cada item da array (lista) (.MAP EU USO PARA ARRAYS)
  ///o "produto" vai ser o que vai receber cada item da array, ele é um objeto qualquer que representa algo da lista, nome, id, etc
  ///o "tr key = {produto.id}" serve para diferenciar cada uma das linhas de corpo da tabela que serão mostradas, diferenciando elas pelo id. Cada linha vai ter um id próprio
  ///daí, pra printar essas informações na tabelas usar <td> {objeto.oQueDeleQueDveSerPrintado}
  return (
    <div className="conteiner">
      <h1>Lista de produtos:</h1>
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
        
        {produtos.map((produto) =>(
          <tr key = {produto.id}>
            <td>{produto.id}</td>
            <td>{produto.nome}</td>
            <td>{produto.descricao}</td>
            <td>{produto.valor}</td>
          </tr>

        ))}

      </tbody>

      </table>

    </div>
  );
}

export default ProdutoLista;