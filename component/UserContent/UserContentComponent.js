import React, {Component, PropTypes} from 'react'
import {
    View,
    Image,
    Text,
    ListView,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import moment from 'moment'
import 'moment/locale/zh-cn'
import ButtonView from '../../base/ButtonView'

moment.locale('zh-cn')

const keyToName = {
    recent_topics: '最近创建',
    recent_replies: '最近回复',
    topic_collect: '收藏'
}

class UserContentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: "recent_topics"
        }
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this._onButtonViewHandler = this._onButtonViewHandler.bind(this)
    }

    render() {
        const {avatar_url, loginname, create_at, score} = this.props;
        return (
            <View style={styles.userContentContainer}>
                <View style={styles.userAvatarContainer}>
                    <Image
                        style={styles.userAvatar}
                        source={{uri: `${avatar_url}`}}
                    />
                    <View style={styles.userTextContainer}>
                        <Text style={styles.userName}>{loginname}</Text>
                        <Text style={styles.userBottomText}>
                            <Text style={styles.userTime}>创建于:{moment(create_at).locale('de').format('ll')}   </Text>
                            <Text style={styles.userScore}>积分:{score}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.topicItemContainer}>
                    <View style={styles.buttonGroup}>
                        {
                            Object.keys(keyToName).map((key, index) => {
                                return (
                                    <ButtonView
                                        key={index}
                                        style={styles.buttonView}
                                        effect={ButtonView.EFFECT.DEFAULT}
                                        selected={key=== this.state.display}
                                        selectedStyle={styles.selectedStyle}
                                        onPress={this._onButtonViewHandler.bind(this,key)}
                                    >
                                        <Text style={styles.buttonText}>
                                            {keyToName[key]}
                                        </Text>
                                    </ButtonView>
                                )
                            })
                        }
                    </View>
                    <View style={styles.topicContainer}>
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.props[this.state.display])}
                            renderRow={this._renderRow}
                        />
                    </View>
                </View>
            </View>
        )
    }

    _onButtonViewHandler(display) {
        this.setState({
            display
        })
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <ButtonView
                style={styles.topicItem}
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
}

export default UserContentComponent

const styles = StyleSheet.create({
    userContentContainer: {
        flex: 1
    },
    userAvatarContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 15
    },
    userTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userBottomText: {},
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10
    },
    userTime: {
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userScore: {
        fontSize: 12,
        marginRight: 20
    },
    topicItemContainer: {
        flex: 3,
        flexDirection: 'column'
    },
    buttonGroup: {
        height: 50,
        flexDirection: 'row'
    },
    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#666'
    },
    topicContainer: {
        flex: 1
    },
    topicItem: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    },
    selectedStyle: {
        borderBottomWidth: 4,
        borderBottomColor: '#387ef5'
    }
})

