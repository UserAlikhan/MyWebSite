Create database ReactWebSite;
Use ReactWebSite;

create table books
(
	id int not null AUTO_INCREMENT PRIMARY KEY,
    title varchar(45) not null,
    description varchar(255) not null, 
    cover_picture varchar(100) not null,
    price decimal(10, 2) not null,
    categorie varchar(250) not null,
    book_dir varchar(10000)
);
drop table user;
create table user
(
	id int not null AUTO_INCREMENT primary key,
    nameUser varchar(200) not null,
    email varchar(200) not null constraint check(email like '%@%'),
    password varchar(100) not null constraint check(char_length(password) > 5)
); 

select * from books;

select email, password from user where email="loluser@mail.com";

insert into books(title, description, cover_picture, price, categorie)
values ('English Grammar', 'THIS IS Emglish Grammer Book', 'https://m.media-amazon.com/images/I/715S4NQB1oL._AC_UF1000,1000_QL80_.jpg', 150, 'English');
 
select * from user;

SHOW VARIABLES LIKE 'secure_file_priv';

update books set file_data = to_base64(LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/TechStrim.pdf'))
WHERE id = 15;

ALTER TABLE books 
drop column file_name;

Alter table books
add book_dir varchar(10000);

ALTER TABLE books
DROP COLUMN price;

UPDATE `books` SET `price`=99.90 WHERE `price` is null;

SET SQL_SAFE_UPDATES = 0;

