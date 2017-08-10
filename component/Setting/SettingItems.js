import React,{Component}from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

class SettingItems extends Component{


    render(){
        return(
            <View style={styles.items}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    items: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: "#E5E5E5",
        height: 40
    }
});

export default SettingItems;