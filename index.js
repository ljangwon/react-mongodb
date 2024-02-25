const express = require('express');
const app = express();
const port = '3001';

const bodyParser = require('body-parser');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mongoose = require('mongoose');
const mongodbinfo =
	'mongodb+srv://jakeleanco:abcd1234@cluster0.ipqd3hk.mongodb.net/?retryWrites=true&w=majority&appName=cluster0';
mongoose
	.connect(mongodbinfo)
	.then(() => console.log('MongoDB Connectied..'))
	.catch((err) => console.log(err));

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, doc) => {
		if (err)
			//
			return res.json({ sucess: false, err });
		return res.status(200).json({ sucess: true });
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
