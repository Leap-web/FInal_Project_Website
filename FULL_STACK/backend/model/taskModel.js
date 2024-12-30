const db = require("../config/database");

class Task {
    static async getAll(userId) {
        const [rows] = await db.query('SELECT * FROM task WHERE user_id = ?', [userId]);
        return rows;
    }
    
    static async create(data) {
        const { user_id, title, description, status } = data;
        const result = await db.query("INSERT INTO task (user_id, title, description, status) VALUES (?, ?, ?, ?)", 
            [user_id, title, description, status]);
        return result; // This will return the result of the insert operation
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM task WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, data) {
        const { title, description, status } = data;
        const result = await db.query('UPDATE task SET title = ?, description = ?, status = ? WHERE id = ?', 
            [title, description, status, id]);
        return result;
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM task WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Task;