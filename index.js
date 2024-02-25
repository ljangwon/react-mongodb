const express = require('express');
const app = express();
const port = '3001';

const bodyParser = require('body-parser');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const config = require('./config/key');

const mongoose = require('mongoose');
const mongodbinfo = '';
mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB Connectied..'))
	.catch((err) => console.log(err));

app.get('/', function (req, res) {
	res.send('Hello World! 새해 복많이 받으세요');
});

app.post('/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err)
			//
			return res.json({ sucess: false, err });
		return res.status(200).json({ sucess: true, userInfo });
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
