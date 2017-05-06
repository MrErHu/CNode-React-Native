import {combineReducers} from  'redux-immutablejs'

import topicList from './topicListReducer'
import login from './loginReducer'

const reducer = combineReducers({
    topicList,
    login
});

export default reducer