import React,{Component}from 'react'
import {
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
}from 'react-native'
import SliderMenu from '../../component/SliderMenu'
import {connect} from 'react-redux'

class Category extends Component{

    constructor(props){
        super(props)
    }

    render(){
        const {tab} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={()=>{
                SliderMenu.showSliderMenuWithOptions({
                    tab: tab
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

export default connect(mapStateToProps)(Category)