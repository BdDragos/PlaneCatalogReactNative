import React, { Component } from 'react';
import { ActivityIndicator, TouchableHighlight, Text } from 'react-native';
import { getLogger, issueToText } from '../core/utils';
import styles from '../core/styles';
import { Card, Button, Header } from "react-native-elements";
import { connect } from 'react-redux'
import { FormLabel, FormInput } from "react-native-elements";
import { getAction, getAllAction } from '../actions/PlaneListActions';
import { AppRegistry, StyleSheet, View, FlatList, } from 'react-native';
import _ from 'lodash';
import Pagination, { Icon, Dot } from 'react-native-pagination';

class PlaneListComponent extends Component {
    constructor(props) {
        super(props);
        this.getItems = this.getItems.bind(this)
        this._keyExtractor = this._keyExtractor.bind(this)
        this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)

        this.props.dispatch(getAllAction(this.props.token))
    }

    _keyExtractor = (item, index) => item.ID;

    _renderItem = ({ item }) => {
        return (
            <Card
                title={item.planeName}>
                <Text style={{ marginBottom: 10 }}>
                    The idea with React Native Elements is more about component structure than actual design.
            </Text>
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor='#03A9F4'
                    fontFamily='Lato'
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='UPDATE' />
            </Card>)
    };

    onViewableItemsChanged = ({ viewableItems, changed }) => this.props.dispatch(newViewable(viewableItems))

    getItems(currentPage) {
        const { dispatch, token } = this.props


        dispatch(getAction(token, currentPage)).then(() => {
            if (this.props.error === null && this.props.isLoading === false) {
                return;
            }
        });
    }

    render() {

        const { theList, currentPage } = this.props
        const s = StyleSheet.create({
            container:
                {
                    flex: 1,
                    backgroundColor: "grey",//<-- use with "dotThemeLight"
                },
        });

        return (
            <View style={[s.container]}>
                <FlatList
                    data={theList}
                    ref={r => this.refs = r}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onViewableItemsChanged={this.onViewableItemsChanged.bind(this)}//need this
                />

                <Pagination
                    // dotThemeLight //<--use with backgroundColor:"grey"
                    listRef={this.refs}//to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
                    paginationVisibleItems={this.props.viewableItems}//needs to track what the user sees
                    paginationItems={theList}//pass the same list as data
                    paginationItemPadSize={5} //num of items to pad above and below your visable items
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.planeList.error,
        isLoading: state.planeList.isLoading,
        theList: state.planeList.theList,
        currentPage: state.planeList.currentPage,
        token: state.auth.token,
        viewableItems: state.planeList.viewableItems
    };
};

export default connect(mapStateToProps)(PlaneListComponent);