import React,{Component,PropTypes} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

class UserContentComponent extends Component{

    constructor(props){
        super(props)
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
                    <Text>Content</Text>
                </View>
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
        flex: 3
    },

})

const data = {"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120","githubUsername":"alsotang","create_at":"2012-09-09T05:26:58.319Z","score":14420,"recent_topics":[{"id":"5843092c3ebad99b336b1d48","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"使用 generator 按行读取文件的库，co-readline","last_reply_at":"2016-12-04T13:57:30.730Z"},{"id":"58351689bde2b59e06141e9f","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"【腾讯】各种岗位均可内推，前后端均可","last_reply_at":"2017-05-19T09:53:54.142Z"},{"id":"580ddc2eeae2a24f34e67e69","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"这，就是技术人的江湖","last_reply_at":"2016-12-26T09:56:28.855Z"},{"id":"580460a5fdf3bd3d651186d1","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"推荐你心中的CNode「极客代言人」，打造《中国技术社群英雄谱》","last_reply_at":"2016-10-24T04:09:13.002Z"},{"id":"57ee19c93670ca3f44c5bfde","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"从url中解析出域名、子域名和有效顶级域名","last_reply_at":"2017-04-11T01:47:09.793Z"},{"id":"57e917e2bb55ef3e1a17fcbd","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"https 免费证书获取指引","last_reply_at":"2016-09-28T06:22:52.728Z"},{"id":"57e2520a7e77820e3acfe0ed","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"【深圳】腾讯云 CDN 前端团队诚招高级工程师","last_reply_at":"2016-11-17T13:21:42.774Z"},{"id":"57c6a1d492fad7e46b4169b5","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"一个模块：forceinterval，可无缝替换许多 setInterval 的场景","last_reply_at":"2016-08-31T10:17:33.671Z"},{"id":"5759bef0e5fa62531af6e151","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"async/await 比 yield 好在哪里？","last_reply_at":"2016-06-22T11:31:49.232Z"},{"id":"572afb6b15c24e592c16e1e6","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"新的社区推荐客户端：Noder","last_reply_at":"2016-07-07T13:24:42.321Z"},{"id":"570924d294b38dcb3c09a7a0","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"timer 的 unref 函数","last_reply_at":"2016-12-08T16:22:09.653Z"},{"id":"570907402a1f230a25be8aab","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"【深圳】NodeParty 2016.04.09 总结","last_reply_at":"2016-05-04T07:03:08.211Z"},{"id":"56f364c7532839c33a99d17e","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"【深圳】NodeParty at 腾讯大厦 2016.04.09","last_reply_at":"2016-04-09T07:31:57.629Z"},{"id":"56a3c5d77ec020ed4b96b2cc","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"微博上前端撕得那么狠，没撕到我们 Node 社区来....","last_reply_at":"2016-08-12T20:12:36.031Z"},{"id":"565c6973c4fa25cb27cc3c81","author":{"loginname":"alsotang","avatar_url":"https://avatars2.githubusercontent.com/u/1147375?v=3&s=120"},"title":"js 中文字符串判断（根据 unicode 编码区间判断）","last_reply_at":"2016-08-31T10:05:26.532Z"}],"recent_replies":[{"id":"592175c63504ce1c2ac45e9b","author":{"loginname":"i5ting","avatar_url":"https://avatars0.githubusercontent.com/u/3118295?v=3&s=120"},"title":"关于创业：叫不醒一个想做梦的人","last_reply_at":"2017-05-22T13:31:43.164Z"},{"id":"591d8866ba8670562a40f296","author":{"loginname":"classfellow","avatar_url":"https://avatars3.githubusercontent.com/u/7146748?v=3&s=120"},"title":"介绍一次 c/python/node的性能对比","last_reply_at":"2017-05-21T13:40:14.157Z"},{"id":"59192424ba8670562a40f10b","author":{"loginname":"youwi","avatar_url":"https://avatars1.githubusercontent.com/u/5918054?v=3&s=120"},"title":"import语法什么时候开始支持呀? 分裂了都","last_reply_at":"2017-05-18T01:24:07.609Z"},{"id":"5915d78c3504ce1c2ac45bcb","author":{"loginname":"q86002618","avatar_url":"https://avatars0.githubusercontent.com/u/23697209?v=3&s=120"},"title":"朴灵大大的书好难看懂","last_reply_at":"2017-05-15T11:48:09.828Z"},{"id":"59112d5a9e32cc84569a6c97","author":{"loginname":"liygheart","avatar_url":"https://avatars1.githubusercontent.com/u/6915570?v=3&s=120"},"title":"给CNodeJS站写了一个站内通知的脚本，有兴趣的可以装一下","last_reply_at":"2017-05-10T03:28:14.257Z"}]}

