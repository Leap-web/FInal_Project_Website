const db = require("../config/database");

class Task {
    static async getAll(userId) {
        const [rows] = await db.query('SELECT * FROM task WHERE user_id = ?', [userId]);
        return rows;
    }

    static async create(data) {
        const { user_id, title, description, status, due_date } = data;
        const result = await db.query(
            "INSERT INTO task (user_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?)",
            [user_id, title, description, status, due_date]
        );
        return result;
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM task WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Task;