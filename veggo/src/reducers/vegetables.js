import data from "../data.json";

const initState = {
	vegetables: data.vegetables,
	search: data.vegetables
};

// Update state based on action
const vegetablesReducer = (state = initState, action) => {
	switch (action.type) {
		case "SEARCH":
			if (action.payload === "") {
				return {
					...state,
					search: state.vegetables,
					searchText: action.payload
				};
			} else {
				const search = state.vegetables.filter(obj => {
					return obj.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1 ;
				});
				return { ...state, search: search, searchText: action.payload };
			}
		default:
			return state;
	}
};

export default vegetablesReducer;
