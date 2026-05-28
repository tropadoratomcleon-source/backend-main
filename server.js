import { fastify } from 'fastify';
import { DatabaseMYSQL } from './database-mysql.js';
import 'dotenv/config';
const { PORT } = process.env;

const server = fastify();

server.get('/', async () => {
  return { message: 'API server - Gestor de Eventos' };
});

const database = new DatabaseMYSQL();

// Criar evento
server.post("/events", async (request, reply) => {
    const { name, description, date, location, maxAttendees } = request.body;
    await database.create({ name, description, date, location, maxAttendees });
    return reply.status(201).send();
});

// Listar eventos
server.get("/events", async (request) => {
    const search = request.query.search;
    const events = await database.list(search);
    return events;
});

// Atualizar evento
server.put("/events/:id", async (request, reply) => {
    const eventId = request.params.id;
    const { name, description, date, location, maxAttendees } = request.body;
    await database.update(eventId, { name, description, date, location, maxAttendees });
    return reply.status(204).send();
});

// Excluir evento
server.delete("/events/:id", async (request, reply) => {
    const eventId = request.params.id;
    await database.delete(eventId);
    return reply.status(204).send();
});

// Inscrever participante
server.post("/events/:id/register", async (request, reply) => {
    const eventId = request.params.id;
    await database.registerAttendee(eventId);
    return reply.status(200).send({ message: 'Inscrição realizada com sucesso' });
});

// Cancelar inscrição
server.delete("/events/:id/register", async (request, reply) => {
    const eventId = request.params.id;
    await database.unregisterAttendee(eventId);
    return reply.status(200).send({ message: 'Inscrição cancelada com sucesso' });
});

server.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});






