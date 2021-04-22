using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class seedcountrycity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
               table: "country",
               columns: new[] { "id", "flag_url", "name" },
               values: new object[,]
               {
                    { (short)1, "Iran.png", "Iran" },
                    { (short)18, "Poland.png", "Poland" },
                    { (short)17, "Hungary.png", "Hungary" },
                    { (short)16, "Denmark.png", "Denmark" },
                    { (short)15, "Austria.png", "Austria" },
                    { (short)14, "Norway.png", "Norway" },
                    { (short)13, "Sweden.png", "Sweden" },
                    { (short)12, "Spain.png", "Spain" },
                    { (short)11, "Italy.png", "Italy" },
                    { (short)10, "France.png", "France" },
                    { (short)9, "Switzerland.png", "Switzerland" },
                    { (short)8, "Netherlands.png", "the Netherlands" },
                    { (short)7, "Germany.png", "Germany" },
                    { (short)6, "Australia.png", "Australia" },
                    { (short)5, "Canada.png", "Canada" },
                    { (short)4, "USA.png", "the USA" },
                    { (short)3, "UK.png", "the UK" },
                    { (short)2, "Turkey.png", "Turkey" },
                    { (short)19, "Finland.png", "Finland" },
                    { (short)30, "UAE.png", "UAE" },
                    { (short)20, "Greece.png", "Greece" }
               });

            migrationBuilder.InsertData(
                table: "city",
                columns: new[] { "id", "country_id", "name" },
                values: new object[,]
                {
                    { 1L, (short)1, "Tehran" },
                    { 2L, (short)1, "Shiraz" },
                    { 3L, (short)1, "Isfahan" },
                    { 4L, (short)1, "Tabriz" },
                    { 5L, (short)1, "Yazd" },
                    { 6L, (short)1, "Kish" },
                    { 7L, (short)1, "Mashhad" },

                    { 10L, (short)2, "Istanbul" },
                    { 11L, (short)2, "Antalya" },
                    { 12L, (short)2, "Ankara" },
                    { 13L, (short)2, "Izmir" },
                    { 14L, (short)2, "kusadasi" },

                    { 30L, (short)3, "London" },
                    { 31L, (short)3, "Manchester" },

                    { 40L, (short)4, "New York" },
                    { 41L, (short)4, "Los Angeles" },
                    { 42L, (short)4, "Chicago" },
                    { 43L, (short)4, "Washington" },

                    { 50L, (short)5, "Torento" },
                    { 51L, (short)5, "Vancouver" },
                    { 52L, (short)5, "Montreal" },

                    { 60L, (short)6, "Sydney" },
                    { 61L, (short)6, "Melbourn" },

                    { 70L, (short)7, "Munich" },
                    { 71L, (short)7, "Hamburg" },
                    { 72L, (short)7, "Berlin" },
                    { 73L, (short)7, "Cologne" },
                    { 74L, (short)7, "Frankfurt" },

                    { 80L, (short)8, "Amsterdam" },
                    { 81L, (short)8, "Rotterdam" },

                    { 90L, (short)9, "Zurich" },
                    { 91L, (short)9, "Lausanne" },
                    { 92L, (short)9, "Geneva" },
                    { 93L, (short)9, "Basel" },
                    { 94L, (short)9, "Bern" },

                    { 100L, (short)10, "Paris" },
                    { 101L, (short)10, "Nice" },

                    { 110L, (short)11, "Rome" },
                    { 111L, (short)11, "Venice" },
                    { 112L, (short)11, "Florence" },
                    { 113L, (short)11, "Milan" },

                    { 120L, (short)12, "Barcelona" },
                    { 121L, (short)12, "Madrid" },

                    { 130L, (short)13, "Stockholm" },
                    { 131L, (short)13, "Gothenburg" },

                    { 141L, (short)14, "Oslo" },

                    { 150L, (short)15, "Vienna" },
                    { 151L, (short)15, "Graz" },
                    { 152L, (short)15, "Linz" },
                    { 153L, (short)15, "Salzburg" },

                    { 160L, (short)16, "Copenhagen" },

                    { 170L, (short)17, "Budapest" },

                    { 180L, (short)18, "Warsaw" },

                    { 200L, (short)20, "Athens" },
                    { 201L, (short)20, "Santorini" },
                    { 202L, (short)20, "Mykonos" },
                });


//            string sql = @"
//INSERT INTO  country (id, name, flag_url) VALUES (1, 'Afghanistan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (2, 'Algeria', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (3, 'American Samoa', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (4, 'Angola', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (5, 'Anguilla', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (6, 'Argentina', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (7, 'Armenia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (10, 'Azerbaijan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (11, 'Bahrain', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (12, 'Bangladesh', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (13, 'Belarus', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (14, 'Bolivia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (15, 'Brazil', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (16, 'Brunei', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (17, 'Bulgaria', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (18, 'Cambodia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (19, 'Cameroon', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (21, 'Chad', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (22, 'Chile', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (23, 'China', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (24, 'Colombia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (25, 'Congo, The Democratic Republic of the', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (26, 'Czech Republic', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (27, 'Dominican Republic', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (28, 'Ecuador', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (29, 'Egypt', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (30, 'Estonia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (31, 'Ethiopia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (32, 'Faroe Islands', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (35, 'French Guiana', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (36, 'French Polynesia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (37, 'Gambia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (40, 'Greenland', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (41, 'Holy See (Vatican City State)', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (42, 'Hong Kong', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (44, 'India', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (45, 'Indonesia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (47, 'Iraq', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (48, 'Israel', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (50, 'Japan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (51, 'Kazakstan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (52, 'Kenya', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (53, 'Kuwait', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (54, 'Latvia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (55, 'Liechtenstein', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (56, 'Lithuania', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (57, 'Madagascar', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (58, 'Malawi', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (59, 'Malaysia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (60, 'Mexico', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (61, 'Moldova', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (62, 'Morocco', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (63, 'Mozambique', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (64, 'Myanmar', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (65, 'Nauru', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (66, 'Nepal', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (69, 'Nigeria', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (70, 'North Korea', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (71, 'Oman', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (72, 'Pakistan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (73, 'Paraguay', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (74, 'Peru', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (75, 'Philippines', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (77, 'Puerto Rico', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (78, 'Romania', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (79, 'Runion', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (80, 'Russian Federation', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (81, 'Saint Vincent and the Grenadines', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (82, 'Saudi Arabia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (83, 'Senegal', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (84, 'Slovakia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (85, 'South Africa', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (86, 'South Korea', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (88, 'Sri Lanka', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (89, 'Sudan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (92, 'Taiwan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (93, 'Tanzania', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (94, 'Thailand', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (95, 'Tonga', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (96, 'Tunisia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (98, 'Turkmenistan', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (99, 'Tuvalu', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (100, 'Ukraine', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (104, 'Venezuela', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (105, 'Vietnam', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (106, 'Virgin Islands, U.S.', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (107, 'Yemen', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (108, 'Yugoslavia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (109, 'Zambia', NULL);
//INSERT INTO  country (id, name, flag_url) VALUES (8, 'Australia', 'Australia.png');
//INSERT INTO  country (id, name, flag_url) VALUES (9, 'Austria', 'Austria.png');
//INSERT INTO  country (id, name, flag_url) VALUES (20, 'Canada', 'Canada.png');
//INSERT INTO  country (id, name, flag_url) VALUES (110, 'Denmark', 'Denmark.png');
//INSERT INTO  country (id, name, flag_url) VALUES (97, 'Turkey', 'Turkey.png');
//INSERT INTO  country (id, name, flag_url) VALUES (33, 'Finland', 'Finland.png');
//INSERT INTO  country (id, name, flag_url) VALUES (113, 'Luxembourg', 'Luxembourg.png');
//INSERT INTO  country (id, name, flag_url) VALUES (34, 'France', 'France.png');
//INSERT INTO  country (id, name, flag_url) VALUES (38, 'Germany', 'Germany.png');
//INSERT INTO  country (id, name, flag_url) VALUES (39, 'Greece', 'Greece.png');
//INSERT INTO  country (id, name, flag_url) VALUES (43, 'Hungary', 'Hungary.png');
//INSERT INTO  country (id, name, flag_url) VALUES (46, 'Iran', 'Iran.png');
//INSERT INTO  country (id, name, flag_url) VALUES (49, 'Italy', 'Italy.png');
//INSERT INTO  country (id, name, flag_url) VALUES (67, 'Netherlands', 'Netherlands.png');
//INSERT INTO  country (id, name, flag_url) VALUES (68, 'New Zealand', 'NewZealand.png');
//INSERT INTO  country (id, name, flag_url) VALUES (114, 'Norway', 'Norway.png');
//INSERT INTO  country (id, name, flag_url) VALUES (76, 'Poland', 'Poland.png');
//INSERT INTO  country (id, name, flag_url) VALUES (87, 'Spain', 'Spain.png');
//INSERT INTO  country (id, name, flag_url) VALUES (90, 'Sweden', 'Sweden.png');
//INSERT INTO  country (id, name, flag_url) VALUES (91, 'Switzerland', 'Switzerland.png');
//INSERT INTO  country (id, name, flag_url) VALUES (101, 'United Arab Emirates', 'UAE.png');
//INSERT INTO  country (id, name, flag_url) VALUES (102, 'United Kingdom', 'UK.png');
//INSERT INTO  country (id, name, flag_url) VALUES (103, 'United States', 'USA.png');


//INSERT INTO city (id, country_id, name) VALUES (1, 87, 'A Corua (La Corua)');
//INSERT INTO city (id, country_id, name) VALUES (2, 82, 'Abha');
//INSERT INTO city (id, country_id, name) VALUES (3, 101, 'Abu Dhabi');
//INSERT INTO city (id, country_id, name) VALUES (4, 60, 'Acua');
//INSERT INTO city (id, country_id, name) VALUES (5, 97, 'Adana');
//INSERT INTO city (id, country_id, name) VALUES (6, 31, 'Addis Abeba');
//INSERT INTO city (id, country_id, name) VALUES (7, 107, 'Aden');
//INSERT INTO city (id, country_id, name) VALUES (8, 44, 'Adoni');
//INSERT INTO city (id, country_id, name) VALUES (9, 44, 'Ahmadnagar');
//INSERT INTO city (id, country_id, name) VALUES (10, 50, 'Akishima');
//INSERT INTO city (id, country_id, name) VALUES (11, 103, 'Akron');
//INSERT INTO city (id, country_id, name) VALUES (12, 101, 'al-Ayn');
//INSERT INTO city (id, country_id, name) VALUES (13, 82, 'al-Hawiya');
//INSERT INTO city (id, country_id, name) VALUES (14, 11, 'al-Manama');
//INSERT INTO city (id, country_id, name) VALUES (15, 89, 'al-Qadarif');
//INSERT INTO city (id, country_id, name) VALUES (16, 82, 'al-Qatif');
//INSERT INTO city (id, country_id, name) VALUES (17, 49, 'Alessandria');
//INSERT INTO city (id, country_id, name) VALUES (18, 44, 'Allappuzha (Alleppey)');
//INSERT INTO city (id, country_id, name) VALUES (19, 60, 'Allende');
//INSERT INTO city (id, country_id, name) VALUES (20, 6, 'Almirante Brown');
//INSERT INTO city (id, country_id, name) VALUES (21, 15, 'Alvorada');
//INSERT INTO city (id, country_id, name) VALUES (22, 44, 'Ambattur');
//INSERT INTO city (id, country_id, name) VALUES (23, 67, 'Amersfoort');
//INSERT INTO city (id, country_id, name) VALUES (24, 44, 'Amroha');
//INSERT INTO city (id, country_id, name) VALUES (25, 15, 'Angra dos Reis');
//INSERT INTO city (id, country_id, name) VALUES (26, 15, 'Anpolis');
//INSERT INTO city (id, country_id, name) VALUES (27, 22, 'Antofagasta');
//INSERT INTO city (id, country_id, name) VALUES (28, 15, 'Aparecida de Goinia');
//INSERT INTO city (id, country_id, name) VALUES (29, 67, 'Apeldoorn');
//INSERT INTO city (id, country_id, name) VALUES (30, 15, 'Araatuba');
//INSERT INTO city (id, country_id, name) VALUES (31, 46, 'Arak');
//INSERT INTO city (id, country_id, name) VALUES (32, 77, 'Arecibo');
//INSERT INTO city (id, country_id, name) VALUES (33, 103, 'Arlington');
//INSERT INTO city (id, country_id, name) VALUES (34, 48, 'Ashdod');
//INSERT INTO city (id, country_id, name) VALUES (35, 98, 'Ashgabat');
//INSERT INTO city (id, country_id, name) VALUES (36, 48, 'Ashqelon');
//INSERT INTO city (id, country_id, name) VALUES (37, 73, 'Asuncin');
//INSERT INTO city (id, country_id, name) VALUES (38, 39, 'Athenai');
//INSERT INTO city (id, country_id, name) VALUES (39, 80, 'Atinsk');
//INSERT INTO city (id, country_id, name) VALUES (40, 60, 'Atlixco');
//INSERT INTO city (id, country_id, name) VALUES (41, 103, 'Augusta-Richmond County');
//INSERT INTO city (id, country_id, name) VALUES (42, 103, 'Aurora');
//INSERT INTO city (id, country_id, name) VALUES (43, 6, 'Avellaneda');
//INSERT INTO city (id, country_id, name) VALUES (44, 15, 'Bag');
//INSERT INTO city (id, country_id, name) VALUES (45, 6, 'Baha Blanca');
//INSERT INTO city (id, country_id, name) VALUES (46, 23, 'Baicheng');
//INSERT INTO city (id, country_id, name) VALUES (47, 23, 'Baiyin');
//INSERT INTO city (id, country_id, name) VALUES (48, 10, 'Baku');
//INSERT INTO city (id, country_id, name) VALUES (49, 80, 'Balaiha');
//INSERT INTO city (id, country_id, name) VALUES (50, 97, 'Balikesir');
//INSERT INTO city (id, country_id, name) VALUES (51, 44, 'Balurghat');
//INSERT INTO city (id, country_id, name) VALUES (52, 19, 'Bamenda');
//INSERT INTO city (id, country_id, name) VALUES (53, 16, 'Bandar Seri Begawan');
//INSERT INTO city (id, country_id, name) VALUES (54, 37, 'Banjul');
//INSERT INTO city (id, country_id, name) VALUES (55, 104, 'Barcelona');
//INSERT INTO city (id, country_id, name) VALUES (56, 91, 'Basel');
//INSERT INTO city (id, country_id, name) VALUES (57, 48, 'Bat Yam');
//INSERT INTO city (id, country_id, name) VALUES (58, 97, 'Batman');
//INSERT INTO city (id, country_id, name) VALUES (59, 2, 'Batna');
//INSERT INTO city (id, country_id, name) VALUES (60, 18, 'Battambang');
//INSERT INTO city (id, country_id, name) VALUES (61, 75, 'Baybay');
//INSERT INTO city (id, country_id, name) VALUES (62, 75, 'Bayugan');
//INSERT INTO city (id, country_id, name) VALUES (63, 2, 'Bchar');
//INSERT INTO city (id, country_id, name) VALUES (64, 63, 'Beira');
//INSERT INTO city (id, country_id, name) VALUES (65, 103, 'Bellevue');
//INSERT INTO city (id, country_id, name) VALUES (66, 15, 'Belm');
//INSERT INTO city (id, country_id, name) VALUES (67, 4, 'Benguela');
//INSERT INTO city (id, country_id, name) VALUES (68, 62, 'Beni-Mellal');
//INSERT INTO city (id, country_id, name) VALUES (69, 69, 'Benin City');
//INSERT INTO city (id, country_id, name) VALUES (70, 49, 'Bergamo');
//INSERT INTO city (id, country_id, name) VALUES (71, 44, 'Berhampore (Baharampur)');
//INSERT INTO city (id, country_id, name) VALUES (72, 91, 'Bern');
//INSERT INTO city (id, country_id, name) VALUES (73, 44, 'Bhavnagar');
//INSERT INTO city (id, country_id, name) VALUES (74, 44, 'Bhilwara');
//INSERT INTO city (id, country_id, name) VALUES (75, 44, 'Bhimavaram');
//INSERT INTO city (id, country_id, name) VALUES (76, 44, 'Bhopal');
//INSERT INTO city (id, country_id, name) VALUES (77, 44, 'Bhusawal');
//INSERT INTO city (id, country_id, name) VALUES (78, 44, 'Bijapur');
//INSERT INTO city (id, country_id, name) VALUES (79, 29, 'Bilbays');
//INSERT INTO city (id, country_id, name) VALUES (80, 23, 'Binzhou');
//INSERT INTO city (id, country_id, name) VALUES (81, 66, 'Birgunj');
//INSERT INTO city (id, country_id, name) VALUES (82, 75, 'Bislig');
//INSERT INTO city (id, country_id, name) VALUES (83, 15, 'Blumenau');
//INSERT INTO city (id, country_id, name) VALUES (84, 15, 'Boa Vista');
//INSERT INTO city (id, country_id, name) VALUES (85, 85, 'Boksburg');
//INSERT INTO city (id, country_id, name) VALUES (86, 78, 'Botosani');
//INSERT INTO city (id, country_id, name) VALUES (87, 85, 'Botshabelo');
//INSERT INTO city (id, country_id, name) VALUES (88, 102, 'Bradford');
//INSERT INTO city (id, country_id, name) VALUES (89, 15, 'Braslia');
//INSERT INTO city (id, country_id, name) VALUES (90, 84, 'Bratislava');
//INSERT INTO city (id, country_id, name) VALUES (91, 49, 'Brescia');
//INSERT INTO city (id, country_id, name) VALUES (92, 34, 'Brest');
//INSERT INTO city (id, country_id, name) VALUES (93, 49, 'Brindisi');
//INSERT INTO city (id, country_id, name) VALUES (94, 103, 'Brockton');
//INSERT INTO city (id, country_id, name) VALUES (95, 78, 'Bucuresti');
//INSERT INTO city (id, country_id, name) VALUES (96, 24, 'Buenaventura');
//INSERT INTO city (id, country_id, name) VALUES (97, 76, 'Bydgoszcz');
//INSERT INTO city (id, country_id, name) VALUES (98, 75, 'Cabuyao');
//INSERT INTO city (id, country_id, name) VALUES (99, 74, 'Callao');
//INSERT INTO city (id, country_id, name) VALUES (100, 105, 'Cam Ranh');
//INSERT INTO city (id, country_id, name) VALUES (101, 103, 'Cape Coral');
//INSERT INTO city (id, country_id, name) VALUES (102, 104, 'Caracas');
//INSERT INTO city (id, country_id, name) VALUES (103, 60, 'Carmen');
//INSERT INTO city (id, country_id, name) VALUES (104, 75, 'Cavite');
//INSERT INTO city (id, country_id, name) VALUES (105, 35, 'Cayenne');
//INSERT INTO city (id, country_id, name) VALUES (106, 60, 'Celaya');
//INSERT INTO city (id, country_id, name) VALUES (107, 44, 'Chandrapur');
//INSERT INTO city (id, country_id, name) VALUES (108, 92, 'Changhwa');
//INSERT INTO city (id, country_id, name) VALUES (109, 23, 'Changzhou');
//INSERT INTO city (id, country_id, name) VALUES (110, 44, 'Chapra');
//INSERT INTO city (id, country_id, name) VALUES (111, 106, 'Charlotte Amalie');
//INSERT INTO city (id, country_id, name) VALUES (112, 85, 'Chatsworth');
//INSERT INTO city (id, country_id, name) VALUES (113, 86, 'Cheju');
//INSERT INTO city (id, country_id, name) VALUES (114, 92, 'Chiayi');
//INSERT INTO city (id, country_id, name) VALUES (115, 61, 'Chisinau');
//INSERT INTO city (id, country_id, name) VALUES (116, 92, 'Chungho');
//INSERT INTO city (id, country_id, name) VALUES (117, 45, 'Cianjur');
//INSERT INTO city (id, country_id, name) VALUES (118, 45, 'Ciomas');
//INSERT INTO city (id, country_id, name) VALUES (119, 45, 'Ciparay');
//INSERT INTO city (id, country_id, name) VALUES (120, 103, 'Citrus Heights');
//INSERT INTO city (id, country_id, name) VALUES (121, 41, 'Citt del Vaticano');
//INSERT INTO city (id, country_id, name) VALUES (122, 73, 'Ciudad del Este');
//INSERT INTO city (id, country_id, name) VALUES (123, 103, 'Clarksville');
//INSERT INTO city (id, country_id, name) VALUES (124, 60, 'Coacalco de Berriozbal');
//INSERT INTO city (id, country_id, name) VALUES (125, 60, 'Coatzacoalcos');
//INSERT INTO city (id, country_id, name) VALUES (126, 103, 'Compton');
//INSERT INTO city (id, country_id, name) VALUES (127, 22, 'Coquimbo');
//INSERT INTO city (id, country_id, name) VALUES (128, 6, 'Crdoba');
//INSERT INTO city (id, country_id, name) VALUES (129, 60, 'Cuauhtmoc');
//INSERT INTO city (id, country_id, name) VALUES (130, 60, 'Cuautla');
//INSERT INTO city (id, country_id, name) VALUES (131, 60, 'Cuernavaca');
//INSERT INTO city (id, country_id, name) VALUES (132, 104, 'Cuman');
//INSERT INTO city (id, country_id, name) VALUES (133, 76, 'Czestochowa');
//INSERT INTO city (id, country_id, name) VALUES (134, 72, 'Dadu');
//INSERT INTO city (id, country_id, name) VALUES (135, 103, 'Dallas');
//INSERT INTO city (id, country_id, name) VALUES (136, 23, 'Datong');
//INSERT INTO city (id, country_id, name) VALUES (137, 54, 'Daugavpils');
//INSERT INTO city (id, country_id, name) VALUES (138, 75, 'Davao');
//INSERT INTO city (id, country_id, name) VALUES (139, 23, 'Daxian');
//INSERT INTO city (id, country_id, name) VALUES (140, 103, 'Dayton');
//INSERT INTO city (id, country_id, name) VALUES (141, 69, 'Deba Habe');
//INSERT INTO city (id, country_id, name) VALUES (142, 97, 'Denizli');
//INSERT INTO city (id, country_id, name) VALUES (143, 12, 'Dhaka');
//INSERT INTO city (id, country_id, name) VALUES (144, 44, 'Dhule (Dhulia)');
//INSERT INTO city (id, country_id, name) VALUES (145, 23, 'Dongying');
//INSERT INTO city (id, country_id, name) VALUES (146, 87, 'Donostia-San Sebastin');
//INSERT INTO city (id, country_id, name) VALUES (147, 24, 'Dos Quebradas');
//INSERT INTO city (id, country_id, name) VALUES (148, 38, 'Duisburg');
//INSERT INTO city (id, country_id, name) VALUES (149, 102, 'Dundee');
//INSERT INTO city (id, country_id, name) VALUES (150, 80, 'Dzerzinsk');
//INSERT INTO city (id, country_id, name) VALUES (151, 67, 'Ede');
//INSERT INTO city (id, country_id, name) VALUES (152, 69, 'Effon-Alaiye');
//INSERT INTO city (id, country_id, name) VALUES (153, 14, 'El Alto');
//INSERT INTO city (id, country_id, name) VALUES (154, 60, 'El Fuerte');
//INSERT INTO city (id, country_id, name) VALUES (155, 103, 'El Monte');
//INSERT INTO city (id, country_id, name) VALUES (156, 80, 'Elista');
//INSERT INTO city (id, country_id, name) VALUES (157, 23, 'Emeishan');
//INSERT INTO city (id, country_id, name) VALUES (158, 67, 'Emmen');
//INSERT INTO city (id, country_id, name) VALUES (159, 23, 'Enshi');
//INSERT INTO city (id, country_id, name) VALUES (160, 38, 'Erlangen');
//INSERT INTO city (id, country_id, name) VALUES (161, 6, 'Escobar');
//INSERT INTO city (id, country_id, name) VALUES (162, 46, 'Esfahan');
//INSERT INTO city (id, country_id, name) VALUES (163, 97, 'Eskisehir');
//INSERT INTO city (id, country_id, name) VALUES (164, 44, 'Etawah');
//INSERT INTO city (id, country_id, name) VALUES (165, 6, 'Ezeiza');
//INSERT INTO city (id, country_id, name) VALUES (166, 23, 'Ezhou');
//INSERT INTO city (id, country_id, name) VALUES (167, 36, 'Faaa');
//INSERT INTO city (id, country_id, name) VALUES (168, 92, 'Fengshan');
//INSERT INTO city (id, country_id, name) VALUES (169, 44, 'Firozabad');
//INSERT INTO city (id, country_id, name) VALUES (170, 24, 'Florencia');
//INSERT INTO city (id, country_id, name) VALUES (171, 103, 'Fontana');
//INSERT INTO city (id, country_id, name) VALUES (172, 50, 'Fukuyama');
//INSERT INTO city (id, country_id, name) VALUES (173, 99, 'Funafuti');
//INSERT INTO city (id, country_id, name) VALUES (174, 23, 'Fuyu');
//INSERT INTO city (id, country_id, name) VALUES (175, 23, 'Fuzhou');
//INSERT INTO city (id, country_id, name) VALUES (176, 44, 'Gandhinagar');
//INSERT INTO city (id, country_id, name) VALUES (177, 103, 'Garden Grove');
//INSERT INTO city (id, country_id, name) VALUES (178, 103, 'Garland');
//INSERT INTO city (id, country_id, name) VALUES (179, 20, 'Gatineau');
//INSERT INTO city (id, country_id, name) VALUES (180, 97, 'Gaziantep');
//INSERT INTO city (id, country_id, name) VALUES (181, 87, 'Gijn');
//INSERT INTO city (id, country_id, name) VALUES (182, 75, 'Gingoog');
//INSERT INTO city (id, country_id, name) VALUES (183, 15, 'Goinia');
//INSERT INTO city (id, country_id, name) VALUES (184, 45, 'Gorontalo');
//INSERT INTO city (id, country_id, name) VALUES (185, 103, 'Grand Prairie');
//INSERT INTO city (id, country_id, name) VALUES (186, 9, 'Graz');
//INSERT INTO city (id, country_id, name) VALUES (187, 103, 'Greensboro');
//INSERT INTO city (id, country_id, name) VALUES (188, 60, 'Guadalajara');
//INSERT INTO city (id, country_id, name) VALUES (189, 15, 'Guaruj');
//INSERT INTO city (id, country_id, name) VALUES (190, 15, 'guas Lindas de Gois');
//INSERT INTO city (id, country_id, name) VALUES (191, 44, 'Gulbarga');
//INSERT INTO city (id, country_id, name) VALUES (192, 75, 'Hagonoy');
//INSERT INTO city (id, country_id, name) VALUES (193, 23, 'Haining');
//INSERT INTO city (id, country_id, name) VALUES (194, 105, 'Haiphong');
//INSERT INTO city (id, country_id, name) VALUES (195, 44, 'Haldia');
//INSERT INTO city (id, country_id, name) VALUES (196, 20, 'Halifax');
//INSERT INTO city (id, country_id, name) VALUES (197, 44, 'Halisahar');
//INSERT INTO city (id, country_id, name) VALUES (198, 38, 'Halle/Saale');
//INSERT INTO city (id, country_id, name) VALUES (199, 23, 'Hami');
//INSERT INTO city (id, country_id, name) VALUES (200, 68, 'Hamilton');
//INSERT INTO city (id, country_id, name) VALUES (201, 105, 'Hanoi');
//INSERT INTO city (id, country_id, name) VALUES (202, 60, 'Hidalgo');
//INSERT INTO city (id, country_id, name) VALUES (203, 50, 'Higashiosaka');
//INSERT INTO city (id, country_id, name) VALUES (204, 50, 'Hino');
//INSERT INTO city (id, country_id, name) VALUES (205, 50, 'Hiroshima');
//INSERT INTO city (id, country_id, name) VALUES (206, 107, 'Hodeida');
//INSERT INTO city (id, country_id, name) VALUES (207, 23, 'Hohhot');
//INSERT INTO city (id, country_id, name) VALUES (208, 44, 'Hoshiarpur');
//INSERT INTO city (id, country_id, name) VALUES (209, 92, 'Hsichuh');
//INSERT INTO city (id, country_id, name) VALUES (210, 23, 'Huaian');
//INSERT INTO city (id, country_id, name) VALUES (211, 44, 'Hubli-Dharwad');
//INSERT INTO city (id, country_id, name) VALUES (212, 60, 'Huejutla de Reyes');
//INSERT INTO city (id, country_id, name) VALUES (213, 60, 'Huixquilucan');
//INSERT INTO city (id, country_id, name) VALUES (214, 74, 'Hunuco');
//INSERT INTO city (id, country_id, name) VALUES (215, 15, 'Ibirit');
//INSERT INTO city (id, country_id, name) VALUES (216, 29, 'Idfu');
//INSERT INTO city (id, country_id, name) VALUES (217, 69, 'Ife');
//INSERT INTO city (id, country_id, name) VALUES (218, 69, 'Ikerre');
//INSERT INTO city (id, country_id, name) VALUES (219, 75, 'Iligan');
//INSERT INTO city (id, country_id, name) VALUES (220, 69, 'Ilorin');
//INSERT INTO city (id, country_id, name) VALUES (221, 75, 'Imus');
//INSERT INTO city (id, country_id, name) VALUES (222, 97, 'Inegl');
//INSERT INTO city (id, country_id, name) VALUES (223, 59, 'Ipoh');
//INSERT INTO city (id, country_id, name) VALUES (224, 50, 'Isesaki');
//INSERT INTO city (id, country_id, name) VALUES (225, 80, 'Ivanovo');
//INSERT INTO city (id, country_id, name) VALUES (226, 50, 'Iwaki');
//INSERT INTO city (id, country_id, name) VALUES (227, 50, 'Iwakuni');
//INSERT INTO city (id, country_id, name) VALUES (228, 50, 'Iwatsuki');
//INSERT INTO city (id, country_id, name) VALUES (229, 50, 'Izumisano');
//INSERT INTO city (id, country_id, name) VALUES (230, 88, 'Jaffna');
//INSERT INTO city (id, country_id, name) VALUES (231, 44, 'Jaipur');
//INSERT INTO city (id, country_id, name) VALUES (232, 45, 'Jakarta');
//INSERT INTO city (id, country_id, name) VALUES (233, 53, 'Jalib al-Shuyukh');
//INSERT INTO city (id, country_id, name) VALUES (234, 12, 'Jamalpur');
//INSERT INTO city (id, country_id, name) VALUES (235, 80, 'Jaroslavl');
//INSERT INTO city (id, country_id, name) VALUES (236, 76, 'Jastrzebie-Zdrj');
//INSERT INTO city (id, country_id, name) VALUES (237, 82, 'Jedda');
//INSERT INTO city (id, country_id, name) VALUES (238, 80, 'Jelets');
//INSERT INTO city (id, country_id, name) VALUES (239, 44, 'Jhansi');
//INSERT INTO city (id, country_id, name) VALUES (240, 23, 'Jinchang');
//INSERT INTO city (id, country_id, name) VALUES (241, 23, 'Jining');
//INSERT INTO city (id, country_id, name) VALUES (242, 23, 'Jinzhou');
//INSERT INTO city (id, country_id, name) VALUES (243, 44, 'Jodhpur');
//INSERT INTO city (id, country_id, name) VALUES (244, 85, 'Johannesburg');
//INSERT INTO city (id, country_id, name) VALUES (245, 103, 'Joliet');
//INSERT INTO city (id, country_id, name) VALUES (246, 60, 'Jos Azueta');
//INSERT INTO city (id, country_id, name) VALUES (247, 15, 'Juazeiro do Norte');
//INSERT INTO city (id, country_id, name) VALUES (248, 15, 'Juiz de Fora');
//INSERT INTO city (id, country_id, name) VALUES (249, 23, 'Junan');
//INSERT INTO city (id, country_id, name) VALUES (250, 60, 'Jurez');
//INSERT INTO city (id, country_id, name) VALUES (251, 1, 'Kabul');
//INSERT INTO city (id, country_id, name) VALUES (252, 69, 'Kaduna');
//INSERT INTO city (id, country_id, name) VALUES (253, 50, 'Kakamigahara');
//INSERT INTO city (id, country_id, name) VALUES (254, 80, 'Kaliningrad');
//INSERT INTO city (id, country_id, name) VALUES (255, 76, 'Kalisz');
//INSERT INTO city (id, country_id, name) VALUES (256, 50, 'Kamakura');
//INSERT INTO city (id, country_id, name) VALUES (257, 44, 'Kamarhati');
//INSERT INTO city (id, country_id, name) VALUES (258, 100, 'Kamjanets-Podilskyi');
//INSERT INTO city (id, country_id, name) VALUES (259, 80, 'Kamyin');
//INSERT INTO city (id, country_id, name) VALUES (260, 50, 'Kanazawa');
//INSERT INTO city (id, country_id, name) VALUES (261, 44, 'Kanchrapara');
//INSERT INTO city (id, country_id, name) VALUES (262, 103, 'Kansas City');
//INSERT INTO city (id, country_id, name) VALUES (263, 44, 'Karnal');
//INSERT INTO city (id, country_id, name) VALUES (264, 44, 'Katihar');
//INSERT INTO city (id, country_id, name) VALUES (265, 46, 'Kermanshah');
//INSERT INTO city (id, country_id, name) VALUES (266, 97, 'Kilis');
//INSERT INTO city (id, country_id, name) VALUES (267, 85, 'Kimberley');
//INSERT INTO city (id, country_id, name) VALUES (268, 86, 'Kimchon');
//INSERT INTO city (id, country_id, name) VALUES (269, 81, 'Kingstown');
//INSERT INTO city (id, country_id, name) VALUES (270, 80, 'Kirovo-Tepetsk');
//INSERT INTO city (id, country_id, name) VALUES (271, 52, 'Kisumu');
//INSERT INTO city (id, country_id, name) VALUES (272, 109, 'Kitwe');
//INSERT INTO city (id, country_id, name) VALUES (273, 85, 'Klerksdorp');
//INSERT INTO city (id, country_id, name) VALUES (274, 80, 'Kolpino');
//INSERT INTO city (id, country_id, name) VALUES (275, 100, 'Konotop');
//INSERT INTO city (id, country_id, name) VALUES (276, 50, 'Koriyama');
//INSERT INTO city (id, country_id, name) VALUES (277, 23, 'Korla');
//INSERT INTO city (id, country_id, name) VALUES (278, 80, 'Korolev');
//INSERT INTO city (id, country_id, name) VALUES (279, 42, 'Kowloon and New Kowloon');
//INSERT INTO city (id, country_id, name) VALUES (280, 108, 'Kragujevac');
//INSERT INTO city (id, country_id, name) VALUES (281, 97, 'Ktahya');
//INSERT INTO city (id, country_id, name) VALUES (282, 59, 'Kuching');
//INSERT INTO city (id, country_id, name) VALUES (283, 44, 'Kumbakonam');
//INSERT INTO city (id, country_id, name) VALUES (284, 50, 'Kurashiki');
//INSERT INTO city (id, country_id, name) VALUES (285, 80, 'Kurgan');
//INSERT INTO city (id, country_id, name) VALUES (286, 80, 'Kursk');
//INSERT INTO city (id, country_id, name) VALUES (287, 50, 'Kuwana');
//INSERT INTO city (id, country_id, name) VALUES (288, 60, 'La Paz');
//INSERT INTO city (id, country_id, name) VALUES (289, 6, 'La Plata');
//INSERT INTO city (id, country_id, name) VALUES (290, 27, 'La Romana');
//INSERT INTO city (id, country_id, name) VALUES (291, 23, 'Laiwu');
//INSERT INTO city (id, country_id, name) VALUES (292, 103, 'Lancaster');
//INSERT INTO city (id, country_id, name) VALUES (293, 23, 'Laohekou');
//INSERT INTO city (id, country_id, name) VALUES (294, 75, 'Lapu-Lapu');
//INSERT INTO city (id, country_id, name) VALUES (295, 103, 'Laredo');
//INSERT INTO city (id, country_id, name) VALUES (296, 91, 'Lausanne');
//INSERT INTO city (id, country_id, name) VALUES (297, 34, 'Le Mans');
//INSERT INTO city (id, country_id, name) VALUES (298, 23, 'Lengshuijiang');
//INSERT INTO city (id, country_id, name) VALUES (299, 23, 'Leshan');
//INSERT INTO city (id, country_id, name) VALUES (300, 20, 'Lethbridge');
//INSERT INTO city (id, country_id, name) VALUES (301, 45, 'Lhokseumawe');
//INSERT INTO city (id, country_id, name) VALUES (302, 23, 'Liaocheng');
//INSERT INTO city (id, country_id, name) VALUES (303, 54, 'Liepaja');
//INSERT INTO city (id, country_id, name) VALUES (304, 58, 'Lilongwe');
//INSERT INTO city (id, country_id, name) VALUES (305, 74, 'Lima');
//INSERT INTO city (id, country_id, name) VALUES (306, 103, 'Lincoln');
//INSERT INTO city (id, country_id, name) VALUES (307, 9, 'Linz');
//INSERT INTO city (id, country_id, name) VALUES (308, 80, 'Lipetsk');
//INSERT INTO city (id, country_id, name) VALUES (309, 49, 'Livorno');
//INSERT INTO city (id, country_id, name) VALUES (310, 80, 'Ljubertsy');
//INSERT INTO city (id, country_id, name) VALUES (311, 28, 'Loja');
//INSERT INTO city (id, country_id, name) VALUES (312, 102, 'London');
//INSERT INTO city (id, country_id, name) VALUES (313, 20, 'London');
//INSERT INTO city (id, country_id, name) VALUES (314, 76, 'Lublin');
//INSERT INTO city (id, country_id, name) VALUES (315, 25, 'Lubumbashi');
//INSERT INTO city (id, country_id, name) VALUES (316, 92, 'Lungtan');
//INSERT INTO city (id, country_id, name) VALUES (317, 15, 'Luzinia');
//INSERT INTO city (id, country_id, name) VALUES (318, 45, 'Madiun');
//INSERT INTO city (id, country_id, name) VALUES (319, 57, 'Mahajanga');
//INSERT INTO city (id, country_id, name) VALUES (320, 80, 'Maikop');
//INSERT INTO city (id, country_id, name) VALUES (321, 90, 'Malm');
//INSERT INTO city (id, country_id, name) VALUES (322, 103, 'Manchester');
//INSERT INTO city (id, country_id, name) VALUES (323, 75, 'Mandaluyong');
//INSERT INTO city (id, country_id, name) VALUES (324, 72, 'Mandi Bahauddin');
//INSERT INTO city (id, country_id, name) VALUES (325, 38, 'Mannheim');
//INSERT INTO city (id, country_id, name) VALUES (326, 104, 'Maracabo');
//INSERT INTO city (id, country_id, name) VALUES (327, 72, 'Mardan');
//INSERT INTO city (id, country_id, name) VALUES (328, 15, 'Maring');
//INSERT INTO city (id, country_id, name) VALUES (329, 71, 'Masqat');
//INSERT INTO city (id, country_id, name) VALUES (330, 60, 'Matamoros');
//INSERT INTO city (id, country_id, name) VALUES (331, 50, 'Matsue');
//INSERT INTO city (id, country_id, name) VALUES (332, 23, 'Meixian');
//INSERT INTO city (id, country_id, name) VALUES (333, 103, 'Memphis');
//INSERT INTO city (id, country_id, name) VALUES (334, 6, 'Merlo');
//INSERT INTO city (id, country_id, name) VALUES (335, 60, 'Mexicali');
//INSERT INTO city (id, country_id, name) VALUES (336, 44, 'Miraj');
//INSERT INTO city (id, country_id, name) VALUES (337, 29, 'Mit Ghamr');
//INSERT INTO city (id, country_id, name) VALUES (338, 50, 'Miyakonojo');
//INSERT INTO city (id, country_id, name) VALUES (339, 13, 'Mogiljov');
//INSERT INTO city (id, country_id, name) VALUES (340, 13, 'Molodetno');
//INSERT INTO city (id, country_id, name) VALUES (341, 60, 'Monclova');
//INSERT INTO city (id, country_id, name) VALUES (342, 64, 'Monywa');
//INSERT INTO city (id, country_id, name) VALUES (343, 80, 'Moscow');
//INSERT INTO city (id, country_id, name) VALUES (344, 47, 'Mosul');
//INSERT INTO city (id, country_id, name) VALUES (345, 100, 'Mukateve');
//INSERT INTO city (id, country_id, name) VALUES (346, 44, 'Munger (Monghyr)');
//INSERT INTO city (id, country_id, name) VALUES (347, 93, 'Mwanza');
//INSERT INTO city (id, country_id, name) VALUES (348, 25, 'Mwene-Ditu');
//INSERT INTO city (id, country_id, name) VALUES (349, 64, 'Myingyan');
//INSERT INTO city (id, country_id, name) VALUES (350, 44, 'Mysore');
//INSERT INTO city (id, country_id, name) VALUES (351, 63, 'Naala-Porto');
//INSERT INTO city (id, country_id, name) VALUES (352, 80, 'Nabereznyje Telny');
//INSERT INTO city (id, country_id, name) VALUES (353, 62, 'Nador');
//INSERT INTO city (id, country_id, name) VALUES (354, 44, 'Nagaon');
//INSERT INTO city (id, country_id, name) VALUES (355, 50, 'Nagareyama');
//INSERT INTO city (id, country_id, name) VALUES (356, 46, 'Najafabad');
//INSERT INTO city (id, country_id, name) VALUES (357, 86, 'Naju');
//INSERT INTO city (id, country_id, name) VALUES (358, 94, 'Nakhon Sawan');
//INSERT INTO city (id, country_id, name) VALUES (359, 105, 'Nam Dinh');
//INSERT INTO city (id, country_id, name) VALUES (360, 4, 'Namibe');
//INSERT INTO city (id, country_id, name) VALUES (361, 92, 'Nantou');
//INSERT INTO city (id, country_id, name) VALUES (362, 23, 'Nanyang');
//INSERT INTO city (id, country_id, name) VALUES (363, 21, 'NDjamna');
//INSERT INTO city (id, country_id, name) VALUES (364, 85, 'Newcastle');
//INSERT INTO city (id, country_id, name) VALUES (365, 60, 'Nezahualcyotl');
//INSERT INTO city (id, country_id, name) VALUES (366, 105, 'Nha Trang');
//INSERT INTO city (id, country_id, name) VALUES (367, 80, 'Niznekamsk');
//INSERT INTO city (id, country_id, name) VALUES (368, 108, 'Novi Sad');
//INSERT INTO city (id, country_id, name) VALUES (369, 80, 'Novoterkassk');
//INSERT INTO city (id, country_id, name) VALUES (370, 95, 'Nukualofa');
//INSERT INTO city (id, country_id, name) VALUES (371, 40, 'Nuuk');
//INSERT INTO city (id, country_id, name) VALUES (372, 52, 'Nyeri');
//INSERT INTO city (id, country_id, name) VALUES (373, 104, 'Ocumare del Tuy');
//INSERT INTO city (id, country_id, name) VALUES (374, 69, 'Ogbomosho');
//INSERT INTO city (id, country_id, name) VALUES (375, 72, 'Okara');
//INSERT INTO city (id, country_id, name) VALUES (376, 50, 'Okayama');
//INSERT INTO city (id, country_id, name) VALUES (377, 50, 'Okinawa');
//INSERT INTO city (id, country_id, name) VALUES (378, 26, 'Olomouc');
//INSERT INTO city (id, country_id, name) VALUES (379, 89, 'Omdurman');
//INSERT INTO city (id, country_id, name) VALUES (380, 50, 'Omiya');
//INSERT INTO city (id, country_id, name) VALUES (381, 69, 'Ondo');
//INSERT INTO city (id, country_id, name) VALUES (382, 50, 'Onomichi');
//INSERT INTO city (id, country_id, name) VALUES (383, 20, 'Oshawa');
//INSERT INTO city (id, country_id, name) VALUES (384, 97, 'Osmaniye');
//INSERT INTO city (id, country_id, name) VALUES (385, 100, 'ostka');
//INSERT INTO city (id, country_id, name) VALUES (386, 50, 'Otsu');
//INSERT INTO city (id, country_id, name) VALUES (387, 33, 'Oulu');
//INSERT INTO city (id, country_id, name) VALUES (388, 87, 'Ourense (Orense)');
//INSERT INTO city (id, country_id, name) VALUES (389, 69, 'Owo');
//INSERT INTO city (id, country_id, name) VALUES (390, 69, 'Oyo');
//INSERT INTO city (id, country_id, name) VALUES (391, 75, 'Ozamis');
//INSERT INTO city (id, country_id, name) VALUES (392, 85, 'Paarl');
//INSERT INTO city (id, country_id, name) VALUES (393, 60, 'Pachuca de Soto');
//INSERT INTO city (id, country_id, name) VALUES (394, 94, 'Pak Kret');
//INSERT INTO city (id, country_id, name) VALUES (395, 44, 'Palghat (Palakkad)');
//INSERT INTO city (id, country_id, name) VALUES (396, 45, 'Pangkal Pinang');
//INSERT INTO city (id, country_id, name) VALUES (397, 36, 'Papeete');
//INSERT INTO city (id, country_id, name) VALUES (398, 44, 'Parbhani');
//INSERT INTO city (id, country_id, name) VALUES (399, 44, 'Pathankot');
//INSERT INTO city (id, country_id, name) VALUES (400, 44, 'Patiala');
//INSERT INTO city (id, country_id, name) VALUES (401, 39, 'Patras');
//INSERT INTO city (id, country_id, name) VALUES (402, 51, 'Pavlodar');
//INSERT INTO city (id, country_id, name) VALUES (403, 45, 'Pemalang');
//INSERT INTO city (id, country_id, name) VALUES (404, 103, 'Peoria');
//INSERT INTO city (id, country_id, name) VALUES (405, 24, 'Pereira');
//INSERT INTO city (id, country_id, name) VALUES (406, 18, 'Phnom Penh');
//INSERT INTO city (id, country_id, name) VALUES (407, 23, 'Pingxiang');
//INSERT INTO city (id, country_id, name) VALUES (408, 80, 'Pjatigorsk');
//INSERT INTO city (id, country_id, name) VALUES (409, 76, 'Plock');
//INSERT INTO city (id, country_id, name) VALUES (410, 15, 'Po');
//INSERT INTO city (id, country_id, name) VALUES (411, 77, 'Ponce');
//INSERT INTO city (id, country_id, name) VALUES (412, 45, 'Pontianak');
//INSERT INTO city (id, country_id, name) VALUES (413, 15, 'Poos de Caldas');
//INSERT INTO city (id, country_id, name) VALUES (414, 28, 'Portoviejo');
//INSERT INTO city (id, country_id, name) VALUES (415, 45, 'Probolinggo');
//INSERT INTO city (id, country_id, name) VALUES (416, 44, 'Pudukkottai');
//INSERT INTO city (id, country_id, name) VALUES (417, 44, 'Pune');
//INSERT INTO city (id, country_id, name) VALUES (418, 44, 'Purnea (Purnia)');
//INSERT INTO city (id, country_id, name) VALUES (419, 45, 'Purwakarta');
//INSERT INTO city (id, country_id, name) VALUES (420, 70, 'Pyongyang');
//INSERT INTO city (id, country_id, name) VALUES (421, 29, 'Qalyub');
//INSERT INTO city (id, country_id, name) VALUES (422, 23, 'Qinhuangdao');
//INSERT INTO city (id, country_id, name) VALUES (423, 46, 'Qomsheh');
//INSERT INTO city (id, country_id, name) VALUES (424, 6, 'Quilmes');
//INSERT INTO city (id, country_id, name) VALUES (425, 44, 'Rae Bareli');
//INSERT INTO city (id, country_id, name) VALUES (426, 44, 'Rajkot');
//INSERT INTO city (id, country_id, name) VALUES (427, 44, 'Rampur');
//INSERT INTO city (id, country_id, name) VALUES (428, 22, 'Rancagua');
//INSERT INTO city (id, country_id, name) VALUES (429, 44, 'Ranchi');
//INSERT INTO city (id, country_id, name) VALUES (430, 20, 'Richmond Hill');
//INSERT INTO city (id, country_id, name) VALUES (431, 15, 'Rio Claro');
//INSERT INTO city (id, country_id, name) VALUES (432, 23, 'Rizhao');
//INSERT INTO city (id, country_id, name) VALUES (433, 103, 'Roanoke');
//INSERT INTO city (id, country_id, name) VALUES (434, 28, 'Robamba');
//INSERT INTO city (id, country_id, name) VALUES (435, 103, 'Rockford');
//INSERT INTO city (id, country_id, name) VALUES (436, 17, 'Ruse');
//INSERT INTO city (id, country_id, name) VALUES (437, 85, 'Rustenburg');
//INSERT INTO city (id, country_id, name) VALUES (438, 67, 's-Hertogenbosch');
//INSERT INTO city (id, country_id, name) VALUES (439, 38, 'Saarbrcken');
//INSERT INTO city (id, country_id, name) VALUES (440, 50, 'Sagamihara');
//INSERT INTO city (id, country_id, name) VALUES (441, 103, 'Saint Louis');
//INSERT INTO city (id, country_id, name) VALUES (442, 79, 'Saint-Denis');
//INSERT INTO city (id, country_id, name) VALUES (443, 62, 'Sal');
//INSERT INTO city (id, country_id, name) VALUES (444, 71, 'Salala');
//INSERT INTO city (id, country_id, name) VALUES (445, 60, 'Salamanca');
//INSERT INTO city (id, country_id, name) VALUES (446, 103, 'Salinas');
//INSERT INTO city (id, country_id, name) VALUES (447, 9, 'Salzburg');
//INSERT INTO city (id, country_id, name) VALUES (448, 44, 'Sambhal');
//INSERT INTO city (id, country_id, name) VALUES (449, 103, 'San Bernardino');
//INSERT INTO city (id, country_id, name) VALUES (450, 27, 'San Felipe de Puerto Plata');
//INSERT INTO city (id, country_id, name) VALUES (451, 60, 'San Felipe del Progreso');
//INSERT INTO city (id, country_id, name) VALUES (452, 60, 'San Juan Bautista Tuxtepec');
//INSERT INTO city (id, country_id, name) VALUES (453, 73, 'San Lorenzo');
//INSERT INTO city (id, country_id, name) VALUES (454, 6, 'San Miguel de Tucumn');
//INSERT INTO city (id, country_id, name) VALUES (455, 107, 'Sanaa');
//INSERT INTO city (id, country_id, name) VALUES (456, 15, 'Santa Brbara dOeste');
//INSERT INTO city (id, country_id, name) VALUES (457, 6, 'Santa F');
//INSERT INTO city (id, country_id, name) VALUES (458, 75, 'Santa Rosa');
//INSERT INTO city (id, country_id, name) VALUES (459, 87, 'Santiago de Compostela');
//INSERT INTO city (id, country_id, name) VALUES (460, 27, 'Santiago de los Caballeros');
//INSERT INTO city (id, country_id, name) VALUES (461, 15, 'Santo Andr');
//INSERT INTO city (id, country_id, name) VALUES (462, 23, 'Sanya');
//INSERT INTO city (id, country_id, name) VALUES (463, 50, 'Sasebo');
//INSERT INTO city (id, country_id, name) VALUES (464, 44, 'Satna');
//INSERT INTO city (id, country_id, name) VALUES (465, 29, 'Sawhaj');
//INSERT INTO city (id, country_id, name) VALUES (466, 80, 'Serpuhov');
//INSERT INTO city (id, country_id, name) VALUES (467, 46, 'Shahr-e Kord');
//INSERT INTO city (id, country_id, name) VALUES (468, 23, 'Shanwei');
//INSERT INTO city (id, country_id, name) VALUES (469, 23, 'Shaoguan');
//INSERT INTO city (id, country_id, name) VALUES (470, 101, 'Sharja');
//INSERT INTO city (id, country_id, name) VALUES (471, 23, 'Shenzhen');
//INSERT INTO city (id, country_id, name) VALUES (472, 72, 'Shikarpur');
//INSERT INTO city (id, country_id, name) VALUES (473, 44, 'Shimoga');
//INSERT INTO city (id, country_id, name) VALUES (474, 50, 'Shimonoseki');
//INSERT INTO city (id, country_id, name) VALUES (475, 44, 'Shivapuri');
//INSERT INTO city (id, country_id, name) VALUES (476, 29, 'Shubra al-Khayma');
//INSERT INTO city (id, country_id, name) VALUES (477, 38, 'Siegen');
//INSERT INTO city (id, country_id, name) VALUES (478, 44, 'Siliguri (Shiliguri)');
//INSERT INTO city (id, country_id, name) VALUES (479, 100, 'Simferopol');
//INSERT INTO city (id, country_id, name) VALUES (480, 24, 'Sincelejo');
//INSERT INTO city (id, country_id, name) VALUES (481, 46, 'Sirjan');
//INSERT INTO city (id, country_id, name) VALUES (482, 97, 'Sivas');
//INSERT INTO city (id, country_id, name) VALUES (483, 2, 'Skikda');
//INSERT INTO city (id, country_id, name) VALUES (484, 80, 'Smolensk');
//INSERT INTO city (id, country_id, name) VALUES (485, 15, 'So Bernardo do Campo');
//INSERT INTO city (id, country_id, name) VALUES (486, 15, 'So Leopoldo');
//INSERT INTO city (id, country_id, name) VALUES (487, 24, 'Sogamoso');
//INSERT INTO city (id, country_id, name) VALUES (488, 69, 'Sokoto');
//INSERT INTO city (id, country_id, name) VALUES (489, 94, 'Songkhla');
//INSERT INTO city (id, country_id, name) VALUES (490, 15, 'Sorocaba');
//INSERT INTO city (id, country_id, name) VALUES (491, 85, 'Soshanguve');
//INSERT INTO city (id, country_id, name) VALUES (492, 96, 'Sousse');
//INSERT INTO city (id, country_id, name) VALUES (493, 5, 'South Hill');
//INSERT INTO city (id, country_id, name) VALUES (494, 102, 'Southampton');
//INSERT INTO city (id, country_id, name) VALUES (495, 102, 'Southend-on-Sea');
//INSERT INTO city (id, country_id, name) VALUES (496, 102, 'Southport');
//INSERT INTO city (id, country_id, name) VALUES (497, 85, 'Springs');
//INSERT INTO city (id, country_id, name) VALUES (498, 17, 'Stara Zagora');
//INSERT INTO city (id, country_id, name) VALUES (499, 103, 'Sterling Heights');
//INSERT INTO city (id, country_id, name) VALUES (500, 102, 'Stockport');
//INSERT INTO city (id, country_id, name) VALUES (501, 14, 'Sucre');
//INSERT INTO city (id, country_id, name) VALUES (502, 23, 'Suihua');
//INSERT INTO city (id, country_id, name) VALUES (503, 74, 'Sullana');
//INSERT INTO city (id, country_id, name) VALUES (504, 97, 'Sultanbeyli');
//INSERT INTO city (id, country_id, name) VALUES (505, 10, 'Sumqayit');
//INSERT INTO city (id, country_id, name) VALUES (506, 100, 'Sumy');
//INSERT INTO city (id, country_id, name) VALUES (507, 59, 'Sungai Petani');
//INSERT INTO city (id, country_id, name) VALUES (508, 103, 'Sunnyvale');
//INSERT INTO city (id, country_id, name) VALUES (509, 45, 'Surakarta');
//INSERT INTO city (id, country_id, name) VALUES (510, 80, 'Syktyvkar');
//INSERT INTO city (id, country_id, name) VALUES (511, 49, 'Syrakusa');
//INSERT INTO city (id, country_id, name) VALUES (512, 43, 'Szkesfehrvr');
//INSERT INTO city (id, country_id, name) VALUES (513, 93, 'Tabora');
//INSERT INTO city (id, country_id, name) VALUES (514, 46, 'Tabriz');
//INSERT INTO city (id, country_id, name) VALUES (515, 82, 'Tabuk');
//INSERT INTO city (id, country_id, name) VALUES (516, 3, 'Tafuna');
//INSERT INTO city (id, country_id, name) VALUES (517, 75, 'Taguig');
//INSERT INTO city (id, country_id, name) VALUES (518, 107, 'Taizz');
//INSERT INTO city (id, country_id, name) VALUES (519, 75, 'Talavera');
//INSERT INTO city (id, country_id, name) VALUES (520, 103, 'Tallahassee');
//INSERT INTO city (id, country_id, name) VALUES (521, 50, 'Tama');
//INSERT INTO city (id, country_id, name) VALUES (522, 44, 'Tambaram');
//INSERT INTO city (id, country_id, name) VALUES (523, 75, 'Tanauan');
//INSERT INTO city (id, country_id, name) VALUES (524, 6, 'Tandil');
//INSERT INTO city (id, country_id, name) VALUES (525, 12, 'Tangail');
//INSERT INTO city (id, country_id, name) VALUES (526, 92, 'Tanshui');
//INSERT INTO city (id, country_id, name) VALUES (527, 75, 'Tanza');
//INSERT INTO city (id, country_id, name) VALUES (528, 75, 'Tarlac');
//INSERT INTO city (id, country_id, name) VALUES (529, 97, 'Tarsus');
//INSERT INTO city (id, country_id, name) VALUES (530, 30, 'Tartu');
//INSERT INTO city (id, country_id, name) VALUES (531, 80, 'Teboksary');
//INSERT INTO city (id, country_id, name) VALUES (532, 45, 'Tegal');
//INSERT INTO city (id, country_id, name) VALUES (533, 48, 'Tel Aviv-Jaffa');
//INSERT INTO city (id, country_id, name) VALUES (534, 63, 'Tete');
//INSERT INTO city (id, country_id, name) VALUES (535, 23, 'Tianjin');
//INSERT INTO city (id, country_id, name) VALUES (536, 23, 'Tiefa');
//INSERT INTO city (id, country_id, name) VALUES (537, 23, 'Tieli');
//INSERT INTO city (id, country_id, name) VALUES (538, 97, 'Tokat');
//INSERT INTO city (id, country_id, name) VALUES (539, 86, 'Tonghae');
//INSERT INTO city (id, country_id, name) VALUES (540, 23, 'Tongliao');
//INSERT INTO city (id, country_id, name) VALUES (541, 60, 'Torren');
//INSERT INTO city (id, country_id, name) VALUES (542, 92, 'Touliu');
//INSERT INTO city (id, country_id, name) VALUES (543, 34, 'Toulon');
//INSERT INTO city (id, country_id, name) VALUES (544, 34, 'Toulouse');
//INSERT INTO city (id, country_id, name) VALUES (545, 32, 'Trshavn');
//INSERT INTO city (id, country_id, name) VALUES (546, 92, 'Tsaotun');
//INSERT INTO city (id, country_id, name) VALUES (547, 50, 'Tsuyama');
//INSERT INTO city (id, country_id, name) VALUES (548, 75, 'Tuguegarao');
//INSERT INTO city (id, country_id, name) VALUES (549, 76, 'Tychy');
//INSERT INTO city (id, country_id, name) VALUES (550, 44, 'Udaipur');
//INSERT INTO city (id, country_id, name) VALUES (551, 49, 'Udine');
//INSERT INTO city (id, country_id, name) VALUES (552, 50, 'Ueda');
//INSERT INTO city (id, country_id, name) VALUES (553, 86, 'Uijongbu');
//INSERT INTO city (id, country_id, name) VALUES (554, 44, 'Uluberia');
//INSERT INTO city (id, country_id, name) VALUES (555, 50, 'Urawa');
//INSERT INTO city (id, country_id, name) VALUES (556, 60, 'Uruapan');
//INSERT INTO city (id, country_id, name) VALUES (557, 97, 'Usak');
//INSERT INTO city (id, country_id, name) VALUES (558, 80, 'Usolje-Sibirskoje');
//INSERT INTO city (id, country_id, name) VALUES (559, 44, 'Uttarpara-Kotrung');
//INSERT INTO city (id, country_id, name) VALUES (560, 55, 'Vaduz');
//INSERT INTO city (id, country_id, name) VALUES (561, 104, 'Valencia');
//INSERT INTO city (id, country_id, name) VALUES (562, 104, 'Valle de la Pascua');
//INSERT INTO city (id, country_id, name) VALUES (563, 60, 'Valle de Santiago');
//INSERT INTO city (id, country_id, name) VALUES (564, 44, 'Valparai');
//INSERT INTO city (id, country_id, name) VALUES (565, 20, 'Vancouver');
//INSERT INTO city (id, country_id, name) VALUES (566, 44, 'Varanasi (Benares)');
//INSERT INTO city (id, country_id, name) VALUES (567, 6, 'Vicente Lpez');
//INSERT INTO city (id, country_id, name) VALUES (568, 44, 'Vijayawada');
//INSERT INTO city (id, country_id, name) VALUES (569, 15, 'Vila Velha');
//INSERT INTO city (id, country_id, name) VALUES (570, 56, 'Vilnius');
//INSERT INTO city (id, country_id, name) VALUES (571, 105, 'Vinh');
//INSERT INTO city (id, country_id, name) VALUES (572, 15, 'Vitria de Santo Anto');
//INSERT INTO city (id, country_id, name) VALUES (573, 103, 'Warren');
//INSERT INTO city (id, country_id, name) VALUES (574, 23, 'Weifang');
//INSERT INTO city (id, country_id, name) VALUES (575, 38, 'Witten');
//INSERT INTO city (id, country_id, name) VALUES (576, 8, 'Woodridge');
//INSERT INTO city (id, country_id, name) VALUES (577, 76, 'Wroclaw');
//INSERT INTO city (id, country_id, name) VALUES (578, 23, 'Xiangfan');
//INSERT INTO city (id, country_id, name) VALUES (579, 23, 'Xiangtan');
//INSERT INTO city (id, country_id, name) VALUES (580, 23, 'Xintai');
//INSERT INTO city (id, country_id, name) VALUES (581, 23, 'Xinxiang');
//INSERT INTO city (id, country_id, name) VALUES (582, 44, 'Yamuna Nagar');
//INSERT INTO city (id, country_id, name) VALUES (583, 65, 'Yangor');
//INSERT INTO city (id, country_id, name) VALUES (584, 23, 'Yantai');
//INSERT INTO city (id, country_id, name) VALUES (585, 19, 'Yaound');
//INSERT INTO city (id, country_id, name) VALUES (586, 7, 'Yerevan');
//INSERT INTO city (id, country_id, name) VALUES (587, 23, 'Yinchuan');
//INSERT INTO city (id, country_id, name) VALUES (588, 23, 'Yingkou');
//INSERT INTO city (id, country_id, name) VALUES (589, 102, 'York');
//INSERT INTO city (id, country_id, name) VALUES (590, 23, 'Yuncheng');
//INSERT INTO city (id, country_id, name) VALUES (591, 23, 'Yuzhou');
//INSERT INTO city (id, country_id, name) VALUES (592, 23, 'Zalantun');
//INSERT INTO city (id, country_id, name) VALUES (593, 93, 'Zanzibar');
//INSERT INTO city (id, country_id, name) VALUES (594, 23, 'Zaoyang');
//INSERT INTO city (id, country_id, name) VALUES (595, 60, 'Zapopan');
//INSERT INTO city (id, country_id, name) VALUES (596, 69, 'Zaria');
//INSERT INTO city (id, country_id, name) VALUES (597, 80, 'Zeleznogorsk');
//INSERT INTO city (id, country_id, name) VALUES (598, 51, 'Zhezqazghan');
//INSERT INTO city (id, country_id, name) VALUES (599, 23, 'Zhoushan');
//INSERT INTO city (id, country_id, name) VALUES (600, 83, 'Ziguinchor');

//            ";
            //migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM city;", true);
            migrationBuilder.Sql("DELETE FROM country;", true);
        }
    }
}
