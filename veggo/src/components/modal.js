import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as d3 from "d3";
import DetailRadarChart from "./detailRadarChart";
import DetailDonutChart from "./detailDonutChart";
import Fade from "react-reveal/Fade";

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				"id": 1,
				"image": "asparagus.jpg",
				"name": "Asparagus",
				"name_swe": "Sparris",
				"nutrition": {
					"energy": {
						"kcal": { "value": 270, "unit": "kcal/kg" },
						"kj": { "value": 1130, "unit": "kJ/kg" }
					},
					"carbohydrates": { "value": 24, "unit": "g/kg" },
					"fat": { "value": 2, "unit": "g/kg" },
					"protein": { "value": 31, "unit": "g/kg" },
					"fiber": { "value": 15, "unit": "g/kg" },
					"water": { "value": 920, "unit": "g/kg" },
					"ash": { "value": 8, "unit": "g/kg" },
					"sugars": { "value": 12, "unit": "g/kg" },
					"saturated_fat": { "value": 0.5, "unit": "g/kg" },
					"monounsaturated_fat": { "value": 0, "unit": "g/kg" },
					"polyunsaturated_fat": { "value": 1.1, "unit": "g/kg" },
					"vitamin_d": { "value": 0, "unit": "μg/kg" },
					"vitamin_c": { "value": 330, "unit": "mg/kg" },
					"folate": { "value": 1190, "unit": "μg/kg" },
					"iron": { "value": 7, "unit": "mg/kg" }
				},
				"price": { "value": 147.6, "unit": "kr/kg" },
				"energy": { "value": 64.7, "unit": "MJ/kg", "ranking": 21 },
				"fossil_depletion": {
					"value": 1.4,
					"unit": "kg oil eq./kg",
					"ranking": 21
				},
				"water_volume": { "value": 746, "unit": "L/kg" },
				"water_footprint": { "value": 525, "unit": "Leq./kg", "ranking": 21 },
				"emissions": { "value": 5.3, "unit": "kg CO2 eq./kg", "ranking": 21 },
				"land_use": { "value": 4.1, "unit": "m2 a/kg", "ranking": 21 },
				"freshwater_toxicity": {
					"value": 99,
					"unit": "g 1,4-DB eq./kg",
					"ranking": 15
				},
				"terrestrial_toxicity": {
					"value": 22.5,
					"unit": "g 1,4-DB eq./kg",
					"ranking": 21
				},
				"freshwater_eutrophication": {
					"value": 0.6,
					"unit": "g P eq./kg",
					"ranking": 20
				},
				"marine_eutrophication": {
					"value": 15.9,
					"unit": "g N eq./kg",
					"ranking": 21
				},
				"terrestrial_acidification": {
					"value": 27.1,
					"unit": "g SO2 eq./kg",
					"ranking": 21
				}
			
			}
		};
	}

	componentDidUpdate = prevProps => {
		if (this.props !== prevProps) {
			this.setState({ data: this.props.detail[0] });
		}
	};

	colorRanking = ranking => {
		var length = this.props.vegetables.length;
		var middlePoint = Math.round(length / 2);

		var i = d3
			.scaleLinear()
			.domain([1, middlePoint, length])
			.range(["#1a9850", "#fee08b", "#d73027"]) // Green, yellow, red
			.interpolate(d3.interpolateHcl);

		var color = i(ranking);

		return color;
	};

	render() {
		const { data } = this.state;
		return (
			<div
				className="modal fade bd-example-modal-lg p-0"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="myLargeModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="compare-vegetables">
							<div className="modal-body">
								<div className="row">
									<div className="col-12 p-3">
										<h2 className="text-center">{data.name_swe}</h2>
									</div>

									<div className="veg-image col-12">
										<img
											src={require("../images/" + data.image)}
											alt={data.name}
											className="img-fluid"
										/>
									</div>

									<div className="col-12 p-3">
										<h4>{`Pris: ${data.price.value} ${data.price.unit}`}</h4>
									</div>

									<div className="col-12">
										<div className="row">
											<div className="col-md-5 pl-md-4 col-11 mx-auto p-0">
												<table className="table nutrition p-0 m-0">
													<thead className="thead-dark">
														<tr>
															<th scope="col-6">Näringsämne</th>
															<th scope="col-6">Värde</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<th scope="row">Energi</th>
															<td>
																{data.nutrition.energy.kcal.value}{" "}
																{data.nutrition.energy.kcal.unit}<br />
																{data.nutrition.energy.kj.value}{" "}
																{data.nutrition.energy.kj.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Kolhydrater</th>
															<td>
																{data.nutrition.carbohydrates.value}{" "}
																{data.nutrition.carbohydrates.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Protein</th>
															<td>
																{data.nutrition.protein.value}{" "}
																{data.nutrition.protein.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Fett</th>
															<td>
																{data.nutrition.fat.value}{" "}
																{data.nutrition.fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Fibrer</th>
															<td>
																{data.nutrition.fiber.value}{" "}
																{data.nutrition.fiber.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Vatten</th>
															<td>
																{data.nutrition.water.value}{" "}
																{data.nutrition.water.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Aska</th>
															<td>
																{data.nutrition.ash.value}{" "}
																{data.nutrition.ash.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Sockerarter</th>
															<td>
																{data.nutrition.sugars.value}{" "}
																{data.nutrition.sugars.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Mättat fett</th>
															<td>
																{data.nutrition.saturated_fat.value}{" "}
																{data.nutrition.saturated_fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Enkelomättat fett</th>
															<td>
																{data.nutrition.monounsaturated_fat.value}{" "}
																{data.nutrition.monounsaturated_fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Fleromättat fett</th>
															<td>
																{data.nutrition.polyunsaturated_fat.value}{" "}
																{data.nutrition.polyunsaturated_fat.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Vitamin D</th>
															<td>
																{data.nutrition.vitamin_d.value}{" "}
																{data.nutrition.vitamin_d.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Vitamin C</th>
															<td>
																{data.nutrition.vitamin_c.value}{" "}
																{data.nutrition.vitamin_c.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Folat</th>
															<td>
																{data.nutrition.folate.value}{" "}
																{data.nutrition.folate.unit}
															</td>
														</tr>
														<tr>
															<th scope="row">Järn</th>
															<td>
																{data.nutrition.iron.value}{" "}
																{data.nutrition.iron.unit}
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="col-md-7 pt-md-0 pt-4 mx-auto p-0">
												<div className="row">
													<div className="col-12 p-0">
														<h3 className="text-center pb-2">
															Näringsinnehåll
															<br />
															(per kg)
														</h3>
														<Fade delay={200}>
														<DetailDonutChart
															data={this.props.detail}
															vegetables={this.props.vegetables}
														/>
														</Fade>
													</div>
												</div>
												<div className="row pt-4">
													<div className="col-12">
														<h3 className="text-center pb-2">
															Ranking
															<br />
															(klimatavtryck)
														</h3>
														<Fade delay={200}>
														<DetailRadarChart
															data={this.props.detail}
															vegetables={this.props.vegetables}
														/>
														</Fade>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="col-12 pt-4">
										<div className="row p-2">
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.water_footprint.ranking
														)
													}}
													className="m-0"
												>{`Vattenfotavtryck: ${data.water_footprint.value} ${data.water_footprint.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.emissions.ranking
														)
													}}
													className="m-0"
												>{`Växthusgasutsläpp: ${data.emissions.value} ${data.emissions.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.land_use.ranking
														)
													}}
													className="m-0"
												>{`Markanvändning: ${data.land_use.value} ${data.land_use.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.energy.ranking
														)
													}}
													className="m-0"
												>{`Energiförbrukning: ${data.energy.value} ${data.energy.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.freshwater_toxicity.ranking
														)
													}}
													className="m-0"
												>{`Sötvattenförgiftning: ${data.freshwater_toxicity.value} ${data.freshwater_toxicity.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.fossil_depletion.ranking
														)
													}}
													className="m-0"
												>{`Fossil utarmning: ${data.fossil_depletion.value} ${data.fossil_depletion.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.freshwater_eutrophication.ranking
														)
													}}
													className="m-0"
												>{`Sötvattenförsurning: ${data.freshwater_eutrophication.value} ${data.freshwater_eutrophication.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.marine_eutrophication.ranking
														)
													}}
													className="m-0"
												>{`Marinförsurning: ${data.marine_eutrophication.value} ${data.marine_eutrophication.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.terrestrial_acidification.ranking
														)
													}}
													className="m-0"
												>{`Markförsurning: ${data.terrestrial_acidification.value} ${data.terrestrial_acidification.unit}`}</p>
											</div>
											<div className="col-lg-4 col-6 p-1 pb-0">
												<p
													style={{
														backgroundColor: this.colorRanking(
															data.terrestrial_toxicity.ranking
														)
													}}
													className="m-0"
												>{`Markförgiftning: ${data.terrestrial_toxicity.value} ${data.terrestrial_toxicity.unit}`}</p>
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
