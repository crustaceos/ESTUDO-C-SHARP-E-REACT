using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;

namespace API.Models;

    public class AppDbContext : DbContext
    {
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; } // Adicionando DbSet para Categoria
        public DbSet<Cliente> Clientes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Definindo o banco de dados SQLite
            optionsBuilder.UseSqlite("Data Source=nomeDoSeuBanco.db");
        }

       // protected override void OnModelCreating(ModelBuilder modelBuilder)
//{
   // base.OnModelCreating(modelBuilder);
    //PRA DIZER QUEM É A FOREIGN KEY
    // Configurando a relação entre Produto e Categoria
   // modelBuilder.Entity<Produto>()
       // .HasOne(p => p.Categoria) // Relação de Produto com Categoria
       // .WithMany() // Cada Categoria pode ter vários Produtos
      //  .HasForeignKey(p => p.CategoriaId) // A chave estrangeira é CategoriaId
      //  .OnDelete(DeleteBehavior.Restrict); // Evita a exclusão em cascata para não apagar Produtos ao excluir uma Categoria
}

        
    