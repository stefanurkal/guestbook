const express = require('express');
const mariadb = require('mariadb');

// Instantiate an express (web) app
const app = express();

// Define a port number for the app to listen on
const PORT = 3000;

const pool = mariadb.createPool({
    host:'localhost',
    user: 'root',
    password:'1234',
    database: 'guestbook',
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
            return conn;
    } catch {
        console.log('Error connecting to DB: ' + err)
    }
}

connect();

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// Define a "default" route
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");
    res.render('home');
});

app.post('/success', async (req,res) => { 

    const data = req.body;
    console.log(data);
    const conn = await connect();
    
    conn.query(`
        INSERT INTO guests (firstName, lastName, jobTitle, company, link, email, meet, other, message, mailing, method) VALUES 
        ('${data.fname}',
        '${data.lname}',
        '${data.job}',
        '${data.company}',
        '${data.link}',
        '${data.email}',
        '${data.meet}',
        '${data.sother}',
        '${data.message}',
        '${data.join}',
        '${data.method}'
        )
        `);

    res.render('thanks', {details: data});
});

 app.get('/admin', async (req, res) => {

    const conn = await connect();
    const results = await conn.query
    ('SELECT * FROM guests');
    res.render('admin', { guests: results});
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});