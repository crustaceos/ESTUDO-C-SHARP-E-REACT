import React from "react";
import ProdutoAlterar from "./Componentes/PageseProdutos/ProdutoAlterar"
import ProdutoBuscar from "./Componentes/PageseProdutos/ProdutoBuscar";
import ProdutoCadastrar from "./Componentes/PageseProdutos/ProdutoCadastrar"
import ProdutoLista from "./Componentes/PageseProdutos/ProdutoLista";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import "../src/styles.css"
//1 - Um componente SEMPRE deve começar com a primeira letra
//maiúscula
//2 - Todo componente DEVE ser uma função do JS
//3 - Todo deve retornar apenas UM elemento HTML

const App: React.FC = () =>{
return(
    <BrowserRouter>
    <div className="navegacao">
        <nav>
            <ul>
              <li>
                <Link to = "/Lista">Lista de Produtos</Link>
              </li>
              <li>
                <Link to = "/Cadastrar">Cadastrar Novos Produtos</Link>
              </li>
              <li>
                <Link to = "/Buscar">Buscar Produtos</Link>
              </li>
              <li>
                <Link to = "Alterar">Alterar Produtos</Link>
              </li>
            </ul>
        </nav>
        <Routes>
          <Route path = "/Lista" element={<ProdutoLista/>}/>
          <Route path = "/Cadastrar" element={<ProdutoCadastrar/>}/>
          <Route path = "/Buscar" element={<ProdutoBuscar/>}/>
          <Route path = "/Alterar" element={<ProdutoAlterar/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );

};
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;
