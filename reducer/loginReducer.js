import Immutable from 'immutable'
import * as ActionTypes from '../action/ActionTyps/loginActionTypes'

const initialState = Immutable.fromJS({
    isLogin: false
});

export default ($topicList = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return Immutable.fromJS({
                isLogin: true,
                ...action.data
            })
        case ActionTypes.LOGOUT:
            return initialState
        default:
            return $topicList
    }
}