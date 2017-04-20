import {combineReducers} from  'redux-immutablejs'

import topicList from './topicListReducer'

const reducer = combineReducers({
    topicList
});

export default reducer