import {combineReducers} from  'redux-immutablejs'

import topicList from './topicList'

const reducer = combineReducers({
    topicList
});

export default reducer