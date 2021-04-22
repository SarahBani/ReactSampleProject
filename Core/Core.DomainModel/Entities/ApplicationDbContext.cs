using Microsoft.EntityFrameworkCore;

namespace Core.DomainModel.Entities
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<Country> Cities { get; set; }

        public DbSet<Country> Countries { get; set; }

        //public DbSet<Hotel> Hotels { get; set; }

        //public DbSet<HotelPhoto> HotelPhotos { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // after adding Identity this line is mandatory

            ////This will singularize all table names
            //foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            //{
            //    entityType.SetTableName(entityType.DisplayName());
            //}

            modelBuilder.ApplyConfiguration(new CountryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CityEntityTypeConfiguration());
            //modelBuilder.ApplyConfiguration(new HotelEntityTypeConfiguration());
            //modelBuilder.ApplyConfiguration(new HotelPhotoEntityTypeConfiguration());
        }
    }
}
