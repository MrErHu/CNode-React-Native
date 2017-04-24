import {get} from '../utils/index'
import {URL_PREFIX} from '../constant/Constant'
import _ from 'lodash'
import * as ActionTypes from './ActionTyps/topicListActionTypes'

const updateTab = (tab) => ({
    type: ActionTypes.UPDATE_TAB,
    tab
})

const requestTopicList = () => ({
    type: ActionTypes.REQUEST_TOPICLIST
})

const receiveTopicList = (data)=> {
    return {
        type: ActionTypes.RECEIVE_TOPICLIST,
        data: data
    }
}

const fetchTopicList = (options) => {
    return (dispatch) => {
        dispatch(requestTopicList())
        let url = `${URL_PREFIX}/topics?`
        const keys = Object.keys(options);
        _.each(keys,(key,index)=>{
            url += `${key}=${options[key]}`
            url += index !== keys.length -1 ? `&` : '';
        })
        get(url).then((json)=>{
            dispatch(receiveTopicList(json.data))
        });
    }
}

export {
    updateTab,
    fetchTopicList
}