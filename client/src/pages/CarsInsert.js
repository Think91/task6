import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
	className: 'h1'
})``;

const Wrapper = styled.div.attrs({
	className: 'form-group'
})`
    margin: 0 30px;
`;

const Label = styled.label`margin: 5px;`;

const InputText = styled.input.attrs({
	className: 'form-control'
})`
    margin: 5px;
`;

const Button = styled.button.attrs({
	className: `btn btn-primary`
})`
    margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
	className: `btn btn-danger`
})`
    margin: 15px 15px 15px 5px;
`;

class CarsInsert extends Component {
	constructor(props) {
		super(props);

		this.state = {
			make: '',
			registration: '',
			year: '',
			address: ''
		};
	}

	handleChangeInputMake = async (event) => {
		const make = event.target.value;
		this.setState({ make });
	};

	handleChangeInputAddresss = async (event) => {
		const address = event.target.value;
		this.setState({ address });
	};

	handleChangeInputRegistration = async (event) => {
		// const registration = event.target.validity.valid ? event.target.value : this.state.registration;
		const registration = event.target.value;

		this.setState({ registration });
	};

	handleChangeInputYear = async (event) => {
		const year = event.target.value;
		this.setState({ year });
	};

	handleIncludeCar = async () => {
		const { make, registration, year, address } = this.state;
		// const arrayYear = year.split('/');
		const payload = { make, registration, year, address };

		console.log(payload);

		await api.insertCar(payload).then((res) => {
			window.alert(`Car inserted successfully`);
			this.setState({
				make: '',
				registration: '',
				year: '',
				address: ''
			});
		});
	};

	/**
	 * Caused server to crash
	 */

	// componentDidMount = async () => {
	// 	const { id } = this.state;
	// 	const car = await api.getCarById(id);

	// 	this.setState({
	// 		make: car.data.data.make,
	// 		registration: car.data.data.registration,
	// 		year: car.data.data.year.join('/')
	// 	});
	// };

	render() {
		const { make, registration, year, address } = this.state;
		return (
			<Wrapper>
				<Title>Create Car</Title>

				<Label>Make: </Label>
				<InputText type="text" value={make} onChange={this.handleChangeInputMake} />

				<Label>Registration: </Label>
				<InputText
					type="text"
					step="0.1"
					lang="en-US"
					min="0"
					max="10"
					pattern="[0-9]+([,\.][0-9]+)?"
					value={registration}
					onChange={this.handleChangeInputRegistration}
				/>

				<Label>Year: </Label>
				<InputText type="text" value={year} onChange={this.handleChangeInputYear} />

				<Label>Address: </Label>
				<InputText type="text" value={address} onChange={this.handleChangeInputAddresss} />

				<Button onClick={this.handleIncludeCar}>Add Car</Button>
				<CancelButton href={'/cars/list'}>Cancel</CancelButton>
			</Wrapper>
		);
	}
}

export default CarsInsert;
