const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello from Node.js CI/CD! CI/CD for Node.js App using GitHub Actions and AWS EC2'));
app.listen(3000, () => console.log('App listening on port 3000'));

