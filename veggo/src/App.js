import "./App.css";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
//import { TransitionGroup, CSSTransition } from "react-transition-group";

import Compare from "./components/compare";
import Header from "./components/header";
//import ProductDetails from "./components/productDetails";
import AboutUs from "./components/aboutUs";
import Home from "./components/home";
import Products from "./components/products";
import Introduction from "./components/introduction";

import React, { Component } from 'react'

class App extends Component {
 render() {
	return (
		<div className="App">
			<div className="container-fluid min-vh-100 bg p-0 m-0">
				<Home />
				<Introduction />
				<Products />
				<Compare />
				<AboutUs />
			</div>
		</div>
	);
}
}

export default withRouter(App);
