import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { vw, vh, vmin, vmax, getPercentWidth, getPercentHeight } from '../../utils/scale'
import * as Swastika from '../../components/swastika'
import { fetchDataModules } from "../../action/fetch-data/fetch-data";
import ModuleItemScreen from './ModuleItem';
import _ from 'lodash'

export class ModulesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            refreshing: false
        }

        let { params } = this.props.navigation.state;
        this.pageInfo = params.pageInfo;
        this.modulesData = null;
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.getDataJson();
    }

    componentWillReceiveProps(nextProps) {
        const { dataModules } = nextProps;
        if (dataModules) {
            const { isSucceed, data } = dataModules;
            if (isSucceed) {
                const { modules } = data
                // saveData('modules', modules)
                this.modulesData = modules;
                this.setState({
                    isLoading: false,
                    refreshing: false
                })
            }
        }
    }

    getDataJson() {
        this.props.fetchData({ id: this.pageInfo.id });
    }

    componentDidMount() {
        this.getDataJson();
    }

    render() {
        if (!this.state.isLoading) {
            // const data = this.state.jsonData
            return (
                <ScrollView style={{ flex: 1 }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />}>
                    {this.modulesData.map((entry, i) => {
                        return <ModuleItemScreen key={i} itemData={entry} />;
                    })
                    }
                </ScrollView>
            )
        } else {
            return (
                <View >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    let dataInfo = state.serviceReducer.dataInfo;
    if (!_.isEmpty(dataInfo)) {
        if (state.serviceReducer.responseKey == 'MODULES_URL')
            return {
                dataModules: dataInfo
            }
    }
    return {
        dataModules: null
    }
};
const mapDispatchToProps = (dispatch) => (
    {
        fetchData: (data) => dispatch(fetchDataModules(data)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ModulesScreen);