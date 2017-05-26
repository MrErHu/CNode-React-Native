import React,{Component}from 'react'
import {
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
}from 'react-native'
import SliderMenu from '../../component/SliderMenu'
import {updateTab} from '../../action/topicListAction'
import {logout} from '../../action/loginAction'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Category extends Component{

    constructor(props){
        super(props)
    }

    render(){
        const {tab,actions,login,navigation} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={()=>{
                SliderMenu.showSliderMenuWithOptions({
                    tab,
                    login,
                    actions,
                    navigation
                });
            }}
            >
                <Image
                    source={require('../../asset/image/category.png')}
                    style={styles.category}
                />
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    category: {
        width: 20,
        height: 20,
        marginLeft: 15,
        marginTop: 5
    }
})

const mapStateToProps = (state,ownProps) =>{
    return {
        tab: state.getIn(['topicList','tab']),
        login: state.get('login').toJS(),
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {updateTab,logout}
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category)