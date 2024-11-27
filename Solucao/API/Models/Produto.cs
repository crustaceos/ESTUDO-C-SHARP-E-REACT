using System;

namespace API.Models;

public class Produto
{
    public int Id {get;set;}
    public string? Nome{get;set;}
    public string? Descricao{get;set;}
    public double Valor{get;set;}

    
    /// antes de colocar a categoria e a categoria do id aqui, tem q criar a tabela categoria no banco de dados
    //depois disso vc adiciona aqui oq precisar, e adiciona o resto no AppDbContext pra dizer quem q é foreign key
    
     //public Categoria? Categoria {get;set;}
    

    //public int CategoriaId {get;set;}

    public string? Status {get;set;} = "Score baixo";

    //public DateTime
}