import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    ScrollView,
    ListView
}from 'react-native'
import HTMLView from '../../base/HtmlView';
import {headerStyle, headerTitleStyle, headerBackTitleStyle} from '../../constant/Constant'
import TopicDetailHelper from './TopicDetailHelper'
import TopicComment from './TopicComment/TopicComment'
import {night,light} from './styles'

import Header from './Header/Header'

class TopicDetail extends Component {

    constructor(props) {
        super(props)
        this._helper = new TopicDetailHelper()
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this._getData = this._getData.bind(this)
        this._renderCommentRow = this._renderCommentRow.bind(this)
        this._refreshDetail = this._refreshDetail.bind(this)
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerStyle: headerStyle,
            headerTitleStyle,
            headerBackTitleStyle
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
        const styles = this.props.setting.night ? night: light;

        if (!this.state) {
            return (
                <View style={styles.container}>
                    <Text style={styles.font}>Loading...</Text>
                </View>
            )
        }

        const {title, content, replies} =this.state.data
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Header
                        setting={this.props.setting}
                        login={this.props.login}
                        {...this.state.data}
                    />
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title,styles.font]}
                        >
                            {title}
                        </Text>
                    </View>
                    <View style={styles.detailContent}>
                        <HTMLView
                            night={this.props.setting.night}
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
                topicId={this.state.data.id}
                refresh={this._refreshDetail}
                setting={this.props.setting}
                {...rowData}
            />
        )
    }

    _refreshDetail() {
        this._getData();
    }
}

export default TopicDetail