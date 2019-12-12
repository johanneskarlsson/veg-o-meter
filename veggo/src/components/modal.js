import React, { Component } from "react";
import * as d3 from "d3";
import DetailRadarChart from "./detailRadarChart";
import DetailDonutChart from "./detailDonutChart";
import Fade from "react-reveal/Fade";
import { ReactComponent as Close } from "../images/close.svg";
import Select from "react-select";

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				id: 1,
				image: "asparagus.jpg",
				name: "Asparagus",
				name_swe: "Sparris",
				weigth: { value: 1, unit: "kg" },
				nutrition: {
					energy: {
						kcal: { value: 270, unit: "kcal/kg" },
						kj: { value: 1130, unit: "kJ/kg" }
					},
					carbohydrates: { value: 24, unit: "g/kg" },
					fat: { value: 2, unit: "g/kg" },
					protein: { value: 31, unit: "g/kg" },
					fiber: { value: 15, unit: "g/kg" },
					water: { value: 920, unit: "g/kg" },
					ash: { value: 8, unit: "g/kg" },
					sugars: { value: 12, unit: "g/kg" },
					saturated_fat: { value: 0.5, unit: "g/kg" },
					monounsaturated_fat: { value: 0, unit: "g/kg" },
					polyunsaturated_fat: { value: 1.1, unit: "g/kg" },
					vitamin_d: { value: 0, unit: "μg/kg" },
					vitamin_c: { value: 330, unit: "mg/kg" },
					folate: { value: 1190, unit: "μg/kg" },
					iron: { value: 7, unit: "mg/kg" }
				},
				price: { value: 147.6, unit: "kr/kg" },
				energy: { value: 64.7, unit: "MJ/kg", ranking: 21 },
				fossil_depletion: {
					value: 1.4,
					unit: "kg oil eq./kg",
					ranking: 21
				},
				water_volume: { value: 746, unit: "L/kg" },
				water_footprint: { value: 525, unit: "Leq./kg", ranking: 21 },
				emissions: { value: 5.3, unit: "kg CO2 eq./kg", ranking: 21 },
				land_use: { value: 4.1, unit: "m2 a/kg", ranking: 21 },
				freshwater_toxicity: {
					value: 99,
					unit: "g 1,4-DB eq./kg",
					ranking: 15
				},
				terrestrial_toxicity: {
					value: 22.5,
					unit: "g 1,4-DB eq./kg",
					ranking: 21
				},
				freshwater_eutrophication: {
					value: 0.6,
					unit: "g P eq./kg",
					ranking: 20
				},
				marine_eutrophication: {
					value: 15.9,
					unit: "g N eq./kg",
					ranking: 21
				},
				terrestrial_acidification: {
					value: 27.1,
					unit: "g SO2 eq./kg",
					ranking: 21
				}
			},

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
			],
			filteredValue: 1
		};
	}

	componentDidUpdate = prevProps => {
		if (this.props !== prevProps) {
			this.setState({ data: this.props.detail[0] });
		}
	};

	handleChange = selectedOption => {
		console.log(`Option selected:`, selectedOption);
		var option = selectedOption;
		console.log(option);
		var lengthKey = option.index.length;
		console.log(option.index.length);
		var filteredValue;
		if (lengthKey === 2) {
			filteredValue = this.state.data[option.index[0]][option.index[1]];
		} else if (lengthKey === 3) {
			filteredValue = this.state.data[option.index[0]][option.index[1]][
				option.index[2]
			];
		}

		this.setState({
			selectedOption: selectedOption,
			filteredValue: filteredValue
		});
	};

	colorRanking = (object, data, key) => {
		console.log("COLOR RANKING");
		console.log("Vegetable values");

		var values = this.props.vegetables.map(vegetable => {
			return this.newValueFilter(vegetable, vegetable[key].value);
		});
		console.log(values);
		var maxValue = d3.max(values);
		var minValue = d3.min(values);
		console.log(
			this.props.vegetables[0][key].value +
				" " +
				this.props.vegetables[0][key].unit
		);

		var middlePoint = (maxValue - minValue) / 2;
		console.log(maxValue);
		console.log(middlePoint);
		console.log(minValue);
		var colorScale = d3
			.scaleLinear()
			.domain([minValue, middlePoint, maxValue])
			.range(["#1a9850", "#fee08b", "#d73027"]) // Green, yellow, red
			.interpolate(d3.interpolateHcl);

		var color;
		console.log(colorScale)
		var newValue = this.newValueFilter(object, data);
		if (newValue === 0) {
			color = "rgb(255, 255, 255)";
		} else {
			color = colorScale(newValue);
		}

		console.log(color);

		return color;
	};

	newValueFilter = (object, value) => {
		//console.log("NEW VALUE FILTER");
		var option = this.state.selectedOption;
		//console.log(option);
		var lengthKey = option.index.length;
		//console.log(option.index.length);
		var newValue;
		var filteredValue;
		if (lengthKey === 2) {
			filteredValue = object[option.index[0]][option.index[1]];
			if (filteredValue === 0) {
				newValue = 0;
			} else {
				newValue = Math.round((value / filteredValue) * 10000) / 10000;
			}
		} else if (lengthKey === 3) {
			filteredValue = object[option.index[0]][option.index[1]][option.index[2]];
			if (filteredValue === 0) {
				newValue = 0;
			} else {
				newValue = Math.round((value / filteredValue) * 10000) / 10000;
			}
		} else {
			console.log("Key index out of range");
		}
		return newValue;
	};

	render() {
		const { data } = this.state;
		return (
			<div
				className="modal fade productDetails-modal p-0"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="productDetails-modal"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="compare-vegetables">
							<div className="modal-body">
								<div className="modal-header mb-2">
									<h2 className="modal-title w-100 text-center">
										{data.name_swe}
									</h2>
									<button
										type="button"
										className="close p-0"
										data-dismiss="modal"
										aria-label="Close"
									>
										<Close className="close-button" />
									</button>
								</div>
								<div className="col-md-4 mx-auto">
									<Select
										isSearchable={false}
										value={this.state.selectedOption}
										onChange={this.handleChange}
										options={this.state.key}
										placeholder={"Välj filter..."}
										noOptionsMessage={() => {
											return "Ingen träff";
										}}
									/>
								</div>
								<div className="container p-0">
									<div className="row">
										<div className="row p-0 mx-auto col-12">
											<div className="col-md-6 mx-auto">
												<div className="row pt-3">
													<div className="col-12 p-0">
														<h3 className="text-center pb-2">
															Näringsinnehåll
															<br />
														</h3>
														<Fade>
															<DetailDonutChart
																data={this.props.detail}
																vegetables={this.props.vegetables}
																filteredValue={this.state.filteredValue}
															/>
														</Fade>
													</div>
												</div>

												<table className="table nutrition p-0 m-0">
													<thead className="thead-dark">
														<tr>
															<th scope="row" colSpan="2">
																Näringsämnen
															</th>
														</tr>
													</thead>
													<tbody className="border">
														<tr>
															<th scope="row">Energi</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.energy.kcal.value
																)}{" "}
																{data.nutrition.energy.kcal.unit}
																<br />
																{this.newValueFilter(
																	data,
																	data.nutrition.energy.kj.value
																)}{" "}
																{data.nutrition.energy.kj.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Kolhydrater</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.carbohydrates.value
																)}{" "}
																{data.nutrition.carbohydrates.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Protein</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.protein.value
																)}{" "}
																{data.nutrition.protein.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Fett</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.fat.value
																)}{" "}
																{data.nutrition.fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Fibrer</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.fiber.value
																)}{" "}
																{data.nutrition.fiber.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Vatten</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.water.value
																)}{" "}
																{data.nutrition.water.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Aska</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.ash.value
																)}{" "}
																{data.nutrition.ash.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Sockerarter</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.sugars.value
																)}{" "}
																{data.nutrition.sugars.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Mättat fett</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.saturated_fat.value
																)}{" "}
																{data.nutrition.saturated_fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Enkelomättat fett</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.monounsaturated_fat.value
																)}{" "}
																{data.nutrition.monounsaturated_fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Fleromättat fett</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.polyunsaturated_fat.value
																)}{" "}
																{data.nutrition.polyunsaturated_fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Vitamin D</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.vitamin_d.value
																)}{" "}
																{data.nutrition.vitamin_d.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Vitamin C</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.vitamin_c.value
																)}{" "}
																{data.nutrition.vitamin_c.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Folat</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.folate.value
																)}{" "}
																{data.nutrition.folate.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Järn</th>
															<td>
																{this.newValueFilter(
																	data,
																	data.nutrition.iron.value
																)}{" "}
																{data.nutrition.iron.unit}
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="col-md-6 mx-auto">
												<div className="row pt-3">
													<div className="col-12 mx-auto">
														<h3 className="text-center pb-2">
															Grönsaksranking
														</h3>
														<Fade>
															<DetailRadarChart
																data={this.props.detail}
																vegetables={this.props.vegetables}
																filteredValue={this.state.filteredValue}
																selectedOption={this.state.selectedOption}
															/>
														</Fade>
													</div>
												</div>
												<div className="col-12 pt-3">
													<div className="row">
														<table className="table climate p-0 m-0">
															<thead className="thead-dark">
																<tr>
																	<th scope="row" colSpan="2">
																		Klimatavtryck
																	</th>
																</tr>
															</thead>
															<tbody className="border">
																<tr>
																	<th scope="row">Växthusgasutsläpp</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.emissions.value,
																				"emissions"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.emissions.value
																		)} ${data.emissions.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Vattenfotavtryck</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.water_footprint.value,
																				"water_footprint"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.water_footprint.value
																		)} ${data.water_footprint.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Energiförbrukning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.energy.value,
																				"energy"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.energy.value
																		)} ${data.energy.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Markanvändning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.land_use.value,
																				"land_use"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.land_use.value
																		)} ${data.land_use.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Fossil utarmning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.fossil_depletion.value,
																				"fossil_depletion"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.fossil_depletion.value
																		)} ${data.fossil_depletion.unit}`}
																	</td>
																</tr>

																<tr>
																	<th scope="row">Sötvattenförgiftning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.freshwater_toxicity.value,
																				"freshwater_toxicity"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.freshwater_toxicity.value
																		)} ${data.freshwater_toxicity.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Sötvattenförsurning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.freshwater_eutrophication.value,
																				"freshwater_eutrophication"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.freshwater_eutrophication.value
																		)} ${data.freshwater_eutrophication.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Marinförsurning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.marine_eutrophication.value,
																				"marine_eutrophication"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.marine_eutrophication.value
																		)} ${data.marine_eutrophication.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Markförsurning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.terrestrial_acidification.value,
																				"terrestrial_acidification"
																			)
																		}}
																		className="m-0"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.terrestrial_acidification.value
																		)} ${data.terrestrial_acidification.unit}`}
																	</td>
																</tr>
																<tr>
																	<th scope="row">Markförgiftning</th>
																	<td
																		style={{
																			backgroundColor: this.colorRanking(
																				data,
																				data.terrestrial_toxicity.value,
																				"terrestrial_toxicity"
																			)
																		}}
																		className="m-0 text-border"
																	>
																		{`${this.newValueFilter(
																			data,
																			data.terrestrial_toxicity.value
																		)} ${data.terrestrial_toxicity.unit}`}
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
