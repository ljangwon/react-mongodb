import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to='/'>LandingPage</Link>
						</li>
						<li>
							<Link to='/RegisterPage'>RegisterPage</Link>
						</li>
						<li>
							<Link to='/LoginPage'>LoginPage</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/registerPage' element={<RegisterPage />} />
					<Route path='/loginPage' element={<LoginPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
