const express = require("express")
const mysql = require("mysql2/promise")
const path = require("path")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "/")))

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "medisafe",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Initialize database
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection()

    // Create tables if they don't exist
    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

    await connection.query(`
            CREATE TABLE IF NOT EXISTS medications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                dosage TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

    await connection.query(`
            CREATE TABLE IF NOT EXISTS medication_usage (
                id INT AUTO_INCREMENT PRIMARY KEY,
                medication_id INT NOT NULL,
                usage_text TEXT NOT NULL,
                FOREIGN KEY (medication_id) REFERENCES medications(id)
            )
        `)

    await connection.query(`
            CREATE TABLE IF NOT EXISTS medication_side_effects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                medication_id INT NOT NULL,
                side_effect TEXT NOT NULL,
                FOREIGN KEY (medication_id) REFERENCES medications(id)
            )
        `)

    await connection.query(`
            CREATE TABLE IF NOT EXISTS conditions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT NOT NULL
            )
        `)

    await connection.query(`
            CREATE TABLE IF NOT EXISTS appointments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                appointment_type VARCHAR(50) NOT NULL,
                appointment_date DATE NOT NULL,
                appointment_time VARCHAR(20) NOT NULL,
                symptoms TEXT,
                doctor VARCHAR(50),
                is_urgent BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `)

    await connection.query(`
            CREATE TABLE IF NOT EXISTS guidance_results (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                medications TEXT NOT NULL,
                conditions TEXT,
                symptoms TEXT,
                environmental_factors TEXT NOT NULL,
                personal_factors TEXT NOT NULL,
                guidance_text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `)

    connection.release()
    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// API Routes
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // In a real application, you would hash the password
    const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      password,
    ])

    res.status(201).json({ id: result.insertId, name, email })
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const [rows] = await pool.query("SELECT id, name, email FROM users WHERE email = ? AND password = ?", [
      email,
      password,
    ])

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // In a real application, you would generate a JWT token
    res.json({ user: rows[0], token: "sample-token" })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/generate-guidance", async (req, res) => {
  try {
    const { medications, conditions, symptoms, environmental, personal, userId } = req.body

    // In a real application, you would use an AI algorithm to generate personalized guidance
    // For now, we'll create a simple guidance based on the input data

    let guidanceText = `
            <h2>Personalized Medicine Guidance</h2>
            <p>Based on your input, here is your personalized guidance for taking your medications:</p>
        `

    // Add guidance for each medication
    medications.forEach((medication) => {
      guidanceText += `
                <h3>${medication}</h3>
                <p>Take as prescribed by your healthcare provider.</p>
                <p>Environmental considerations: ${environmental.weather} weather in ${environmental.season} season may affect how this medication works.</p>
            `

      // Add specific guidance based on conditions
      if (conditions && conditions.length > 0) {
        guidanceText += `<p>Special considerations for your conditions (${conditions.join(", ")}):</p>`
      }

      // Add specific guidance based on symptoms
      if (symptoms && symptoms.length > 0) {
        guidanceText += `<p>Monitor these symptoms while taking this medication: ${symptoms.join(", ")}</p>`
      }
    })

    // Store the guidance in the database
    const [result] = await pool.query(
      `INSERT INTO guidance_results 
            (user_id, medications, conditions, symptoms, environmental_factors, personal_factors, guidance_text) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId || null,
        JSON.stringify(medications),
        JSON.stringify(conditions || []),
        JSON.stringify(symptoms || []),
        JSON.stringify(environmental),
        JSON.stringify(personal),
        guidanceText,
      ],
    )

    res.status(201).json({
      id: result.insertId,
      guidanceText,
      medications,
      conditions,
      symptoms,
      environmental,
      personal,
    })
  } catch (error) {
    console.error("Error generating guidance:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/appointments", async (req, res) => {
  try {
    const { name, email, phone, type, date, time, symptoms, doctor, urgent, userId } = req.body

    const [result] = await pool.query(
      `INSERT INTO appointments 
            (user_id, name, email, phone, appointment_type, appointment_date, appointment_time, symptoms, doctor, is_urgent) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId || null, name, email, phone, type, date, time, symptoms, doctor, urgent],
    )

    res.status(201).json({ id: result.insertId, appointmentDate: date, appointmentTime: time })
  } catch (error) {
    console.error("Error booking appointment:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/medicine-usage", (req, res) => {
  res.sendFile(path.join(__dirname, "medicine-usage.html"))
})

app.get("/appointment", (req, res) => {
  res.sendFile(path.join(__dirname, "appointment.html"))
})

app.get("/results", (req, res) => {
  res.sendFile(path.join(__dirname, "results.html"))
})

// Serve the frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"))
// })

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await initializeDatabase()
})

