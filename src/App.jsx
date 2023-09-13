import { Homepage } from './components/organisms/Homepage/Homepage';
import { Header } from './components/molecules/Header/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TravelDetails } from './components/organisms/TravelDetailsPage/TravelDetails';
import { CopyrightFooter } from './components/atoms/Footer/Footer';
function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={<Homepage />} />
				<Route path="/travel/:destination" element={<TravelDetails />} />
			</Routes>
			<CopyrightFooter />
		</Router>
	);
}

export default App;
