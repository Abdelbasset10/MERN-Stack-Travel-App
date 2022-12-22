import { OPEN_MODAL, CLOSE_MODAL, IS_UPDATE_POST } from "./actionTypes"

const initialState = {
    isModal : false,
    isUpdatePost:false,
    postId:null
}

const modalReducer = (state=initialState,action) => {
    switch(action.type){
        case OPEN_MODAL : 
            return {...state,isModal:true}
        case CLOSE_MODAL : 
            return {...state,isModal:false,isUpdatePost:false,postId:null}
        case IS_UPDATE_POST : 
            return {...state, isUpdatePost : true,postId:action.payload}    
        default : return state    
    }
}

export default modalReducer