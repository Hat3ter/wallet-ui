const addCard = (card) => {
    return {
        type: 'ADD_NEW_CARD',
        card
    }
}

const appendCard = (card) => {
    return (dispatch) => {
        dispatch(addCard(card))
    }
}

const initCards = (cards) => {
    return (dispatch) => {
        dispatch({type: 'INIT_CARDS', cards: [...cards]})
    }
}
export {
    appendCard, initCards
}