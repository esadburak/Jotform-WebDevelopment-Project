
import axios from 'axios';

export const actionTypes = {
    ADD_LIST: 'ADD_LIST',
    DRAG: 'DRAG',
    CHANGE: 'CHANGE',
    DELETE: 'DELETE',
    DROP: 'DROP',
    EDIT: 'EDIT',
    ORDER: 'ORDER'
}
const loaderF = () => {

    return (dispatch, getStore) => {
        let obj
        console.log(getStore().data.refreshable)
        if (getStore().data.refreshable)

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



export const dragAction = () => {
    return (dispatch, getStore) => {
        dispatch({
            type: actionTypes.DRAG,
        })
    }
}


export const editAction = (obj,ff) => {
    return (dispatch, getStore) => {
        dispatch({
            type: actionTypes.EDIT,
            payload: obj
        })
        console.log('edit')

        axios.post('https://api.jotform.com/submission/' + obj.sel + '?apikey=06a98bca3409d21345b9cdb8872a6222',
            {
                4: obj.title,
                3: obj.desc
            }).then(response => {
                ff()
            })
    }
}

export const dropAction = () => {
    return (dispatch, getStore) => {
        
        dispatch({
            type: actionTypes.DROP,
        })
    }
}


export const deleteAction = (sel, ff) => {
    return (dispatch, getStore) => {

        axios.delete('https://api.jotform.com/submission/' + sel + '?apikey=06a98bca3409d21345b9cdb8872a6222')
            .then(response => {

                ff()
            })
    }
}

export const changeList = (sel, list, ff) => {
    let obj = {
        to: list,
        id: sel
    }
    return (dispatch, getStore) => {

        axios.post('https://api.jotform.com/submission/' + sel + '?apikey=06a98bca3409d21345b9cdb8872a6222',
            {
                5: list
            }).then(response => {
                ff()
            })

    }
}


export const orderAction = (items, flag, ff, list) => {
    return (dispatch, getStore) => {
        dispatch({
            type: actionTypes.ORDER,
            payload: items,
            l: list
        })
        flag.forEach((x, n) => {
            if (x != 0)
                axios.post('https://api.jotform.com/submission/' + items[n] + '?apikey=06a98bca3409d21345b9cdb8872a6222',
                    {
                        7: n
                    }).then(e => { console.log(e); ff() })



        });


    }
}
