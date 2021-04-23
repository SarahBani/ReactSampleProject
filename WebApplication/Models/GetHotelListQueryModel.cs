namespace WebApplication.Models
{
    public class GetHotelListQueryModel
    {

        public long? CityId { get; set; }
        public short? CountryId { get; set; }
        public short? PageNo { get; set; }
        public short? PageCount { get; set; }

    }
}
