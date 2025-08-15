using Microsoft.EntityFrameworkCore;
using ProjetoSiteProfNelson.Models;

namespace ProjetoSiteProfNelson.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<ITEMS> ITEMS { get; set; }
        public DbSet<PATRIMONIOC> PATRIMONIOC { get;set; }
        public DbSet<PALAVRAE> PALAVRAE { get; set; }
        public DbSet<PALAVRAA> PALAVRAA { get; set; }
    }
}
