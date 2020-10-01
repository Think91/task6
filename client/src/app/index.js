import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { CarsList, CarsInsert, CarsUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/cars/list" exact component={CarsList} />
				<Route path="/cars/create" exact component={CarsInsert} />
				<Route
					path="/cars/update/:id"
					exact
					component={CarsUpdate}
				/>
			</Switch>
		</Router>
	)
}

export default App