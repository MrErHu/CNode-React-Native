import React, {Component}from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Portal from '../../base/Portal'

class SliderMenu extends Component{

    constructor(props){
        super(props);

    }

    static showSliderMenuWithOptions (){
        const tag = Portal.allocateTag();
        Portal.showModal(tag, <SliderMenu
            key={tag}
        />)
    }

    render(){
        return (
            <View>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
                <Text>{'Hello World'}</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({

})

export default SliderMenu