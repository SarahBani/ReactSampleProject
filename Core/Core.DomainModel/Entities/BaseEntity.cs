using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public abstract class BaseEntity<TKey>
    {

        [Required]
        public TKey Id { get; set; }

    }
}
