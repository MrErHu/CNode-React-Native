import {connect} from 'react-redux'
import Home from '../../component/Home'

const mapStateToProps = (state) => {
    const topicList = state.get('topicList').toJS();
    return {
        tab: topicList.tab
    }
}

export default connect(mapStateToProps)(Home)

