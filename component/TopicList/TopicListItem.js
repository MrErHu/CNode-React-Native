import React,{Component} from 'react'
import {decorate as mixin} from 'react-mixin'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

// @mixin(PureRenderMixin)
class TopicListItem extends Component{

    constructor(props){
        super(props)
    }

    render(){
        const {
            title,content,create_at,last_reply_at,tab,author,reply_count,visit_count
        } = this.props;

        return (
            <View style={styles.container}>
                <View>
                    <Text>{'饿了么大前端 Node.js 进阶教程'}</Text>
                </View>
                <View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#FFF'
    }

})

export default TopicListItem