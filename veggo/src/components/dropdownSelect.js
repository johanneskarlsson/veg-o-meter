import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";

class DropdownSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null
		};
	}

	componentDidMount = () => {
		var options = this.props.vegetables.map(vegetable => {
			return {
				value: vegetable.name_swe,
				label: vegetable.name_swe,
				data: vegetable
			};
		});
		var selectedOption = this.props.compare.map(vegetable => {
			return {
				value: vegetable.name_swe,
				label: vegetable.name_swe,
				data: vegetable
			};
		});
		this.setState({ options: options, selectedOption: selectedOption });
	};

	handleChange = selectedOption => {
		console.log(`Option selected:`, selectedOption);
		if (selectedOption === null) {
			var compareListEmpty = [];
			this.props.updateCompareList(compareListEmpty);
			this.setState({ selectedOption: compareListEmpty });
		} else {
			var compareList = selectedOption.map(obj => {
				return obj.data;
			});
			console.log("Redux");
			this.props.updateCompareList(compareList);
			console.log("State");
			this.setState({ selectedOption });
			console.log(`Option selected:`, selectedOption);
		}
	};

	render() {
		const { selectedOption } = this.state;

		return (
			<Select
				isMulti
				value={selectedOption}
				onChange={this.handleChange}
                options={this.state.options}
                placeholder={"Välj grönsaker..."}
                noOptionsMessage={() => {return "Ingen träff"}}
               
			/>
		);
	}
}

const mapStateToProps = state => {
	console.log(state.vegetables.compare);
	return {
		vegetables: state.vegetables.vegetables,
		compare: state.vegetables.compare
	};
};

const mapDispatchToProps = dispatch => ({
	updateCompareList: list =>
		dispatch({ type: "UPDATE_COMPARELIST", payload: list })
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSelect);
