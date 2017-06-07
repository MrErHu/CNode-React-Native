import React, {PropTypes, Component}from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import moment from 'moment'
import 'moment/locale/zh-cn'
import IconButton from '../../base/IconButton'
import {post} from '../../utils/network'
import {URL_PREFIX} from '../../constant/Constant'
moment.locale('zh-cn')

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            is_collect: props.is_collect
        }
        this._onPressHandler = this._onPressHandler.bind(this)
    }

    static contextTypes = {
        navigation: PropTypes.object
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            is_collect: nextProps.is_collect
        })
    }

    render() {
        const {author, create_at} = this.props;
        return (
            <View style={styles.headerContainer}>
                <Image
                    style={styles.avatar}
                    source={{uri: author.avatar_url}}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{author.loginname}</Text>
                    <Text style={styles.contentText}>创建于:{moment(create_at).locale('de').format('ll')}</Text>
                </View>
                <IconButton
                    name="favorite"
                    style={styles.favContainer}
                    selected={this.state.is_collect}
                    onPress={this._onPressHandler}
                />
            </View>
        );
    }

    _onPressHandler() {
        const {login, id} = this.props
        if (!login.isLogin) {
            this.setState({
                is_collect: this.state.is_collect
            })
            this.context.navigation.navigate('Login');
        } else {
            this.operateTopic().then((data) => {
                if (data.success) {
                    this.setState({
                        is_collect: !this.state.is_collect
                    })
                }
            })

        }
    }


    async operateTopic() {
        const {id, login} = this.props
        const body = {topic_id: id, accesstoken: login.accessToken}
        let url = URL_PREFIX + '/topic_collect/'
        url += this.state.is_collect ? 'de_collect': 'collect'
        const data = await post(url, body)
        return data
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    contentText: {
        fontSize: 12
    },
    favContainer: {
        marginLeft: 10,
        marginRight: 10
    }

})

export default Header