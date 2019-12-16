import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";

class DropdownFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: {
				label: "Per kg",
				value: "kg",
				index: ["weigth", "value"]
			},
			key: [
				{ label: "Per kg", value: "kg", index: ["weigth", "value"] },
				{
					label: "Per gram kolhydrater",
					value: "carbohydrates",
					index: ["nutrition", "carbohydrates", "value"]
				},
				{
					label: "Per gram protein",
					value: "protein",
					index: ["nutrition", "protein", "value"]
				},
				{
					label: "Per gram fett",
					value: "fat",
					index: ["nutrition", "fat", "value"]
				},
				{ label: "Per krona", value: "price", index: ["price", "value"] }
			]
		};
	}

	componentDidMount = () => {
		

		var selectedOption = 	{ label: "Per kg", value: "kg", index: ["weigth", "value"] };
		this.props.update_filter(selectedOption);
		this.setState({ selectedOption: selectedOption });
	
	};

	handleChange = selectedOption => {
		console.log(`Option selected:`, selectedOption);
		this.props.update_filter(selectedOption);
		this.setState({ selectedOption: selectedOption });
	};

	render() {
		const { selectedOption } = this.state;

		return (
			<Select
				value={selectedOption}
				onChange={this.handleChange}
				options={this.state.key}
				placeholder={"Filtrera efter..."}
				noOptionsMessage={() => {
					return "Ingen träff";
				}}
			/>
		);
	}
}

const mapStateToProps = state => {
	
	return {
		vegetables: state.vegetables.vegetables,
		compare: state.vegetables.compare,
		filter: state.vegetables.filter
	};
};

const mapDispatchToProps = dispatch => ({
	update_filter: variabel =>
		dispatch({ type: "UPDATE_FILTER_VARIABLE", payload: variabel })
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownFilter);
