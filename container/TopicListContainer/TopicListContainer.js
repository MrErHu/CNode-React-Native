import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../action/topicListAction'
import TopicList from '../../component/TopicList'


const mapStateToProps = (state,ownProps) =>{
    const {limit,mdrender,tab,data,isFetching} = state.get('topicList').toJS()
    const page = data[tab].length;
    const options = {
        limit,
        mdrender,
        tab,
        page
    };
    return {
        options,
        data: data[tab],
        isFetching: isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TopicList)

