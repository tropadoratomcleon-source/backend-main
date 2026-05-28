import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabaseMYSQL {

    async list(search) {
        let events;
        if (search) {
            [events] = await sql.execute(
                'SELECT * FROM events WHERE name LIKE ? OR location LIKE ?',
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [events] = await sql.execute('SELECT * FROM events');
        }
        return events;
    }

    async create(event) {
        const eventId = randomUUID();
        const { name, description, date, location, maxAttendees } = event;
        await sql.execute(
            'INSERT INTO events (id, name, description, date, location, maxAttendees) VALUES (?, ?, ?, ?, ?, ?)',
            [eventId, name, description, date, location, maxAttendees]
        );
        return eventId;
    }

    async update(id, event) {
        const { name, description, date, location, maxAttendees } = event;
        await sql.execute(
            'UPDATE events SET name = ?, description = ?, date = ?, location = ?, maxAttendees = ? WHERE id = ?',
            [name, description, date, location, maxAttendees, id]
        );
    }

    async delete(id) {
        await sql.execute('DELETE FROM events WHERE id = ?', [id]);
    }

    async registerAttendee(id) {
        await sql.execute(
            'UPDATE events SET attendeesCount = attendeesCount + 1 WHERE id = ? AND attendeesCount < maxAttendees',
            [id]
        );
    }

    async unregisterAttendee(id) {
        await sql.execute(
            'UPDATE events SET attendeesCount = attendeesCount - 1 WHERE id = ? AND attendeesCount > 0',
            [id]
        );
    }
}

