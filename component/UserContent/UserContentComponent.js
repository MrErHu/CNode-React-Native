import React,{Component,PropTypes} from 'react'
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
moment.locale('zh-cn')

class UserContentComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            display: "recent_topics"
        }
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this._onButtonViewHandler = this._onButtonViewHandler.bind(this)
    }

    render(){
        const {avatar_url,loginname,create_at,score} = this.props;
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
                        <TouchableWithoutFeedback
                            style={styles.buttonView}
                            onPress={this._onButtonViewHandler.bind(this,"recent_topics")}
                        >
                            <View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >最近创建
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            style={styles.buttonView}
                            onPress={this._onButtonViewHandler.bind(this,"recent_replies")}
                        >
                            <View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >最近回复
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
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

    _onButtonViewHandler(display){
        this.setState({
            display
        })
    }

    _renderRow(rowData, sectionID, rowID){
        return(
            <View style={styles.topicItem}>
                <Text>{rowData.title}</Text>
            </View>
        )
    }
}

export default UserContentComponent

const styles = StyleSheet.create({
    userContentContainer:{
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
    userBottomText: {

    },
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
        alignItems: 'center'
    },
    topicContainer:{
        flex: 1
    },
    topicItem: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#666'
    }
})

