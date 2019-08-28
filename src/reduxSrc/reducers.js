import { actionTypes } from './actions';

const initialState = {
    listToDo: [],
    listDoing: [],
    listDone: [],
}

function listReducers(state = initialState, action){

    switch (action.type) {
        case actionTypes.ADD_LIST:{
            const newState = Object.assign({},state);
            let newObjList=action.payload.map(contents=>{ 
                return {Desc : contents['3'].answer, Title: contents['4'].answer, List:contents['5'].answer}
            } )
        //    console.log('ww',newObjList)
            
           // console(newObjList[0]['Title'])
            const newListToDo=newObjList.filter(value=> value.List=="To Do")
            const newListDoing=newObjList.filter(value => value.List=="Doing")
            const newListDone=newObjList.filter(value => value.List=="Done")

            newState.listToDo=newListToDo
            newState.listDoing=newListDoing
            newState.listDone=newListDone
      //      console.log('Red ',newState)
            return newState
        }

        default:
            return state;
    }
}




export default listReducers;