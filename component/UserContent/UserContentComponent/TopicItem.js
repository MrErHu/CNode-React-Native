import React, {Component, PropTypes}from 'react'
import {
    Text,
    ListView,
    StyleSheet
} from 'react-native'
import ButtonView from '../../../base/ButtonView'
import {combineStyles} from '../../../utils'

class TopicItem extends Component {

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this._renderRow = this._renderRow.bind(this)
        this._navigateTopicDetail = this._navigateTopicDetail.bind(this)
    }

    static contextTypes = {
        navigation: PropTypes.object,
        setting: PropTypes.object
    }

    render() {
        return (
            <ListView
                dataSource={this.ds.cloneWithRows(this.props.data)}
                renderRow={this._renderRow}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        const styles = this.context.setting.night ? night : light;
        return (
            <ButtonView
                style={styles.topicItem}
                onPress={()=>{this._navigateTopicDetail(rowData)}}
            >
                <Text
                    style={styles.font}
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

const styles = {
    topicItem: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    },
    font: {}
}

const night = StyleSheet.create(combineStyles(styles,{
    font: {
        color: '#FFF'
    }
}))

const light = StyleSheet.create(combineStyles(styles,{
    font: {
        color: '#000'
    }
}))


export default TopicItem