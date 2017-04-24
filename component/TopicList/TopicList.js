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

import TopicListItem from './TopicListItem'
import _ from 'lodash'

class TopicList extends Component {

    constructor(props) {
        super(props);
        this._renderTopicItem = this._renderTopicItem.bind(this)
        this._onEndReachedHandler = this._onEndReachedHandler.bind(this)
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
    }

    render() {
        const {data, isFetching} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View>
                    <ListView
                        dataSource={this.dataSource.cloneWithRows(data)}
                        renderRow={this._renderTopicItem}
                        enableEmptySections={true}
                        initialListSize={10}
                        onEndReachedThreshold={5}
                        onEndReached={this._onEndReachedHandler}
                    />
                </View>
                {
                    !isFetching ? null : (
                            <View style={styles.loadingContainer}>
                                <Image
                                    source={require('../../asset/image/loading.gif')}
                                    style={styles.loading}
                                />
                            </View>
                        )
                }
            </ScrollView>
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: 20,
        height: 20
    }
})

export default TopicList