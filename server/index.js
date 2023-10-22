const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
});

app.get("/records", (req, res) => {
    const q = "SELECT * FROM budget_records";
    connection.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.post("/records", (req, res) => {
    const q = "INSERT INTO budget_records (`date`, `title`, `direction`, `sum`) VALUES (?)"
    const {date, title, direction, sum} = req.body;
    const values = [date, title, direction, sum]
    connection.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
});

// app.delete("/records/:id", (req, res) => {
//     const recordId = req.params.record_id
//     const q = "DELETE FROM budget_records WHERE record_id = ?"
//     connection.query(q, [bookId], (err, data) => {
//         if (err) return res.json(err)
//         return res.json(data)
//     })
// });

// app.put("/records/:id", (req, res) => {
//     const {date, title, direction, sum} = req.body;
//     const record_id = req.params.record_id
//     const q = "UPDATE budget_records SET `date` = ?, `title` = ?, `direction` = ?, `sum` = ? WHERE record_id = ?";
//     const values = [date, title, direction, sum]
//     connection.query(q, [...values, record_id], (err, data) => {
//         if (err) return res.json(err)
//         return res.json(data)
//     })
// });

app.listen(process.env.NODE_PORT, () => console.log(`connected to ${process.env.NODE_PORT}`));
