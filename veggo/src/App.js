import "./App.css";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Compare from "./components/compare";
import Header from "./components/header";
import ProductDetails from "./components/productDetails";
import AboutUs from "./components/aboutUs";
import Home from "./components/home";
import Products from "./components/products";

import React, { Component } from 'react'

class App extends Component {
 render() {
	return (
		<div className="App">
			<div className="container-fluid min-vh-100 bg">
				<Header />
				<TransitionGroup className="transition-group">
					<CSSTransition
						key={this.props.location.pathname}
						timeout={{ enter: 300, exit: 300 }}
						classNames="fade"
					>
						<section className="route-section">
							<Switch location={this.props.location}>
								<Route
									exact
									path="/produkt/:productId/:productName?"
									component={ProductDetails}
								/>
								<Route exact path="/produkter" component={Products} />
								<Route exact path="/jämför" component={Compare} />
								<Route exact path="/omoss" component={AboutUs} />
								<Route exact path="/" component={Home} />
								<Route
									component={() => {
										return <Redirect to="/" />;
									}}
								/>
							</Switch>
						</section>
					</CSSTransition>
				</TransitionGroup>
			</div>
		</div>
	);
}
}

export default withRouter(App);
