import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from '../../component/Home'
import topicListAction from '../../action/topicListAction'

const mapStateToProps = (state) => {
    const topicList = state.get('topicList').toJS();
    const setting = state.get('setting').toJS();
    return {
        ...topicList,
        setting
    }
}

export default connect(mapStateToProps)(Home)

