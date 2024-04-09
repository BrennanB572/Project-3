CREATE TABLE "bs_entries" (
  "entry_id" INT PRIMARY KEY,
  "company_id" varchar(50),
  "company_code" varchar(3),
  "bs_year" int,
  "bs_quarter" int,
  "entry_label" varchar(30),
  "entry_concept" varchar(30),
  "entry_unit" varchar(3),
  "entry_amount" numeric
);
