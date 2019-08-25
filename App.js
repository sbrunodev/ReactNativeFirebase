import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, Modal, TouchableHighlight } from 'react-native';

import firebase from 'firebase';
import ListaContas from './src/components/ListaContas';



type Props = {};
export default class App extends Component<Props> {

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  constructor(props) {
    super(props);
    this.state = { descricao: "", data: "", valor: "", modalVisible: false, listContas: [] };

    // Usado para ocultar os warnings amarelos
    console.disableYellowBox = true;
  }


  componentWillMount() {
    var config = {
      apiKey: "AIzaSyD_rYhwWIY7JbyhX_QNLVxD4OGhY73V0co",
      authDomain: "configuracaofirebasereac-950be.firebaseapp.com",
      databaseURL: "https://configuracaofirebasereac-950be.firebaseio.com",
      projectId: "configuracaofirebasereac-950be",
      storageBucket: "",
      messagingSenderId: "529314131386"
    };
    firebase.initializeApp(config);

    this.setState({ data: this.getData() });
    this.getContas();
  }


  getData() {
    var today = new Date(); var dd = today.getDate(); var mm = today.getMonth() + 1; var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } return mm + '/' + dd + '/' + yyyy;
  }


  Salvar() {
    var dbclientes = firebase.database().ref("clientes");
    var clientes = dbclientes.push({
      descricao: this.state.descricao,
      data: this.state.data,
      valor: this.state.valor,
    })
    .then(()=>{this.getContas();});
    this.inicializa();
    console.log("Clicou em Salvar");

    
  }

  getContas() {

    var listContas = [];

    var contas = firebase.database().ref("clientes").on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        listContas.push({
          key: key,
          descricao: childData.descricao,
          data: childData.data,
          valor: childData.valor
        });
      });
    });

    this.setState({ listContas: listContas });


  }


  inicializa() {
    this.setState({ descricao: "", data: this.getData(), valor: "" });
  }


  render() {
    return (
      <View style={Styles.screen}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>

          <View >
            <View>
              <Text style={Styles.titulo}>Contas </Text>

              <Button onPress={() => { this.setModalVisible(!this.state.modalVisible); }} title="Voltar" />

              <ListaContas lista={this.state.listContas} />



            </View>
          </View>
        </Modal>

        <Text style={Styles.titulo}> Contas à pagar</Text>

        <View style={Styles.screenInput}>
          <TextInput style={Styles.txtEstilo} placeholder="Descrição" value={this.state.descricao} onChangeText={(resultado) => { this.setState({ descricao: resultado }); }} />
          <TextInput style={Styles.txtEstilo} placeholder="Data" value={this.state.data} onChangeText={(resultado) => { this.setState({ data: resultado }); }} />
          <TextInput style={Styles.txtEstilo} placeholder="Valor" value={this.state.valor} type="numeric" onChangeText={(resultado) => { this.setState({ valor: resultado }); }} />
        </View>

        <View style={{ margin: 15 }}>
          <Button style={Styles.btnEstilo} title="Salvar" onPress={() => { this.Salvar(); }} />
        </View>

        <View style={{ margin: 15 }}>
          <Button onPress={() => { this.setModalVisible(true); }} title="Contas" />
        </View>

      </View>
    );
  }
}

const Styles = StyleSheet.create({
  titulo: {
    marginTop: 10,
    fontSize: 25,
    textAlign: 'center'
  },
  screen: {
    margin: 10,
    flex: 1
  },
  screenInput: {
    margin: 15
  },
  txtEstilo: {
    fontSize: 15,
    marginBottom: 10,
  },
  btnEstilo: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10
  }
});

