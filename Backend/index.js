const express = require('express');
const app = express();
const port = 5000;
const { run, addUser } = require("./server.js"); // Імпортуємо run та addUser

app.get('/add', (req, res) => {
    addUser("Oleksii").then(() => {
        res.send('User added!');
    }).catch(error => {
        res.status(500).send('An error occurred: ' + error.message);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});