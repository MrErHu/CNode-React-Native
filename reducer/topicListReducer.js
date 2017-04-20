import Immutable from 'immutable'
import * as ActionTypes from '../action/ActionTyps/topicListActionTypes'
import * as TabTypes from '../constant/TabTypes'

const initialState = Immutable.fromJS({
    tab: TabTypes.all,
    limit: 20,
    mdrender: false,
    isFetching: false,
    updateAt: Date.now(),
    data: {
        share: [],
        good: [],
        job: [],
        ask: []
    }
});

export default ($topicList = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_TAB:
            return $topicList.set('tab', action.tab)
        case ActionTypes.REQUEST_TOPICLIST:
            return $topicList.set('isFetching', true)
        case ActionTypes.RECEIVE_TOPICLIST:
            $topicList = $topicList.set('isFetching', false);
            $topicList = $topicList.set('updateAt', Date.now());
            $topicList.getIn(['data', $topicList.get('tab')]).concat(Immutable.fromJS(action.data));
            return $topicList.getIn(['data', $topicList.get('tab')]).concat(Immutable.fromJS(action.data));
        default:
            return $topicList
    }
}