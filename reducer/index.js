import {combineReducers} from  'redux-immutablejs'

import topicList from './topicListReducer'
import login from './loginReducer'
import setting from './settingReducer'

const reducer = combineReducers({
    topicList,
    login,
    setting
});

export default reducer