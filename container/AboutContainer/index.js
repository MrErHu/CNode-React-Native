import {connect} from 'react-redux'
import About from '../../component/About'

const mapStateToProps = (state) =>{
    return state.get('setting').toJS();
}

export default connect(mapStateToProps)(About)