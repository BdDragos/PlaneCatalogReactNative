import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAction, getAllAction, fontFinishedLoad, datasetstateSet, setDataset, changeDeleted } from '../actions/PlaneListActions';
import { View } from 'react-native';
import _ from 'lodash';
import {
    Button,
    Header,
    Container,
    Title,
    Content,
    Spinner, Left, Body, Right, Icon
} from 'native-base';

import { httpApiUrl } from '../core/api';
import { Font } from 'expo';
import Dataset from 'impagination';
import Expo from 'expo';
import PlaneListElement from './PlaneListElement';

class PlaneListComponent extends Component {
    constructor(props) {
        super(props);
        this.setCurrentReadOffset = this.setCurrentReadOffset.bind(this)
        this.setupImpagination = this.setupImpagination.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto_medium': require('../core/fonts/Roboto_medium.ttf')
        });
        this.props.dispatch(fontFinishedLoad());
        this.setupImpagination();
        this.props.dataset.reset(0)
    }

    setupImpagination() {

        let _this = this;
        let _dispatch = this.props.dispatch;
        let dataset = new Dataset({
            pageSize: 10,

            // Anytime there's a new state emitted, we want to set that on
            // the componets local state.
            observe: (datasetState) => {
                _dispatch(datasetstateSet(datasetState))
            },


            // Where to fetch the data from.
            fetch(pageOffset, pageSize) {

                const urlc = `${httpApiUrl}/api/plane/allPagined?pageNumber=${pageOffset}&pageSize=${pageSize}`

                return fetch(urlc, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + _this.props.token,
                    }
                })
                    .then(response => response.json())
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });

        // Set the readOffset to the first record in the state
        dataset.setReadOffset(0);
        this.props.dispatch(setDataset(dataset))
    }

    renderItem() {
        if (this.props.dataset) {
            return this.props.datasetState.map(record => {
                if (!record.isSettled) {
                    return <Spinner key={Math.random()} />;
                }

                return <PlaneListElement record={record} key={record.content.ID} {...this.props} />;
            });
        }
        return null;
    }

    setCurrentReadOffset = (event) => {
        let itemHeight = 402;
        let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
        let currentItemIndex = Math.ceil(currentOffset / itemHeight);

        this.props.dataset.setReadOffset(currentItemIndex);
    }

    render() {
        if (!this.props.fontLoaded) {
            return <Expo.AppLoading />;
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Plane List</Title>
                    </Body>
                    <Right />
                </Header>

                <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
                    {this.renderItem()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.planeList.error,
        isLoading: state.planeList.isLoading,
        token: state.auth.token,
        fontLoaded: state.planeList.fontLoaded,
        dataset: state.planeList.dataset,
        datasetState: state.planeList.datasetState,
    };
};

export default connect(mapStateToProps)(PlaneListComponent);