﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.DomainModel.Entities
{
    [Table(name: "hotel_photo")]
    public class HotelPhoto : BaseEntity<long>
    {

        [Required(ErrorMessage = "Hotel is required!")]
        public long HotelId { get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        public virtual Hotel Hotel { get; set; }

    }
    internal class HotelPhotoEntityTypeConfiguration : IEntityTypeConfiguration<HotelPhoto>
    {

        public void Configure(EntityTypeBuilder<HotelPhoto> builder)
        {
            builder.Property(q => q.HotelId)
                .IsRequired();

            builder.Property(q => q.PhotoUrl)
                .IsRequired();
        }

    }
}
