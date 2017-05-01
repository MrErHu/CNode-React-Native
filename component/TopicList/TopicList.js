import React, {Component, PropTypes}from 'react'
import {
    View,
    Text,
    ListView,
    Image,
    ScrollView,
    StyleSheet,
}
    from 'react-native'
import _ from 'lodash'
import TopicListItem from './TopicListItem'


class TopicList extends Component {

    constructor(props) {
        super(props);
        this._renderTopicItem = this._renderTopicItem.bind(this)
        this._onEndReachedHandler = this._onEndReachedHandler.bind(this)
        this._renderFooterHandler = this._renderFooterHandler.bind(this)
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
    }

    static propTypes = {}

    static defaultProps = {}

    componentDidMount() {
        const {actions, options} = this.props;
        actions.fetchTopicList(options);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.options.tab != nextProps.options.tab){
            const {actions, options} = this.props;
            actions.fetchTopicList(nextProps.options);
        }
    }

    render() {
        const {data} = this.props;
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

    _onEndReachedHandler() {
        if (this.props.data.length > 0) {
            const {actions, options} = this.props;
            actions.fetchTopicList(options);
        }
    }

    _renderFooterHandler(){
        if(this.props.isFetching){
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