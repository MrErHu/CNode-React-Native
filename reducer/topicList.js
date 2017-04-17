 import Immutable from 'immutable'
 import * as ActionTypes from '../constant/ActionTypes'
 import * as TabTypes from '../constant/TabTypes'

 const initialState = Immutable.fromJS({
     tab: TabTypes.all,
     limit: 20,
     mdrender: false
 });

export default ($topicList = initialState,action) =>{
    switch (action.type){
        case ActionTypes.UPDATE_TAB:
            return $topicList.set('tab',action.tab)
        default:
            return $topicList
    }
}