import React,{Component}from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet
} from 'react-native'
import MessageItem from './MessageItem'

class MessageList extends Component{

    constructor(props){
        super(props)
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this._renderRow = this._renderRow.bind(this)

    }

    render(){
        return(
            <ListView
                enableEmptySections={true}
                dataSource={this.dataSource.cloneWithRows(this.props.data)}
                renderRow={this._renderRow}
            />
        )
    }

    _renderRow(rowData){
        return (
            <MessageItem
                {...rowData}
            />
        )
    }
}

const styles = StyleSheet.create({
})

export default MessageList
