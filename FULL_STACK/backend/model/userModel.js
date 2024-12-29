const db = require("../config/database");

class User {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM user');
        return rows;
    }

    static async create(data) {
        const { name, email, password } = data;
        const result = await db.query("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", 
            [name, email, password]);
        return result;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
        return rows[0];
    }

    static async getByEmail(email) {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        return rows[0];
    }

    static async update(id, data) {
        const { name, email, password } = data;
        const result = await db.query('UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?', 
            [name, email, password, id]);
        return result;
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM user WHERE id = ?', [id]);
        return result;
    }
}

module.exports = User;