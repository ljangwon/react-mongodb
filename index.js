const express = require('express');
const app = express();
const port = '3001';

const mongoose = require('mongoose');
const mongodbinfo =
	'mongodb+srv://jakeleanco:abcd@cluster0.ipqd3hk.mongodb.net/?retryWrites=true&w=majority&appName=cluster0';
mongoose
	.connect(mongodbinfo)
	.then(() => console.log('MongoDB Connectied..'))
	.catch((err) => console.log(err));

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
