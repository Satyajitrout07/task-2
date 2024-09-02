// Import required modules
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// User database (simulated for demonstration purposes)
const users = [
  { id: 1, username: 'satya', password: 'password123' },
  { id: 2, username: 'soumya', password: 'password456' },
];

// Function to authenticate user
function authenticateUser(username, password) {
  // Iterate through the users database
  for (let i = 0; i < users.length; i++) {
    // Check if the username and password match
    if (users[i].username === username && users[i].password === password) {
      // Return the user object if authenticated
      return users[i];
    }
  }
  // Return null if authentication fails
  return null;
}

// Function to handle authentication requests
app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  const user = authenticateUser(username, password);

  if (user) {
    // Grant access if authenticated
    res.status(200).send({ message: 'Authentication successful', user });
  } else {
    // Display error message if authentication fails
    res.status(401).send({ message: 'Invalid username or password' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});