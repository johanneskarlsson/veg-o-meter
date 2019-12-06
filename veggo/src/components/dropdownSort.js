import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";

class DropdownSort extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: null
		};
	}

	componentDidMount = () => {
		var key = [
			{ label: "Energiförbrukning", value: "energy" },
			{ label: "Växthusgasutsläpp", value: "emissions" },
			{ label: "Fossilutarmning", value: "fossil_depletion" },
			{ label: "Markanvändning", value: "land_use" },
			{ label: "Markförsurning", value: "terrestrial_toxicity" },
			{ label: "Markförgiftning", value: "terrestrial_acidification" },
			{ label: "Sötvattenförgiftning", value: "freshwater_toxicity" },
			{ label: "Sötvattenförsurning", value: "freshwater_eutrophication" },
			{ label: "Marinförsurning", value: "marine_eutrophication" },
			{ label: "Vattenfotavtryck", value: "water_footprint" }
		];

		var selectedKey = [{ label: "Energiförbrukning", value: "energy" }];
		this.setState({ key: key, selectedKey: selectedKey });
	};

	handleChange = selectedOption => {
		console.log(`Option selected:`, selectedOption);
		this.props.updateSortVariabel(selectedOption);
		this.setState({ selectedOption: selectedOption });
	};

	render() {
		const { selectedOption } = this.state;

		return (
			<Select
				value={selectedOption}
				onChange={this.handleChange}
				options={this.state.key}
				placeholder={"Välj sorteringsvariabel..."}
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
		sortVariable: state.vegetables.sortVariable
	};
};

const mapDispatchToProps = dispatch => ({
	updateSortVariabel: variabel =>
		dispatch({ type: "UPDATE_SORT_VARIABLE", payload: variabel })
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSort);
