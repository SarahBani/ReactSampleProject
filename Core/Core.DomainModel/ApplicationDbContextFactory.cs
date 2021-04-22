using Core.DomainModel.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Core.DomainModel
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {

        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=test2;User Id=Sarah;Password=sa123;");

            return new ApplicationDbContext(optionsBuilder.Options);
        }

    }
}
