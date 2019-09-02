declare module 'mysql2/promise';
import { createPool } from "mysql2/promise";

export async function connect() {
    return await createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'chat_system',
        connectionLimit: 100
    });
}
