-- Teen Postgres tietokannan Dockerin avulla
-- Käynnistin containerin seuraavalla komennolla: docker run --name blogs-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
-- docker exec -it blogs-postgres psql -U postgres postgres

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    likes INT DEFAULT 0
);

INSERT INTO blogs (title, url, author, likes) VALUES
('Koodausblogi', 'https://koodausblogi.com', 'Matti Meikäläinen', 10),
('Tietokantaopas', 'https://tietokantaopas.com', 'Maija Meikäläinen', 5),
('Web-kehitys', 'https://webkehitys.com', 'Pekka Perusjätkä', 20);