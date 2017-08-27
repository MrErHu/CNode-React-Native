import React, {Component, PropTypes}from 'react'
import {
    View,
    ListView,
    Image,
    Text,
    Animated,
    ScrollView,
    StyleSheet,
    RefreshControl
} from 'react-native'
import _ from 'lodash'
import {decorate as mixin} from 'react-mixin'
import TopicListItem from './TopicListItem/TopicListItem'
import TopicListHelper from './TopicListHelper'
import Icon from '../../base/Icon'
import IconButton from '../../base/IconButton'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {night, light}from './style'

@mixin(PureRenderMixin)
class TopicList extends Component {

    constructor(props, context) {
        super(props, context);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = {
            data: [],
            refresh: false,
            reachEnd: false,
            isFetching: true,
            rotateValue: new Animated.Value(0)
        };

        this.listEndListY = null
        this.help = new TopicListHelper(props)

        this._refreshList = this._refreshList.bind(this)
        this._onScrollHandler = this._onScrollHandler.bind(this)
        this._renderTopicItem = this._renderTopicItem.bind(this)
        this._onEndReachedHandler = this._onEndReachedHandler.bind(this)
        this._renderFooterHandler = this._renderFooterHandler.bind(this)
    }

    static propTypes = {
        limit: PropTypes.number,
        mdrender: PropTypes.bool,
        tab: PropTypes.string
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tab !== this.props.tab) {
            this.help.updateHelper(nextProps)
            this.setState({
                data: [],
                isFetching: true
            });
            this.help.getData({
                page: this.props.limit
            }).then(data => {
                this.setState({
                    data: this.state.data.concat(data),
                    isFetching: false
                })
            })
        }

    }

    componentWillMount() {
        this._gestureHandlers = {
            onStartShouldSetResponder: () => true,
            onMoveShouldSetResponder: () => true,
            onResponderRelease: (event) => {
                if (this.state.reachEnd) {
                    this.listEndListY = null
                    this.state.rotateValue.setValue(0);
                    this.setState({
                        isFetching: true
                    })
                    this.help.getData({
                        page: this.state.data.length
                    }).then(data => {
                        this.setState({
                            data: this.state.data.concat(data),
                            isFetching: false,
                            reachEnd: false
                        })
                    })
                }
            }
        }
    }

    componentDidMount() {
        this.help.getData({
            page: this.state.data.length
        }).then(data => {
            this.setState({
                data: this.state.data.concat(data),
                isFetching: false
            })
        })
    }

    render() {
        const {data} = this.state
        const loading = _.isEmpty(this.state.data);
        const styles = this.props.setting.night ? night : light;
        return (
            <View>
                <View style={styles.container}>
                    <ListView
                        {...this._gestureHandlers}
                        style={styles.listView}
                        dataSource={this.dataSource.cloneWithRows(data)}
                        renderRow={this._renderTopicItem}
                        enableEmptySections={true}
                        initialListSize={10}
                        onEndReachedThreshold={0}
                        onEndReached={this._onEndReachedHandler}
                        renderFooter={this._renderFooterHandler}
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={this._refreshList}
                            title="下拉刷新"
                          />
                        }
                        onScroll={this._onScrollHandler}
                    />
                    {
                        !loading && (
                            <View style={styles.addTopic}>
                                <IconButton
                                    name="add-topic"
                                />
                            </View>
                        )
                    }
                </View>
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
                night={this.props.setting.night}
            />
        );
    }

    _renderFooterHandler() {
        const styles = this.props.setting.night ? night : light;

        if (this.state.isFetching) {
            return (
                <View style={styles.loadingContainer}>
                    <Image
                        source={require('../../asset/image/loading.gif')}
                        style={styles.loading}
                    />
                </View>
            );
        }
        return (
            <View
                style={styles.downArrowContainer}
            >
                <Animated.View
                    style={{
                         transform: [{
                             rotate: this.state.rotateValue.interpolate({
                                 inputRange: [0,1],
                                 outputRange: ['0deg', '180deg']
                             })
                         }]
                    }}
                >
                    <Icon
                        name={'down-arrow'}
                        color={this.props.setting.night? '#FFF': '#000'}
                    />
                </Animated.View>
                <Text style={styles.font}>{this.state.reachEnd ? '释放刷新' :'上拉刷新'}</Text>
            </View>
        )
    }

    _onScrollHandler(event) {
        if (this.listEndListY) {
            if (event.nativeEvent.contentOffset.y - this.listEndListY > 20) {
                Animated.timing(this.state.rotateValue, {
                    duration: 100,
                    toValue: 1
                }).start();
                this.setState({
                    reachEnd: true
                })
            } else if (event.nativeEvent.contentOffset.y - this.listEndListY < 10) {
                Animated.timing(this.state.rotateValue, {
                    duration: 100,
                    toValue: 0
                }).start();
                this.setState({
                    reachEnd: false
                })
            }
        }
    }

    _refreshList() {
        this.setState({
            refresh: true,
        },()=>{
            this.help.getData({
                page: 0
            }).then(data => {
                this.setState({
                    data: data.slice(0),
                    refresh: false
                })
            })

        })
    }

    _onEndReachedHandler(event) {
        this.listEndListY = event.nativeEvent.contentOffset.y;
    }
}

export default TopicList