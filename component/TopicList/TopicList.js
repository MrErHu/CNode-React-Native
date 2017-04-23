import React,{Component,PropTypes}from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
} from 'react-native'

import TopicListItem from './TopicListItem'
import _ from 'lodash'

class TopicList extends Component{

    constructor(props){
        super(props);
        this._renderTopicItem = this._renderTopicItem.bind(this)
        this._onEndReachedHandler = this._onEndReachedHandler.bind(this);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
    }

    static propTypes = {

    }

    static defaultProps = {
        
    }

    componentDidMount(){
        const {actions,options} = this.props;
        actions.fetchTopicList(options);
    }

    componentWillReceiveProps(nextProps){
    }

    render(){
        const {data} = this.props;
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.dataSource.cloneWithRows(data)}
                    renderRow={this._renderTopicItem}
                    enableEmptySections={true}
                    initialListSize={10}
                    onEndReachedThreshold={5}
                    onEndReached={this._onEndReachedHandler}
                />
            </View>
        )
    }

    _renderTopicItem(rowData){
        if(_.isNil(rowData)){
            return null;
        }
        return (
            <TopicListItem
                {...rowData}
            />
        );
    }

    _onEndReachedHandler(){
        const {actions,options} = this.props;
        actions.fetchTopicList(options);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    }
})

export default TopicList