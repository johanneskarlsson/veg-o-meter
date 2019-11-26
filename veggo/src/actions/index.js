// What should the reducer do
export const search = (text) => {
    return {
        type: 'SEARCH',
        payload: text
    }
}