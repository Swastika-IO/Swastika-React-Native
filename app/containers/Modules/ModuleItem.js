import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { vw, vh, vmin, vmax, getPercentWidth, getPercentHeight } from '../../utils/scale'
import * as Swastika from '../../components/swastika'
import { fetchDataModules } from "../../action/fetch-data/fetch-data";

function parserStyle(strStyle) {
    var newStyle = {};
    var characters = Object.keys(strStyle);
    characters.map(k => {
        let value = strStyle[k];
        if (typeof value === 'object') {
            newStyle[k] = parserStyle(value);
        } else if (typeof value === 'string') {
            if (value.indexOf('vh') !== -1) {
                var valueConvert = value.replace('vh', '');
                newStyle[k] = parseFloat(valueConvert) * vh;
            } else if (value.indexOf('vw') !== -1) {
                var valueConvert = value.replace('vw', '');
                newStyle[k] = parseFloat(valueConvert) * vw;
            } else if (value.indexOf('%') !== -1) {
                var valueConvert = value.replace('%', '');
                if (k.hasOwnProperty("width") || k.hasOwnProperty("Left") || k.hasOwnProperty("Right")) {
                    newStyle[k] = getPercentWidth(parseFloat(valueConvert));
                } else if (k.hasOwnProperty("height") || k.hasOwnProperty("Top") || k.hasOwnProperty("Bottom")) {
                    newStyle[k] = getPercentHeight(parseFloat(valueConvert));
                } else {
                    newStyle[k] = value;
                }
            } else {
                newStyle[k] = value;
            }
        } else {
            newStyle[k] = value;
        }
    });
    return newStyle;
}

var styleData
var jsonData;
var modelData;
var styleBootstrap;

//Chuyển đổi style name từ Css ra React Style names
function convertReactStyleNames(strData) {
    var newStyleName = [];
    if (strData) {
        let splitStyles = strData.split(' ')
        var index = 0;
        var fullStyleName = '';

        for (let styleName of splitStyles) {
            newStyleName[index] = styleName;
            fullStyleName = fullStyleName.concat(styleName)
            index++;
        }

        if (splitStyles.length > 1) {
            newStyleName[index] = fullStyleName;
        }
    }
    return newStyleName;
}


export class ModuleItemScreen extends React.Component {

    constructor(props) {
        super(props)
        this.initData(props)
    }

    initData(props) {
        this.itemData = this.props.itemData;
        this.contentView;
        this.ComponentType = Swastika.ComponentType;
        this.getDataToGenerate(this.itemData);
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps)
    }

    generateTag = (data, modelDataChild) => {
        let Arr = (data).map((entry, i) => {
            var test = this.ComponentType.View;
            switch (entry.componentType) {
                case this.ComponentType.View:
                    if (entry.dataType == 'background') {
                        return <Swastika.CustomImage key={i + 'CustomImage'}
                            generateTag={this.generateTag}
                            modelData={modelDataChild} dataValue={entry.dataValue}
                            getListStylesByStyleName={this.getListStylesByStyleName}
                            id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                            dataSource={entry.dataSource} dataType={entry.dataType} />
                    } else {
                        return <Swastika.CustomView key={i + 'CustomView'}
                            generateTag={this.generateTag}
                            modelData={modelDataChild} dataValue={entry.dataValue}
                            getListStylesByStyleName={this.getListStylesByStyleName}
                            id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                            dataSource={entry.dataSource} dataType={entry.dataType} />
                    }
                case this.ComponentType.Text:
                    return <Swastika.CustomText key={i + 'CustomText'}
                        generateTag={this.generateTag}
                        modelData={modelDataChild} dataValue={entry.dataValue}
                        getListStylesByStyleName={this.getListStylesByStyleName}
                        id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                        dataSource={entry.dataSource} dataType={entry.dataType} />
                case this.ComponentType.Image:
                    return <Swastika.CustomImage key={i + 'CustomImage'}
                        generateTag={this.generateTag}
                        modelData={modelDataChild} dataValue={entry.dataValue}
                        getListStylesByStyleName={this.getListStylesByStyleName}
                        id={entry.id} styleName={convertReactStyleNames(entry.styleName)}
                        dataSource={entry.dataSource} dataType={entry.dataType} />
                default:
                    return <View key={i} />
            }
        })
        return Arr;
    }

    getListStylesByStyleName = (listStyleName) => {
        let arrStyle = [];
        for (let styleName of listStyleName) {
            if (typeof styleBootstrap[styleName] !== 'undefined')
                arrStyle.push(styleBootstrap[styleName])
        }
        return arrStyle;
    }

    getDataToGenerate(data) {
        modelData = data;
        jsonData = [];
        //Dữ liệu của component
        jsonData.push(modelData.view.mobileComponent);

        //Dữ liệu của Style
        var content = modelData.view.mobileView;
        var dataStyle = parserStyle(content);
        styleBootstrap = StyleSheet.create(dataStyle)

        delete this.contentView;
        this.contentView = this.generateTag(jsonData, modelData);

    }

    render() {
        return (
            <View >
                {this.contentView}
            </View>
        )
    }
}

export default connect()(ModuleItemScreen);