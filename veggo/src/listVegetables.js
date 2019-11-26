import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { search } from "./actions";

function ListVegetables() {
	const vegetables = useSelector(state => state.vegetables.search);
	console.log(vegetables);
	return (
		<div>
			<ul>
				{vegetables.map(vegetable => {
					return <li key={vegetable.name}>{vegetable.name}</li>;
				})}
			</ul>
		</div>
	);
}

export default ListVegetables;
