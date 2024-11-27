import React, { useState } from "react";
import { Produto } from "../../Models/Produto";
import "../../styles.css"

///Primeiro, inicio as constantes do produto vazias
///depois, usuario digita o id que ele quer, pego a requisição com o fetch, e jogo em reposta
///depois jogo pra data, e coloco nas constantes vazias, cada um dos componentes do produto que o usuario escolheu
///daí o usuario digita, nome, descricao e valor, e isso é alterado nas constantes (menos id, pq o id sempre vai ser o mesmo)
///como o id não foi alterado, mas os outros atributos foram, o fetch de PUT vai usar o id que tava fixo, o que o usuario digitou, e vai substituir os outros atributos no produto com aquele id

function ProdutoAlterar() {
const [id, setId] = useState<number>(0);
const [nome, setNome] = useState<string>('');
const [descricao, setDescricao] = useState<string>('');
const [valor, setValor] = useState<number>(0);

 
  function buscarProduto(e: React.FormEvent) {
    e.preventDefault(); 

    fetch("http://localhost:5006/api/produto/buscar/id:" + id)
    .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Produto não encontrado");
        }
        return resposta.json();
      })
      .then ((data) => {
        setNome(data.nome);
        setDescricao(data.descricao);
        setValor(data.valor);
      })
      .catch((error) => {
        throw new Error("Produto não encontrado");
      })
   
  }

  function alterarProduto(e: React.FormEvent){
    ///essa constante de produtoAtualizado não é exatamente necessária, só serve pra organizar o código
    ///pq, se eu tivesse muitas outras constantes, mas quisesse fzr a requisição de apenas algumas, eu limito quais são elas com essa nova constante
    ///ent eu só enviaria nome, descricao e valor
    /// o ponto é, essas informações ja foram alteradas la no inicio, nas "maes" ent eu só joguei esses mesmos valores pra dentro dessa constante de produtoAtalizado
    const produtoAtualizado = {nome, descricao, valor};

    fetch("http://localhost:5006/api/produto/alterar/id:" + id ,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produtoAtualizado)
    })
    .then((resposta) => {
        if(!resposta.ok){
            throw new Error ("Erro ao autalizar o produto")
        }
        return resposta.json();
    })
    .then(()=> {
        setNome('');
        setDescricao('');
        setValor(0);
    })
    .catch(()=>{
        throw new Error ("Erro ao cadastrar produto")
    });

  }


  return (
    <div>
      <h2>Buscar Produto para Alteração</h2>
      <form onSubmit={buscarProduto}>
        <label>
            Digite o id do produto que deseja alterar:
            <input 
             type = "number" 
             value={id}
             onChange={e => setId(Number(e.target.value))}
             required
             />
        </label>
        <button type = "submit">Procurar</button>
      </form>

      <form onSubmit={alterarProduto}>
        <label>
            Nome:
            <input type="text" value = {nome} onChange={e => setNome(e.target.value)} required/>
        </label>

        <label>
            Descricao:
            <input type = "text" value= {descricao} onChange={e => setDescricao(e.target.value)} required/>
        </label>
        <label>
            Valor:
            <input type = "number" value = {valor} onChange={e => setValor(Number(e.target.value))} required/>
        </label>
        <button type = "submit">Atualizar dados do Produto</button>
      </form>
    </div>
  );
}


export default ProdutoAlterar;
