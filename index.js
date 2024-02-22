const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'amudha',
  database: 'student',
})

app.post('/createstudent', (req, res) => {
  const regno = req.body.regno
  const name = req.body.name
  const dob = req.body.dob
  const gender = req.body.gender
  const dept = req.body.dept
  const year = req.body.year
  const residence = req.body.residence
  const address = req.body.address

  db.query(
    'INSERT INTO studentregistration (regno,name,dob,gender,dept,year,residence,address) VALUES(?,?,?,?,?,?,?,?)',
    [regno, name, dob, gender, dept, year, residence, address],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('values are inserted')
      }
    }
  )
})

app.get('/getstudent', (req, res) => {
  db.query('SELECT * FROM studentregistration', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.delete('/deletestudent/:regno', (req, res) => {
  const regno = req.params.regno

  db.query(
    'DELETE FROM studentregistration WHERE regno = ?',
    [regno],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting student')
      } else {
        console.log('Student deleted successfully')
        res.status(200).send('Student deleted successfully')
      }
    }
  )
})

app.listen(5000, () => {
  console.log('backend working')
})
