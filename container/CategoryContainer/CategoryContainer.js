import React,{Component}from 'react'
import {
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
}from 'react-native'
import SliderMenu from '../../component/SliderMenu'
import {updateTab} from '../../action/topicListAction'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Category extends Component{

    constructor(props){
        super(props)
    }

    render(){
        const {tab,actions} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={()=>{
                SliderMenu.showSliderMenuWithOptions({
                    tab,
                    actions
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

const mapStateToProps = (state) =>{
    return {
        tab: state.getIn(['topicList','tab'])
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
        updateTab
    }
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category)