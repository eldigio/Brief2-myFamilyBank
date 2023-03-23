drop table if exists users;

create table users(
  id integer not null primary key autoincrement,
  fullName varchar(255) not null default "",
  age smallint not null default 18 check (age >= 18) check (age < 100),
  gender char not null default ""
)