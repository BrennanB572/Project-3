--Drop Table if exists
Drop Table "bs_entries";

--Create Tables
CREATE TABLE "bs_entries" (
  "index" INT PRIMARY KEY,
  "symbol" varchar(5),
  "quarter" varchar(2),
  "year" int,
  "entry_label" varchar(50),
  "entry_concept" varchar(100),
  "entry_unit" varchar(3),
  "entry_value" numeric
);


