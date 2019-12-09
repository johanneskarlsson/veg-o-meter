import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import basket from "../images/basket.png";

export default class Introduction extends Component {
	render() {
		return (
			<div name="introduction" className="introduction">
				<div className="min-vh-100 w-100 p-md-5 p-4 d-flex justify-content-center align-items-center introduction-bg">
					<div className="container">
						<div className="row">
							<div className="col-md-12 mb-4 mx-auto">
								<Fade left duration={1500} delay={200}>
									<h1>Vad är Grönsakshjälpen?</h1>
								</Fade>
							</div>
						</div>
						<div className="row">
							<div className="col-md-9 col-lg-8 mx-auto mb-5">
								<Fade left duration={1500} delay={1200}>
									<h5 className="text-left introduction-subtitle">
										Grönsakshjälpen är ett verktyg för att hjälpa dig ta mer
										hållbara beslut kring köp av grönsaker. Du kan få
										information om allt från näringsinnehåll till klimatavtryck
										i form av växthusgasutsläpp, vattenfotavtryck osv. Med
										verktyget kan du också jämföra grönsaker mot varandra
										baserat på de olika parametrarna ex. klimatavtryck per
										krona, per gram protein osv. detta för att hjälpa dig
										ta klimatsmarta beslut vid köp av grönsaker.
									</h5>
								</Fade>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 col-lg-4 col-10 mx-auto">
					
								<img className="img-fluid" src={basket} alt="Vegetable basket" />
								
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
