import React, { useEffect } from 'react';
import axios from 'axios';

let count = 0;

function LandingPage() {
	useEffect(() => {
		axios.get('/api/hello').then((response) => {
			console.log(response.data);
			console.log(count++);
		});
	}, []);

	return <div>LandingPage with axios</div>;
}

export default LandingPage;
