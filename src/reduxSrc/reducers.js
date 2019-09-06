import { actionTypes } from './actions';

const initialState = {
    alldata: 0,
    selected: 0,
    IDs: [],
    listToDo: [],
    listDoing: [],
    listDone: [],
}

function listReducers(state = initialState, action) {

    switch (action.type) {
        case actionTypes.ADD_LIST || actionTypes.EDIT: {
            const newState = Object.assign({}, state);
            newState.alldata = action.payload.reduce((acc, curr) => { acc[curr.id] = curr; return acc })
            console.log(action.payload)

            newState.IDs = action.payload.map(contents => {
                return contents['id']
            })

            const newListToDo = action.payload.filter(value => value.answers[5].answer == "To Do").map(x => x.id)
            const newListDoing = action.payload.filter(value => value.answers[5].answer == "Doing").map(x => x.id)
            const newListDone = action.payload.filter(value => value.answers[5].answer == "Done").map(x => x.id)

            newState.listToDo = newListToDo
            newState.listDoing = newListDoing
            newState.listDone = newListDone
            console.log('Red ', newState)
            return newState
        }



        case actionTypes.DRAG: {
            let newState = Object.assign({}, state);

            newState.selected = action.payload;

            return newState
        }

        case actionTypes.DROP: {
            let newState = Object.assign({}, state);

            newState.selected = 0;

            return newState
        }

        case actionTypes.CHANGE: {
            let newState = Object.assign({}, state);
            let id = action.payload.id;
            console.log('AAAAAAAAAAAAA',newState)
            let oldList = newState.alldata[id].answers[5].answer
            console.log(oldList)
            switch (oldList) {
                case "To Do": {
                    newState.listToDo=newState.listToDo.filter(e=>e!=id)
                    break
                }
                case "Doing": {
                    newState.listDoing=newState.listDoing.filter(e=>e!=id)
                    break
                }
                case "Done": {
                    newState.listDone=newState.listDone.filter(e=>e!=id)
                    break
                }
                default:{

                }
            }
            console.log(oldList,action.payload.to,'2')
            switch (action.payload.to) {
                case "To Do": {
                    newState.listToDo.push(id)
                    break
                }
                case "Doing": {
                    newState.listDoing.push(id)
                    break
                }
                case "Done": {
                    newState.listDone.push(id)
                    break
                }
                default:{
                    
                }
            }
            console.log('BBBBBBBBBBB',newState)
            return newState
        }

        default:
            return state;
    }
}




export default listReducers;