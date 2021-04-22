using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.DomainModel.Entities
{
    [Table(name: "country")]
    public class Country : BaseEntity<short>
    {

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(40, ErrorMessage = "Name cannot be longer than 40 characters!")]
        public string Name { get; set; }

        public string FlagUrl { get; set; }

        public ICollection<City> Cities { get; set; }

    }

    internal class CountryEntityTypeConfiguration : IEntityTypeConfiguration<Country>
    {

        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.Property(q => q.Id)
                .ValueGeneratedNever();

            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(40);

            builder.HasIndex(q => q.Name)
                .IsUnique();

            builder.HasMany(q => q.Cities)
                .WithOne(q => q.Country)
                .HasForeignKey(q => q.CountryId);
        }

    }
}
