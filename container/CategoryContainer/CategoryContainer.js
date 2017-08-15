import React, {Component}from 'react'
import {
    Image,
    StyleSheet,
}from 'react-native'
import SliderMenu from '../../component/SliderMenu'
import {updateTab} from '../../action/topicListAction'
import {logout} from '../../action/loginAction'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import IconButton from '../../base/IconButton'

class Category extends Component {

    constructor(props) {
        super(props)
        this._iconButtonPressHandler = this._iconButtonPressHandler.bind(this)
    }

    render() {
        return (
            <IconButton
                name="category"
                size={20}
                style={styles.category}
                onPress={this._iconButtonPressHandler}
            />
        )
    }

    _iconButtonPressHandler() {
        const {tab, actions, login, navigation, setting} = this.props;
        SliderMenu.showSliderMenuWithOptions({
            tab,
            login,
            actions,
            navigation,
            night: setting.night
        });
    }
}

const styles = StyleSheet.create({
    category: {
        marginLeft: 15,
        marginTop: 5
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        tab: state.getIn(['topicList', 'tab']),
        login: state.get('login').toJS(),
        setting: state.get('setting').toJS(),
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {updateTab, logout}
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)