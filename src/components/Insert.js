import React, { Component } from 'react';
import { View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { getLogger, issueToText } from '../core/utils';
import styles from '../core/styles';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux'
import { Alert } from 'react-native';
import { BackHandler } from 'react-native'
import { updateName, updateProd, updateEngine, updateCountry, updateYear, updateLink, insertAction } from '../actions/InsertActions';
import {
    Container,
} from 'native-base';

class InsertComponent extends Component {
    constructor(props) {
        super(props);
        this.insertNew = this.insertNew.bind(this)
    }

    render() {
        const { isLoading, dispatch } = this.props;

        return (

            <Container>
                <Card>
                    <FormLabel>Name</FormLabel>
                    <FormInput value={this.props.planeName} onChangeText={(text) => dispatch(updateName(text))} />
                    <FormLabel>Producer</FormLabel>
                    <FormInput value={this.props.planeProducer} onChangeText={(text) => dispatch(updateProd(text))} />
                    <FormLabel>Engine</FormLabel>
                    <FormInput value={this.props.planeEngine} onChangeText={(text) => dispatch(updateEngine(text))} />
                    <FormLabel>Country</FormLabel>
                    <FormInput value={this.props.planeCountry} onChangeText={(text) => dispatch(updateCountry(text))} />
                    <FormLabel>Year</FormLabel>
                    <FormInput value={this.props.planeYear} onChangeText={(text) => dispatch(updateYear(text))} />
                    <FormLabel>WikiLink</FormLabel>
                    <FormInput value={this.props.wikiLink} onChangeText={(text) => dispatch(updateLink(text))} />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="INSERT"
                        onPress={() => this.insertNew()}
                    />
                </Card>
                <ActivityIndicator animating={this.props.isLoading} style={styles.activityIndicator} size="large" />
            </Container>
        );
    }

    insertNew() {

        const { dispatch } = this.props
        const inputFormProp =
            {
                planeName: this.props.planeName,
                planeCountry: this.props.planeCountry,
                planeEngine: this.props.planeEngine,
                planeProducer: this.props.planeProducer,
                planeYear: this.props.planeYear,
                wikiLink: this.props.wikiLink,
            }
        dispatch(insertAction(inputFormProp, this.props.token)).then(() => {

            if (this.props.error === null && this.props.isLoading === false) {
                if (this.props.ok) {
                    this.props.navigation.navigate('PlaneList');
                }
            }
        })
    }
}

const mapStateToProps = state => {
    return {
        planeName: state.insert.planeName,
        planeCountry: state.insert.planeCountry,
        planeProducer: state.insert.planeProducer,
        planeEngine: state.insert.planeEngine,
        planeYear: state.insert.planeYear,
        wikiLink: state.insert.wikiLink,
        error: state.insert.error,
        isLoading: state.insert.isLoading,
        ok: state.insert.ok,
        token: state.auth.token

    };
};

export default connect(mapStateToProps)(InsertComponent);