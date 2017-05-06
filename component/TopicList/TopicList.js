import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    ListView,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import _ from 'lodash'
import {decorate as mixin} from 'react-mixin'
import TopicListItem from './TopicListItem'
import TopicListHelper from './TopicListHelper'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const initialState = {
    data: [],
    isFetching: true
}


@mixin(PureRenderMixin)
class TopicList extends Component {

    constructor(props) {
        super(props);
        this._renderTopicItem = this._renderTopicItem.bind(this)
        this._onEndReachedHandler = this._onEndReachedHandler.bind(this)
        this._renderFooterHandler = this._renderFooterHandler.bind(this)
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = initialState
        this.help = new TopicListHelper(props)
    }

    static propTypes = {
        limit: PropTypes.number,
        mdrender: PropTypes.bool,
        tab: PropTypes.string
    }

    static defaultProps = {}

    componentDidMount() {
        this.help.getData({
            page: this.state.data.length
        }).then(data=>{
            this.setState({
                data: this.state.data.concat(data),
                isFetching: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        this.help.updateHelper(nextProps);
        this.setState(initialState)
    }

    render() {
        const {data} = this.state
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.dataSource.cloneWithRows(data)}
                    renderRow={this._renderTopicItem}
                    enableEmptySections={true}
                    initialListSize={10}
                    onEndReachedThreshold={0}
                    onEndReached={this._onEndReachedHandler}
                    renderFooter={this._renderFooterHandler}
                />
            </View>
        )
    }

    _renderTopicItem(rowData) {
        if (_.isNil(rowData)) {
            return null;
        }
        return (
            <TopicListItem
                {...rowData}
            />
        );
    }

    _renderFooterHandler(){
        if(this.state.isFetching){
            return (
                <View style={styles.loadingContainer}>
                    <Image
                        source={require('../../asset/image/loading.gif')}
                        style={styles.loading}
                    />
                </View>
            )
        }else {
            return null;
        }
    }

    _onEndReachedHandler() {
        this.setState({
            isFetching: true
        })
        this.help.getData({
            page: this.state.data.length
        }).then(data=>{
            this.setState({
                data: this.state.data.concat(data),
                isFetching: false
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },
    loadingContainer: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: 20,
        height: 20
    }
})

export default TopicList