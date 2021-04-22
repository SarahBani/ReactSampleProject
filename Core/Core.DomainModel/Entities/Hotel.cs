﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.DomainModel.Entities
{
    [Table(name: "hotel")]
    public class Hotel : BaseEntity<long>
    {

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "City is required!")]
        public long CityId { get; set; }

        [Required(ErrorMessage = "Stars is required!")]
        [Range(minimum: 0, maximum: 5)]
        public byte Stars { get; set; }

        public string Address { get; set; }

        public virtual City City { get; set; }

        public ICollection<HotelPhoto> Photos { get; set; }

    }
    internal class HotelEntityTypeConfiguration : IEntityTypeConfiguration<Hotel>
    {

        public void Configure(EntityTypeBuilder<Hotel> builder)
        {
            builder.HasOne(q => q.City)
                .WithMany(q => q.Hotels)
                .HasForeignKey(q => q.CityId);

            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(q => q.Stars)
                .IsRequired();

            builder.HasMany(q => q.Photos)
                .WithOne(q => q.Hotel)
                .HasForeignKey(q => q.HotelId);
        }

    }
}
