import Immutable from 'immutable'
import * as ActionTypes from '../action/ActionTyps/settingActionTypes'

const initialState = Immutable.fromJS({
    night: false
});

export default (state = initialState, action) => {
    switch (action.type){
        case ActionTypes.SET_NIGHT:
            return state.set('night', action.status);
        default:
            return state;
    }
}