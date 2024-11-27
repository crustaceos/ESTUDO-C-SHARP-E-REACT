using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

///COLOCAR TUDO ISSO ATÉ AS SETAS APRA FZR A LIGACAO DA API COM O FRONT, NO FINAL COLOCAR AQUELE TBM
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();
///////


app.MapGet("/", () => "Programa Loja Estudo");

app.MapPost("/api/categoria/cadastrar", ([FromBody] Categoria categoria, [FromServices] AppDbContext ctx) =>{

    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("",categoria);

});


///FromBody é a tabelinha em json com as informações que eu coloco embaixo da requisição de cadastrar, ele pega aquelas informações e joga dentro da variavel "cliente" que veio da classe "Cliente"
app.MapPost("/api/cliente/cadastrar", ([FromBody] Cliente cliente, [FromServices] AppDbContext ctx)=>{

ctx.Clientes.Add(cliente);
ctx.SaveChanges();
return Results.Created("",cliente);
});

app.MapPost("/api/produto/cadastrar", ([FromBody] Produto produto, [FromServices] AppDbContext ctx) =>
{
    // Verificar se a categoria existe antes de adicionar o produto

    ctx.Produtos.Add(produto);
    ctx.SaveChanges();
    return Results.Created("", produto);
});


app.MapGet("/api/cliente/listarTudo", ([FromServices] AppDbContext ctx) =>{

if(ctx.Clientes.Count() > 0){
    return Results.Ok(ctx.Clientes.ToList());
}
else{
    return Results.NotFound();
}
});

app.MapGet("/api/produto/listarTudo", ([FromServices] AppDbContext ctx) =>{
    if(ctx.Produtos.Count() > 0){
        return Results.Ok(ctx.Produtos.ToList());
    }
    else{
        return Results.NotFound();
    }
});

app.MapGet("/api/cliente/buscar/id:{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>{


    ///PARA ENCONTRAR ALGUMA COISA EU TENHO QUE CRIAR UMA VARIAVEL cliente APARTIR DA CLASSE CLIENTE
    ///ESSE cliente VAI SER IGUAL AO CLIENTE QUE ESTA NO BANCO DE DADOS QUE POSSUI ESSE ID QUE ESTOU BUSCANDO NO HTTP
    ///E NA HORA DE RETORNAR O RESULTADO, EU MOSTRO APENAS ESSE cliente EM ESPECIFICO
    
    Cliente? cliente = ctx.Clientes.Find(id);

    if(cliente == null){
        return Results.NotFound("O Cliente não esta cadastrado no sistema");
    }

    return Results.Ok(cliente);


});

app.MapGet("/api/produto/buscar/id:{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>{

    Produto? produto = ctx.Produtos.Find(id);

    if(produto == null){
        return Results.NotFound("Produto não cadastrado");
    }

    return Results.Ok(produto);

});

app.MapDelete("/api/produto/deletar/id:{id}", ([FromRoute] int id, [FromServices] AppDbContext ctx) =>{

    Produto? produto = ctx.Produtos.Find(id);

    if(produto == null){
        return Results.NotFound("Produto não cadastrado no sistema");
    }

    ctx.Produtos.Remove(produto);
    ctx.SaveChanges();
    return Results.Ok(produto);
});

app.MapPut("/api/produto/alterar/id:{id}", ([FromRoute] int id, [FromBody] Produto produtoAlterado, [FromServices] AppDbContext ctx) => {

    Produto? produto = ctx.Produtos.Find(id);

    if(produto == null){
        return Results.NotFound("Produto não cadastrado no sistema");
    }

    produto.Nome = produtoAlterado.Nome;
    produto.Descricao = produtoAlterado.Descricao;
    produto.Valor = produtoAlterado.Valor;

    ctx.Produtos.Update(produto);
    ctx.SaveChanges();
    return Results.Ok(produto);


});

app.MapGet("/api/produto/scorebaixo", ([FromServices] AppDbContext ctx) => {

    if(ctx.Produtos.Count() > 0){
        return Results.Ok(
            ctx.Produtos
                .Where(x => x.Status != "Alto")
                .ToList()
        );
    }

    return Results.NotFound("Produtos com Score Baixo não encontrados");


});



app.MapGet("/api/produto/scorealto", ([FromServices] AppDbContext ctx) => {

    var produtos = ctx.Produtos.Where(x => x.Status == "Alto").ToList();
    
    if (produtos.Any()) {
        return Results.Ok(produtos);
    }

    return Results.NotFound("Nenhum produto com 'Score Alto' encontrado.");
});



///COLOCAR ESSE TBM
app.UseCors("Acesso Total");
app.Run();
