import React, {Component, PropTypes} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import moment from 'moment'
import HTMLView from '../../../base/HtmlView/HtmlView';
import ButtonView from '../../../base/ButtonView'
import IconButton from '../../../base/IconButton'
import {URL_PREFIX} from '../../../constant/Constant'
import {post} from '../../../utils/network'
import CommentInput from '../../../base/CommentInput'
import {night,light} from './style'

class TopicComment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            is_uped: props.is_uped,
            upNum: props.ups.length
        }
        this._checkIsLogin = this._checkIsLogin.bind(this)
        this._upButtonHandler = this._upButtonHandler.bind(this)
        this._directUserDetail = this._directUserDetail.bind(this)
        this._commentButtonHandler = this._commentButtonHandler.bind(this)
    }

    static contextTypes = {
        navigation: PropTypes.object
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.is_uped !== this.state.is_uped) {
            this.setState({
                is_uped: nextProps.is_uped
            })
        }
    }

    render() {
        const {author, create_at, content, is_uped, ups} = this.props;
        const styles = this.props.setting.night ? night : light;
        return (
            <View style={styles.commentContainer}>
                <View style={styles.avatarView}>
                    <ButtonView
                        effect={ButtonView.EFFECT.DEFAULT}
                        onPress={this._directUserDetail}
                    >
                        <Image
                            style={styles.avatar}
                            source={{uri: `${author.avatar_url}`}}
                        />
                    </ButtonView>
                </View>
                <View style={styles.rightView}>
                    <View style={styles.rightTopContainer}>
                        <View>
                            <View style={styles.rightTopView}>
                                <Text style={[styles.nameText,styles.font]}>{author.loginname}</Text>
                            </View>
                            <View>
                                <Text style={styles.timeText}>{moment(create_at).format('YYYY-M-D H:k')}</Text>
                            </View>
                        </View>
                        <View style={styles.operations}>
                            <View style={styles.praiseContainer}>
                                <IconButton
                                    name="praise"
                                    control={true}
                                    selected={this.state.is_uped}
                                    onPress={this._upButtonHandler}
                                />
                                {
                                    this.state.upNum === 0 ? null :
                                        <Text style={[styles.timeText,{marginLeft: 5}]}>{this.state.upNum}</Text>
                                }
                            </View>
                            <IconButton
                                name='comment'
                                style={{marginLeft: 5}}
                                onPress={this._commentButtonHandler}
                            />
                        </View>
                    </View>
                    <View >
                        <HTMLView
                            value={content}
                            night={this.props.setting.night}
                        />
                    </View>
                </View>
            </View>
        )
    }

    _upButtonHandler() {
        if (!this._checkIsLogin()) {
            return;
        }
        this.operatorUp().then((action) => {
            let is_uped = false
            if (action === 'up') {
                is_uped = true
            }
            this.setState({
                is_uped,
                upNum: is_uped ? this.state.upNum + 1 : this.state.upNum - 1
            })
        })
    }

    _commentButtonHandler() {
        if (!this._checkIsLogin()) {
            return;
        }
        const {topicId, id, login} = this.props;
        CommentInput.showCommentInput({
            accessToken: login.accessToken,
            replyId: id,
            topicId: topicId,
            refresh: ()=>{
                this.props.refresh()
            }
        });
    }


    _checkIsLogin() {
        const {login} = this.props;
        if (!login.isLogin) {
            this.context.navigation.navigate('Login');
            return false
        }
        return true
    }

    async operatorUp() {
        const {login, id} = this.props;
        const url = URL_PREFIX + `/reply/${id}/ups`
        const data = await post(url, {accesstoken: login.accessToken})
        if (data.success) {
            return data.action
        }
    }

    _directUserDetail() {
        const {navigation} = this.context
        const {author} = this.props
        navigation.navigate('UserContent', {
            title: `${author.loginname}的主页`,
            userName: author.loginname
        })
    }
}

export default TopicComment