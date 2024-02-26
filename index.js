const express = require('express');
const app = express();
const port = '3001';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

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

app.post('/login', (req, res) => {
	//요청된 이메일을 데이터베이스에서 찾는다.
	//요청된 이메일이 있으면 비밀번호가 맞는지 확인
	//비밀번호가 맞다면 토큰을 생성하기
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSucess: false,
				message: '제공된 이메일에 해당하는 유저가 없습니다.',
			});
		}

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				// 토큰을 저장한다. 어디에? 쿠키, session, 로컬스토리지
				res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
			});
		});
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
