-- library-psql/init.sql
-- CREATE USER postuser WITH PASSWORD 'postpassword';
-- GRANT ALL PRIVILEGES ON DATABASE library_service TO postuser;

\c library_service;

create table if not exists users (
    id serial primary key,
    email text not null,
    username text not null,
    password text not null,
    role varchar(50) not null default 'READER',
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    deleted_at timestamp
);

CREATE TABLE IF NOT EXISTS authors (
    id serial primary key,
    lastname text,
    firstname text,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    deleted_at timestamp
);

CREATE TABLE IF NOT EXISTS genres (
    id serial primary key,
    title text,
    descript integer,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    deleted_at timestamp
);

CREATE TABLE IF NOT EXISTS books (
    id serial primary key,
    title text not null,
    published_year integer,
    copies_available integer default 0,
    author_id integer,
    genre_id integer,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    deleted_at timestamp,

    CONSTRAINT fk_genres FOREIGN KEY (genre_id) REFERENCES genres(id),
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS borrowed_books (
    id serial primary key,
    borrow_date TIMESTAMP WITHOUT TIME ZONE,
    status text,
    book_id integer,
    user_id integer,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    deleted_at timestamp,

    CONSTRAINT fk_books FOREIGN KEY (book_id) REFERENCES books(id),
    CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS authorbooks (
    id serial primary key,
    author_id integer,
    book_id integer,

    CONSTRAINT fk_books FOREIGN KEY (book_id) REFERENCES books(id),
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS genrebook (
    id serial primary key,
    genre_id integer,
    book_id integer,

    CONSTRAINT fk_books FOREIGN KEY (book_id) REFERENCES books(id),
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genres(id)
);
