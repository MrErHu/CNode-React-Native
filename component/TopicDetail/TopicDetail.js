import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    ScrollView,
    ListView,
    StyleSheet,
}from 'react-native'
import HTMLView from './HtmlView';
import {headerStyle} from '../../constant/Constant'
import TopicDetailHelper from './TopicDetailHelper'
import TopicComment from './TopicComment'

import Header from './Header'

class TopicDetail extends Component {

    constructor(props) {
        super(props)
        this._helper = new TopicDetailHelper()
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this._getData = this._getData.bind(this)
        this._renderCommentRow = this._renderCommentRow.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerStyle: headerStyle,
        }
    }

    static childContextTypes = {
        navigation: PropTypes.object
    }

    getChildContext() {
        return {
            navigation: this.props.navigation
        }
    }

    componentWillMount() {
        this._getData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== this.props.login) {
            this._getData()
        }
    }

    render() {
        if (!this.state) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        const {title, content, replies} =this.state.data
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Header
                        login={this.props.login}
                        {...this.state.data}
                    />
                    <View style={styles.titleContainer}>
                        <Text
                            style={styles.title}
                        >
                            {title}
                        </Text>
                    </View>
                    <View style={styles.detailContent}>
                        <HTMLView
                            value={content}
                        />
                    </View>
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

    _getData() {
        const {topicId} = this.props.navigation.state.params
        const {isLogin, accessToken:accesstoken} = this.props.login
        const options = !isLogin ? {} : {accesstoken}
        this._helper.getData(topicId, options).then((data) => {
            this.setState({
                data: data
            })
        })
    }

    _renderCommentRow(rowData) {
        return (
            <TopicComment
                login={this.props.login}
                {...rowData}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
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
    },
    detailContent: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    }
})

export default TopicDetail