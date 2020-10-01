import React, { Component } from 'react'
import ReactTable from 'react-table'
// import api from '../api'

import api from '../api/index'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
	padding: 0 40px 40px 40px;
`
const Update = styled.div`
 	color: #ef9b0f;
 	cursor: pointer;
`
const Delete = styled.div`
 	color: #ff0000;
 	cursor: pointer;
`

class UpdateCar extends Component {
	updateCar = event => {
		event.preventDefault()

		window.location.href = `/cars/update/${this.props.id}`
	}

	render() {
		return <Update onClick={this.updateCar}>Update</Update>
	}
}

class DeleteCar extends Component {
	deleteCar = event => {
		event.preventDefault()

		if (
			window.confirm(
				`Do tou want to delete the car ${this.props.id} permanently?`,
			)
		) {
			api.deleteCarById(this.props.id)
			window.location.reload()
		}
	}

	render() {
		return <Delete onClick={this.deleteCar}>Delete</Delete>
	}
}

class CarsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cars: [],
			columns: [],
			isLoading: false,
		}
	}

	componentDidMount = async () => {
		this.setState({ isLoading: true })

		await api.getAllCars().then(cars => {
			console.log(cars)
			
			this.setState({
				cars: cars.data.data,
				isLoading: false,
			})
		})
	}

	render() {
		const { cars, isLoading } = this.state

		const columns = [
			{
				Header: 'ID',
 				accessor: '_id',
 				filterable: true,
 			},
 			{
 				Header: 'Make',
 				accessor: 'make',
 				filterable: true,
 			},
 			{
 				Header: 'Registration',
 				accessor: 'registration',
 				filterable: true,
 			},
 			{
 				Header: 'Year',
				accessor: 'year',
				filterable: true 
 				// Cell: props => <span>{props.value.join(' / ')}</span>,
			 },
			 {
				Header: 'Address',
				accessor: 'address',
				filterable: true
			 },
 			{
 				Header: '🚮',
 				accessor: '',
 				Cell: function(props) {
 					return (
 						<span>
 							<DeleteCar id={props.original._id} />
 						</span>
 					)
 				},
 			},
 			{
 				Header: '✏',
 				accessor: '',
 				Cell: function(props) {
 					return (
						 <span>
 							<UpdateCar id={props.original._id} />
 						</span>
 					)
 				},
 			},
 		]
 
 		let showTable = true
 		if (!cars.length) {
 			showTable = false
 		}
 
 		return (
 			<Wrapper>
 			{showTable && (
 					<ReactTable
						data={cars}
						columns={columns}
 						loading={isLoading}
 						defaultPageSize={10}
 						showPageSizeOptions={true}
 						minRows={0}
 					/>
 				)}
			</Wrapper>
 		)
 	}
}

export default CarsList
