import React from "react";
import { useEffect, useState } from "react";
import {Produto} from "../../Models/Produto"

function ProdutoCadastrar() {
  ///mesmos quinhentos de listar tudo, mas agora, nome vai usar o estado de uma string e vai iniciar vazia
  ///pro nvalor mesma coisa, mas ele vai no caso inciar com zero
const[nome, setNome] = useState<string>('');
const[descricao, setDescricao] = useState<string>('');
const[valor, setValor] = useState<number>(0);



///função para criar um novo produto
///esse handleSubmit e preventDefault é pra página não ficar recarregando toda vez que enviar algo
///fetch normal, mas dps abro uma chave e digo que o método vai ser POST, daí digo que o conteudo a ser postado vai ser JSON
function handleSubmit(e: any){
e.preventDefault();

  // Verifica se o valor é menor que 1000
  ///esse "valor" é o valor que vai ser jogado para a api, mesmo "valor" que ta jnt com "setValor"
  if (valor < 1000) {
    throw new Error('O valor do produto deve ser maior ou igual a 1000.');
  }

///após o usuário digitar os valores e o setBLABLA enviar esses valores pro "valor" esses valores passam a ser os do novoProduto, que daí é postado
  const novoProduto = {
    nome,
    descricao,
    valor 
  };

  
  ///o JSON.strinify ele vai ler os inputs e tranformar em json pra jogar na API
  fetch("http://localhost:5006/api/produto/cadastrar" ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoProduto)
  
    })
    ///isso é pra dps que for postado as informações, ele averiguar se vai ter algum erro no POST
    .then(resposta => {
      if(!resposta.ok){
        throw new Error('Erro na requisição');
      }
      return resposta.json();
    })
    ///isso aqui, seria no caso, após o usuario digitar e enviar pra API, esse data vai resetar os campos(inputs) para que ele possa digitar algo novamente
    .then(data => {
      setDescricao('');
      setValor(0);
    })
    ///esse erro puxa caso não tenha conseguido enviar/limpar os dados
    .catch(error => {
      console.error('Erro', error);
    })

}

///o form onSubmit blablabla define um formulario pra coletar dados que o usuário digitar, e o onSubmit handle blabla é um evento genérico pra quando a informação for enviada
///os inputs vão ficar dentro do form
//crio uma label só pra assocair um nome no input, dps crio o input
///digo o tipo dele, pode ser "text", "number" etc, significa o tipo de informação que o usupario vai digitar dentro do input
///no VALUE descricao ou valor por exemplo, pq ele começa com 0, dps que eu digitar, o react vai atualizar esse valor pro que eu digitei
///onChange ativa toda vez que mudar o campo, ou seja, o usuario digitar algo
///dps ele vai setar a descricao/valor ou que quer que seja, com o valor que foi digitado no input usando setDescricao(e.target.value)
///required é só pra dizer que não pode ser deixado vazio na hora de enviar
///por fim, coloco um botao, e o tipo dele vai ser "submit" que vai ativar o formulario(form) e enviar tudo
  return (
    <div className="conteiner">
      <h2>Cadastrar produto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type = "text" value={nome} onChange = {e => setNome(e.target.value)} required/>
        </label>
      <label>
        Descrição:
        <input type= "text" value={descricao} onChange={e => setDescricao(e.target.value)} required/>
      </label>

      <label>
        Valor:
        <input type= "number" value={valor} onChange={e => setValor(Number(e.target.value))} required/>
      </label>
      <button type = "submit">Cadastrar Produto</button>
      </form>
    </div>
  );
}

export default ProdutoCadastrar;