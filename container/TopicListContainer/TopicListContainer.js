import TopicList from '../../component/TopicList'
import {connect} from 'react-redux'

const mapStateToProps = (state,ownProps) =>{
    return {
        topicList: state.get('topicList')
    }
}

export default connect(mapStateToProps)(TopicList)

