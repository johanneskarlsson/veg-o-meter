import data from "../data.json";

const initState = {
	vegetables: data.vegetables,
	search: data.vegetables,
	compare: [],
	radarChart: [],
	detail: null
};

// Update state based on action
const vegetablesReducer = (state = initState, action) => {
	var compareList = [...state.compare];
	var vegetables = data.vegetables;
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
					return (
						obj.name_swe.toLowerCase().indexOf(action.payload.toLowerCase()) !==
						-1
					);
				});
				return { ...state, search: search, searchText: action.payload };
			}
		case "ADD_COMPARE":
			var vegetable = vegetables.filter(vegetable => {
				return vegetable.id.toString() === action.payload;
			});
			compareList.push(vegetable[0]);
			return { ...state, compare: compareList };
		case "REMOVE_COMPARE":
			console.log(action.payload);
			const index = compareList
				.map(function(obj) {
					return obj.id.toString();
				})
				.indexOf(action.payload);
			console.log(index);
			compareList.splice(index, 1);
			return { ...state, compare: compareList };
		case "GET_DETAILS":
			var detail = vegetables.filter(vegetable => {
				return vegetable.id.toString() === action.payload;
			});
			if (detail.length === 0) {
				return { ...state, detail: null };
			} else return { ...state, detail: detail[0], radarChart: detail };
		case "RESET_COMPARELIST":
				return { ...state, compare: [] };
		case "UPDATE_COMPARELIST":
				return { ...state, compare: action.payload };
		default:
			return state;
	}
};

export default vegetablesReducer;
