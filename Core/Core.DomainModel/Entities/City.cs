﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.DomainModel.Entities
{
    [Table(name: "city")]
    public class City : BaseEntity<long>
    {

        [Required(ErrorMessage = "Country is required!")]
        public short CountryId { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters!")]
        public string Name { get; set; }

        public virtual Country Country { get; set; }

        public ICollection<Hotel> Hotels { get; set; }

    }

    internal class CityEntityTypeConfiguration : IEntityTypeConfiguration<City>
    {

        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder
                .Property(q => q.Id)
                .UseIdentityColumn()
                .ValueGeneratedOnAdd();

            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .HasIndex(q => new { q.CountryId, q.Name })
                .IsUnique();
        }

    }
}
