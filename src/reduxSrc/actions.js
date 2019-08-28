export const actionTypes = {
    ADD_LIST: 'ADD_LIST',
}


export const addAction = (obj) => {
    return (dispatch, getStore) => {
        let contentAnswers = obj.map(contents=> contents.answers);
        dispatch({
            type: actionTypes.ADD_LIST,
            payload: contentAnswers
        })
    }
}


