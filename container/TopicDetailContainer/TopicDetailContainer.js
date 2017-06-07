import {connect} from 'react-redux'
import TopicDetail from '../../component/TopicDetail'

const mapStateToProps = (state,ownProps)=>{
    return {
        login: state.get('login').toJS()
    }
}

export default connect(mapStateToProps)(TopicDetail)