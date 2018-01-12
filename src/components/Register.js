import React, { Component } from 'react';
import { View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { getLogger, issueToText } from '../core/utils';
import styles from '../core/styles';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux'
import { registerAction, updatePasswordState, updateUsernameState, updatePasswordRepeatState, registerStarted, registerSuccess } from '../actions/RegisterActions'
import { Alert } from 'react-native';
import { BackHandler } from 'react-native'


class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.registerNew = this.registerNew.bind(this)
    }

    render() {
        const { error, isLoading, username, password, repeatPassword, dispatch } = this.props;

        return (
            <View style={{ paddingVertical: 20 }}>
                <Card>
                    <FormLabel>Username</FormLabel>
                    <FormInput value={username} onChangeText={(text) => dispatch(updateUsernameState(text))} />
                    <FormLabel>Password</FormLabel>
                    <FormInput value={password} secureTextEntry={true} onChangeText={(text) => dispatch(updatePasswordState(text))} />
                    <FormLabel>Repeat Password</FormLabel>
                    <FormInput value={repeatPassword} secureTextEntry={true} onChangeText={(text) => dispatch(updatePasswordRepeatState(text))} />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="REGISTER"
                        onPress={() => this.registerNew()}
                    />
                </Card>
                <ActivityIndicator animating={this.props.isLoading} style={styles.activityIndicator} size="large" />
            </View>
        );
    }


    registerNew() {

        const { store } = this.props.screenProps.store;
        const { dispatch, username, password, repeatPassword } = this.props

        if (password.trim() != repeatPassword.trim()) {
            Alert.alert('ERROR', 'The passwords are different');
        }
        else {
            const inputFormProp =
                {
                    username: username,
                    password: password
                }

            dispatch(registerAction(inputFormProp)).then(() => {

                if (this.props.error === null && this.props.isLoading === false) {
                    if (this.props.ok) {
                        this.props.navigation.navigate('Login');
                    }
                }
            })
        }
    }

}
const mapStateToProps = state => {
    return {
        username: state.register.username,
        password: state.register.password,
        repeatPassword: state.register.repeatPassword,
        error: state.register.error,
        isLoading: state.register.isLoading,
        ok: state.register.ok,
    };
};

export default connect(mapStateToProps)(RegisterComponent);