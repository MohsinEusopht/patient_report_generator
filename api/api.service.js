const pool = require("../config/database");
module.exports = {
    storeFile: (file_name, server_file_name) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(
                    `INSERT INTO documents(file_name, server_file_name) VALUES (?, ?)`, [file_name, server_file_name],
                    (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            return reject(error);
                        }
                        connection.release();
                        return resolve(results);
                    }
                );
            })
        })
    },
    getFiles: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(
                    `SELECT * FROM documents WHERE status = ?`, [1],
                    (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            return reject(error);
                        }
                        connection.release();
                        return resolve(results);
                    }
                );
            })
        })
    },
    getFileByID: (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(
                    `SELECT * FROM documents WHERE id = ?`, [id],
                    (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            return reject(error);
                        }
                        connection.release();
                        return resolve(results);
                    }
                );
            })
        })
    },
}