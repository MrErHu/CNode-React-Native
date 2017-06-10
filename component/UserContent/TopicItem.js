import React,{Component,PropTypes}from 'react'
import {
    Text,
    ListView,
    StyleSheet
} from 'react-native'
import ButtonView from '../../base/ButtonView'

class TopicItem extends Component{

    constructor(props){
        super(props)
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this._renderRow = this._renderRow.bind(this)
        this._navigateTopicDetail = this._navigateTopicDetail.bind(this)
    }

    static contextTypes = {
        navigation: PropTypes.object
    }

    render(){
        return (
            <ListView
                dataSource={this.ds.cloneWithRows(this.props.data)}
                renderRow={this._renderRow}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <ButtonView
                style={styles.topicItem}
                onPress={()=>{this._navigateTopicDetail(rowData)}}
            >
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {rowData.title}
                </Text>
            </ButtonView>
        )
    }

    _navigateTopicDetail(rowData) {
        const {navigation} = this.context
        const {id} = rowData
        navigation.navigate('TopicDetail', {
            title: '正文',
            topicId: id
        })
    }
}

const styles = StyleSheet.create({
    topicItem: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    }
})



export default TopicItem