
import axios from 'axios';

export const actionTypes = {
    ADD_LIST: 'ADD_LIST',
    DRAG: 'DRAG',
    CHANGE: 'CHANGE',
    DROP: 'DROP'
}
const loaderF = () => {

    return (dispatch, getStore) => {
        let obj
        axios.get('https://api.jotform.com/form/92382295350964/submissions?apikey=a253771ef3dcbe5c953f78dc816f3a67&orderby=id')
            .then(response => {
                obj = response.data.content

                let contentAnswers = obj//.map(contents=> {return (contents.id,contents.answers)});
                dispatch({
                    type: actionTypes.ADD_LIST,
                    payload: contentAnswers
                })

            })
    }
}

export const addAction = () => {
    return loaderF()
}


export const dragAction = (obj) => {
    return (dispatch, getStore) => {
        let contentAnswers = obj//.map(contents=> {return (contents.id,contents.answers)});
        dispatch({
            type: actionTypes.DRAG,
            payload: contentAnswers
        })
    }
}

export const dropAction = (obj) => {
    return (dispatch, getStore) => {
        let contentAnswers = obj//.map(contents=> {return (contents.id,contents.answers)});
        dispatch({
            type: actionTypes.DROP,
            payload: contentAnswers
        })
    }
}

export const changeList = (sel, list, ff) => {
    let obj = {
        to: list,
        id: sel
    }
    return (dispatch, getStore) => {

        dispatch({
            type: actionTypes.CHANGE,
            payload: obj
        })

        axios.post('https://api.jotform.com/submission/' + sel + '?apikey=06a98bca3409d21345b9cdb8872a6222',
            {
                5: list
            }).then(response => {

                ff()
            })

    }
}


