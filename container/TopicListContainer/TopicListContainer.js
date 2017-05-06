import {connect} from 'react-redux'
import TopicList from '../../component/TopicList'

const mapStateToProps = (state) =>{
    return {
        ...state.get('topicList').toJS()
    }
}

export default connect(mapStateToProps)(TopicList)

