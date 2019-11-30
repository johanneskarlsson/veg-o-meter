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