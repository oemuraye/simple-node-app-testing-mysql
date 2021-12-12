const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log('Mysql db ' + connection.state)
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM `crud-test`";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return response
            // console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
          const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO `crud-test` (name, date) VALUES (?,?);";

            connection.query(query, [name, dateAdded], (err, result) => {
              if (err) reject(new Error(err.message));
              resolve(result);
            });
          });
        //   return response;
          console.log(insertId)
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = DbService;