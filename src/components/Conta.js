import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';


class Conta extends Component {
    render() {
        // <Image style={{ height: 100, width: 100 }} source={{ uri: this.props.item.foto }} />
        return (
            <View style={styles.item}>
                <View style={styles.foto}>

                </View>

                <TouchableOpacity onPress={() => { alert(this.props.item.key); }}>
                    <View style={styles.detalhesItens}>
                        <Text style={styles.txtTitulo}>{this.props.item.descricao}</Text>
                        <Text style={styles.txtValor}>R$ {this.props.item.valor}</Text>
                        <Text>Local: {this.props.item.data}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        borderWidth: 0.5,
        borderColor: '#999',
        margin: 10,
        padding: 10,
        flexDirection: 'row',
    },
    foto: {
        width: 102,
        height: 102,
    },
    detalhesItens: {
        marginLeft: 20,
        flex: 1,
    },
    txtTitulo: {
        fontSize: 18,
        marginBottom: 5,
    },
    txtValor: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default Conta;