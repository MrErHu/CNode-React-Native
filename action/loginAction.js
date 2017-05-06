import * as ActionTypes from './ActionTyps/loginActionTypes'

const login = (data)=>{
    return {
        type: ActionTypes.LOGIN,
        data: data
    }

}

const logout = ()=>{
    return {
        type: ActionTypes.LOGOUT
    }
}

export {
    login,
    logout
}