import React, { Component } from 'react';
import {
    Text,
    Image,
} from 'react-native';

import {
    Card,
    CardItem, CardTitle, Body, Button, Icon, Left, Right
} from 'native-base';
import { deleteAction } from '../actions/PlaneListActions';

export default class PlaneListElement extends Component {
    constructor(props) {
        super(props);
        this.onInsert = this.onInsert.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.recordData = props.record.content;
    }

    onInsert() {
        this.props.navigation.navigate('Insert');
    }

    onDelete() {
        console.log(this.recordData.ID)
        const object = {
            ID: this.recordData.ID
        }
        this.props.dispatch(deleteAction(object, this.props.token)).then(() => {
            this.props.dataset.reset(0)
        })
    }

    render() {
        return (
            <Card style={{ margin: 10 }}>
                <CardItem header>
                    <Text>{this.recordData.planeName}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            Country: {this.recordData.planeCountry} {"\n"}
                            Engine: {this.recordData.planeEngine} {"\n"}
                            Producer: {this.recordData.planeProducer} {"\n"}
                            Year: {this.recordData.planeYear} {"\n"}
                            WikiLink: {this.recordData.WikiLink} {"\n"}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button rounded success onPress={() => this.onInsert()}>
                            <Text>Insert</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button rounded danger onPress={() => this.onDelete()}>
                            <Text>Delete</Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        );
    }

}