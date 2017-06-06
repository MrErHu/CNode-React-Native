import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    ScrollView,
    ListView,
    StyleSheet,
}from 'react-native'
import {headerStyle} from '../../constant/Constant'
import TopicDetailHelper from './TopicDetailHelper'
import { MarkdownView } from 'react-native-markdown-view'
import TopicComment from './TopicComment'

import Header from './Header'

class TopicDetail extends Component {

    constructor(props) {
        super(props)
        this._helper = new TopicDetailHelper()
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerStyle: headerStyle,
        }
    }

    componentWillMount() {
        const {topicId} = this.props.navigation.state.params
        this._helper.getData(topicId).then((data) => {
            this.setState({
                data: data
            })
        })
    }

    render() {
        if (!this.state) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        const {title, content,replies} =this.state.data
        return (
            <View>
                <ScrollView style={styles.container}>
                    <Header
                        {...this.state.data}
                    />
                    <View style={styles.titleContainer}>
                        <Text
                            style={styles.title}
                        >
                            {title}
                        </Text>
                    </View>
                    <MarkdownView>{content}</MarkdownView>
                    <View style={styles.commentContainer}>
                        <ListView
                            enableEmptySections={true}
                            dataSource={this.dataSource.cloneWithRows(replies)}
                            renderRow={this._renderCommentRow}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

    _renderCommentRow(rowData){
        return (
            <TopicComment
                {...rowData}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingRight: 10
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentContainer: {
        paddingTop: 20,
    }
})

export default TopicDetail