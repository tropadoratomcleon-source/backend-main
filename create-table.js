import { sql } from "./db.js"; // Importa a conexão com o banco de dados MySQL

const createTableQuery = `
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    date DATETIME,
    location VARCHAR(255),
    maxAttendees INT,
    attendeesCount INT DEFAULT 0
);
`; // Define a consulta SQL para criar a tabela "events" se ela não existir

// O mysql2 usa o método .query() que retorna uma Promise
sql.query(createTableQuery)
    .then(() => {
        console.log("Tabela 'events' criada ou já existente com sucesso no MySQL");
    })
    .catch((err) => {
        console.error("Erro ao criar a tabela no MySQL:");
        console.error(err.message);
    });
