-- 1. Create Table User
CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT
);

-- 2. Insert some users
INSERT INTO Users (username, password) VALUES ('admin', 'admin123');
INSERT INTO Users (username, password) VALUES ('joao_silva', 'mudar123');