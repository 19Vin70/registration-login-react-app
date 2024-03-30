const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  let users = [];
  try {
    const usersData = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(usersData);
  } catch (err) {
    console.error('Error reading users file:', err);
    return res.status(500).json({ error: 'Failed to read users file' });
  }

  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  users.push({ username, email, password });

  fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing users file:', err);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      res.json({ message: 'User registered successfully' });
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  let users = [];
  try {
    const usersData = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(usersData);
  } catch (err) {
    console.error('Error reading users file:', err);
    return res.status(500).json({ error: 'Failed to read users file' });
  }

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
