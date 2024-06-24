const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'Main_user',
      password: 'Sepio_password',
      database: 'nodejs_login'
    });

    console.log('Connected to the MySQL server.');
    await connection.end();
  } catch (err) {
    console.error('Error connecting to the MySQL server:', err);
  }
}

testConnection();
