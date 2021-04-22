using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Core.DomainModel.Migrations
{
    public partial class CreateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "country",
                columns: table => new
                {
                    id = table.Column<short>(nullable: false),
                    name = table.Column<string>(maxLength: 40, nullable: false),
                    flag_url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_country", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "city",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    country_id = table.Column<short>(nullable: false),
                    name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_city", x => x.id);
                    table.ForeignKey(
                        name: "fk_city_country_country_id",
                        column: x => x.country_id,
                        principalTable: "country",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "hotel",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 100, nullable: false),
                    city_id = table.Column<long>(nullable: false),
                    stars = table.Column<byte>(nullable: false),
                    address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_hotel", x => x.id);
                    table.ForeignKey(
                        name: "fk_hotel_city_city_id",
                        column: x => x.city_id,
                        principalTable: "city",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "hotel_photo",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    hotel_id = table.Column<long>(nullable: false),
                    photo_url = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_hotel_photo", x => x.id);
                    table.ForeignKey(
                        name: "fk_hotel_photo_hotel_hotel_id",
                        column: x => x.hotel_id,
                        principalTable: "hotel",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_city_country_id_name",
                table: "city",
                columns: new[] { "country_id", "name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_country_name",
                table: "country",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_hotel_city_id",
                table: "hotel",
                column: "city_id");

            migrationBuilder.CreateIndex(
                name: "ix_hotel_photo_hotel_id",
                table: "hotel_photo",
                column: "hotel_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "hotel_photo");

            migrationBuilder.DropTable(
                name: "hotel");

            migrationBuilder.DropTable(
                name: "city");

            migrationBuilder.DropTable(
                name: "country");
        }
    }
}
