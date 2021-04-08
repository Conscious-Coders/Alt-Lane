CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "photo_url" varchar
);

CREATE TABLE "career_field" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "information" varchar NOT NULL
);

CREATE TABLE "mentees" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "parent_name" varchar NOT NULL,
  "parent_email" varchar NOT NULL
);

CREATE TABLE "mentors" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "career_field" varchar NOT NULL,
  "bio" varchar,
  "linkedin_url" varchar NOT NULL,
  "company" varchar NOT NULL
);

CREATE TABLE "mentorship" (
  "mentors_id" int,
  "mentees_id" int,
  "PRIMARY" "KEY(mentors_id, mentees_id)"
);

CREATE TABLE "mentee_interests" (
  "mentees_id" int,
  "career_field" varchar,
  "PRIMARY" KEY(mentees_id,career_field)
);

ALTER TABLE "mentees" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "mentors" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "mentors" ADD FOREIGN KEY ("career_field") REFERENCES "career_field" ("name");

ALTER TABLE "mentorship" ADD FOREIGN KEY ("mentors_id") REFERENCES "mentees" ("id");

ALTER TABLE "mentorship" ADD FOREIGN KEY ("mentees_id") REFERENCES "mentors" ("id");

ALTER TABLE "mentee_interests" ADD FOREIGN KEY ("mentees_id") REFERENCES "mentees" ("id");

ALTER TABLE "mentee_interests" ADD FOREIGN KEY ("career_field") REFERENCES "career_field" ("name");
