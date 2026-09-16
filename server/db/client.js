import pg from "pg";

const db = new pg.Client(process.env.DATABASE_URL || "postgres://localhost/bell");
export default db;
