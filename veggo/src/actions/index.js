// What should the reducer do
export const search = (text) => {
    return {
        type: 'SEARCH',
        payload: text
    }
}

export const add_compare = (id) => {
    return {
        type: 'ADD_COMPARE',
        payload: id
    }
}

export const remove_compare = (id) => {
    return {
        type: 'REMOVE_COMPARE',
        payload: id
    }
}

export const get_details = (id) => {
    return {
        type: 'GET_DETAILS',
        payload: id
    }
}

export const reset_comparelist = () => {
    return {
        type: "RESET_COMPARELIST"
    }
}

export const update_comparelist = (list) => {
    return {
        type: "UPDATE_COMPARELIST",
        payload: list
    }
}

export const update_filter = (variable) => {
    return {
        type: "UPDATE_FILTER_VARIABLE",
        payload: variable
    }
}
