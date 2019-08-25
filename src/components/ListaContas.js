import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';

import Conta from './Conta';

class ListaContas extends Component {

    constructor(props) {
        super(props);

    }

    render() {
       
        return (
            <ScrollView>
                {this.props.lista.map(item => (<Conta key={item.key} item={item} />))}
            </ScrollView>
        );
    }
}

export default ListaContas;