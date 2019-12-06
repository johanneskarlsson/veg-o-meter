import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";

class DropdownData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKey: null
		};
	}

	componentDidMount = () => {

		var key = [
				{ label: "Energiförbrukning", value: "energy"},
				{ label: "Växthusgasutsläpp", value: "emissions"},
				{ label: "Fossilutarmning", value: "fossil_depletion"},
				{ label: "Markanvändning", value: "land_use"},
				{ label: "Markförsurning", value: "terrestrial_toxicity"},
				{ label: "Markförgiftning", value: "terrestrial_acidification"},
				{ label: "Sötvattenförgiftning", value: "freshwater_toxicity"},
				{ label: "Sötvattenförsurning", value: "freshwater_eutrophication"},
				{ label: "Marinförsurning", value: "marine_eutrophication"},
				{ label: "Vattenfotavtryck", value: "water_footprint"}
		];

		var selectedKey = [
				{ label: "Energiförbrukning", value: "energy"},
				{ label: "Växthusgasutsläpp", value: "emissions"},
				{ label: "Fossilutarmning", value: "fossil_depletion"},
				{ label: "Markanvändning", value: "land_use"},
				{ label: "Markförsurning", value: "terrestrial_toxicity"},
				{ label: "Markförgiftning", value: "terrestrial_acidification"},
				{ label: "Sötvattenförgiftning", value: "freshwater_toxicity"},
				{ label: "Sötvattenförsurning", value: "freshwater_eutrophication"},
				{ label: "Marinförsurning", value: "marine_eutrophication"},
				{ label: "Vattenfotavtryck", value: "water_footprint"}
		];
		this.setState({ key: key, selectedKey: selectedKey });
		console.log(this.state.selectedKey)
	};

	handleChange = selectedKey => {

			this.setState({ selectedKey });

	};

	render() {
		const { selectedKey } = this.state;

		return (
			<Select
				value={selectedKey}
				onChange={this.handleChange}
                options={this.state.key}
                placeholder={"Välj grej..."}
                noOptionsMessage={() => {return "Ingen träff"}}
               
			/>
		);
	}
}

export default DropdownData;
