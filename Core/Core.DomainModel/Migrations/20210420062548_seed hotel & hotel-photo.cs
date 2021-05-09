using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class seedhotelhotelphoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        { 
            string sql = @"
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (50, N'The Istanbul hotel', 10, 5, N'');
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (51, N'hotel Dariush', 6, 5, N'');
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (52, N'The Saint hotel', 201, 5, N'');
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (53, N'hotel Rialto', 111, 4, N'');
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (54, N'Giessbach hotel', 90, 5, N'');
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (55, N'Adventure Cabins', 153, 0, N'');
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (56, N'Chalet Tré la Vieux', 101, 4, N'');
INSERT INTO hotel (id, name, city_id, stars, Address) VALUES (57, N'Faena', 41, 5, N'Miami Beach');

INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (28, 50, N'50/6b11e240-fb57-410c-ada0-46ce86ac4e41.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (29, 50, N'50/cbff077a-1512-41ee-ba9b-bd5d92e19fb1.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (30, 51, N'51/0695b32b-626f-4b99-a06f-6e469e1ad8de.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (31, 51, N'51/ffdd656e-18c0-44d7-9d82-ed52f95b4a49.jpeg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (32, 51, N'51/1619c554-428a-49cd-8187-0b9695a00c3b.jpeg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (33, 52, N'52/5957832b-a8da-43fe-82c3-47810dffccbb.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (34, 52, N'52/291d97ae-6e30-4ebe-b2a8-d340cadaf80e.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (35, 52, N'52/51a2f3af-5625-417b-b54c-a70b69fafaae.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (36, 53, N'53/8ca22c59-ff13-464d-bbf8-caec232cd3ee.png');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (37, 53, N'53/2effe151-3ea5-4dc6-b926-5e458b7f130d.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (38, 54, N'54/fca7a108-3e2a-4ba6-a67a-71a98769f724.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (39, 54, N'54/39a7be13-152e-4a06-9912-c2ea15ad6606.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (40, 54, N'54/1627ef6b-0bac-4b73-8633-e5611a00524c.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (41, 56, N'56/4ac335f4-6e5f-4bd6-ab40-6fbba0f88c31.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (42, 56, N'56/99c89ba2-c9cb-4770-9019-382a62f1f9bb.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (43, 56, N'56/958005ce-44af-4ded-b2f0-1c28086f1b65.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (44, 56, N'56/47a9210e-80bb-4409-b797-69003da39f11.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (45, 55, N'55/f68ba108-5daa-4514-bc2c-557add6fd357.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (46, 55, N'55/b4fe0a0c-1445-4597-8ac3-ed8442c6207e.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (47, 55, N'55/a5d7756d-ee95-4be1-bd8a-e8f7117b4df8.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (48, 55, N'55/ca3b5fd7-7eb9-4485-920e-2049796ada99.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (50, 57, N'36/aa8bb489-bc82-4a52-b4c5-eebe7afca4f0.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (51, 57, N'36/3798cc72-36e6-4fd0-a4b8-2251e062991c.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (52, 57, N'36/45332905-aed5-42c2-8ea8-92e110c7a307.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (53, 57, N'36/100f4eeb-a71f-43f0-be10-0c298834d52c.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (54, 57, N'36/1d88c2e4-b31e-4f2d-87f3-59a6511652ab.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (55, 57, N'36/90cd1dac-d5f4-4abe-a5ea-397c327fb345.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (56, 57, N'36/9c46a5c2-731a-4357-80de-f3fcf6c81d68.jpg');
INSERT INTO hotel_photo (id, hotel_id, photo_url) VALUES (57, 57, N'36/f09053df-d19d-4e98-845e-8a9a66ad0dbb.jpg');
            ";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM hotel_photo;", true);
            migrationBuilder.Sql("DELETE FROM hotel;", true);
        }
    }
}
