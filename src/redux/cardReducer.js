const initialState = []

export default (state = initialState, action) => {

    const sort = (arr) => {
        return arr.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    switch (action.type) {

        case 'ADD_NEW_CARD':
            console.log(`ADD_NEW_CARD`);
            return sort([...state, action.card]);
        case 'CHANGE_CARD':
            console.log(`CHANGE_CARD`);
            return sort([...state, action.card]);
        case 'INIT_CARDS' :
            console.log('INIT_CARDS');
            return sort([...action.cards]);
        default:
            return state;
    }
}