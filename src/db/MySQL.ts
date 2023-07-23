import mysql, {Connection} from 'mysql2/promise';

const CREATE_USERS_TABLE_QUERY =
  `CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

const CREATE_TASKS_TABLE_QUERY =
  `CREATE TABLE IF NOT EXISTS Tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);`

export class MySQL {
  static connection: Connection;

  static init = async () => {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
    }

    await Promise.all([
      this.query(CREATE_USERS_TABLE_QUERY),
      this.query(CREATE_TASKS_TABLE_QUERY),
    ]);
  }

  static query = (sql: string, values?: Record<string, unknown>) => this.connection.query(sql, values);
}