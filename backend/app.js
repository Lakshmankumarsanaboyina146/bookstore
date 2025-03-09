const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize server and database connection
const initializeDBAndServer = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database!");
    connection.release();

    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// Fetch all users

app.get("/register/", async (request, response) => {
  try {
    const getUsersQuery = `SELECT * FROM registration`;
    const [users] = await pool.query(getUsersQuery);
    response.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    response
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const getUserQuery = `SELECT * FROM registration WHERE username = ?`;
  const [user] = await pool.query(getUserQuery, [username]);
  if (user.length === 0) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  const hashedPassword = user[0].password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, error: "Password you entered is not correct" });
  }
  res.status(200).json({ success: true, message: "Login successful" });
});

// Fetch user by username
/*
app.get("/users/:username/", async (request, response) => {
  const { username } = request.params;

  try {
    const getUserQuery = `SELECT * FROM user WHERE username = ?`;
    const [user] = await pool.query(getUserQuery, [username]);

    if (user.length === 0) {
      return response
        .status(404)
        .json({ success: false, error: "User not found" });
    }

    response.status(200).json({ success: true, data: user[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    response
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});
*/

// Create a new user
app.post("/register/", async (request, response) => {
  const { firstname, lastname, email, password, username } = request.body;

  const userExistsQuery = `SELECT * FROM registration WHERE username = ?`;
  const [user] = await pool.query(userExistsQuery, [username]);

  if (user.length > 0) {
    return response
      .status(409)
      .json({ success: false, error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = `INSERT INTO registration(username,firstname,lastname,email,password) VALUES(?, ?, ?, ?, ?)`;
    await pool.query(insertUserQuery, [
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
    ]);

    response
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    response
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});
