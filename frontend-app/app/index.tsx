import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    Image
} from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ModalInput from './modalInput';
import CardItem from './cardItem';
import { ipConfig } from '../config/path'

export default function Index() {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const url = 'http://' + ipConfig + ':8080/api/v1/sugestao'
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const getSugestoes = async () => {
        await fetch(url)
          .then((res) => res.json())
          .then((res) => {
            setData(res);
          })
          .catch(e => console.log(e))
    }

    const addSugestao = (titulo, descricao) => {
        fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify({
            "titulo": titulo,
            "descricao": descricao,
          })
        }).then((res) => res.json())
          .then(resJson => {
            updateSugestao()
          }).catch(e => { console.log(e) })
    }

    const editSugestao = (id, titulo, descricao) => {
        fetch(url + `/${id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            "titulo": titulo,
            "descricao": descricao,
          })
        }).then((res) => res.json())
          .then(resJson => {
            updateSugestao()
          }).catch(e => { console.log(e) })
    }

    const deleteSugestao = (id) => {
        fetch(url + `/${id}`, {
          method: "DELETE",
          headers,
        }).then((res) => res.json())
          .then(resJson => {
            getSugestoes()
          }).catch(e => { console.log(e) })
    }

    const updateSugestao = () => {
        getSugestoes()
        setVisible(false);
        setId(0)
        setTitulo('')
        setDescricao('')
    }

    const editData = (id, titulo, descricao) => {
        setVisible(true)
        setId(id)
        setTitulo(titulo)
        setDescricao(descricao)
    }

    useEffect(() => {
        getSugestoes();
    }, [])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <Surface style={styles.header}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
                <Title style={styles.title}>Sugestões da Comunidade</Title>
              </Surface>
              <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <Text style={styles.buttonText}>Cadastrar Sugestão</Text>
              </TouchableOpacity>
              <FlatList
                data={data}
                keyExtractor={(item, index) => item.id + index.toString()}
                renderItem={({ item }) => (
                  <CardItem
                    titulo={item.titulo}
                    descricao={item.descricao}
                    onEdit={() => editData(item.id, item.titulo, item.descricao)}
                    onDelete={() => deleteSugestao(item.id)}
                  />
                )}
              />
              <ModalInput
                visible={visible}
                title={id ? "Edição de sugestão" : "Cadastro de Sugestão"}
                onDismiss={() => updateSugestao()}
                onSubmit={() => {
                  if (id && titulo && descricao) {
                    editSugestao(id, titulo, descricao)
                  } else {
                    addSugestao(titulo, descricao)
                  }
                }}
                cancelable
              >
                <TextInput
                  label="Título"
                  value={titulo}
                  onChangeText={(text) => setTitulo(text)}
                  mode="outlined"
                />
                <TextInput
                  label="Descrição"
                  value={descricao}
                  onChangeText={(text) => setDescricao(text)}
                  mode="outlined"
                  multiline
                />
              </ModalInput>
            </SafeAreaView>
        </SafeAreaProvider>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A29E9E',
    justifyContent: 'center',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 36 : 0,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#A29E9E',
    alignItems: 'center',
  },
  title: {
    marginTop: Platform.OS === 'android' ? 24 : 0,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 26,
  },
  button: {
    marginTop: Platform.OS === 'android' ? 24 : 0,
    marginBottom: Platform.OS === 'android' ? 24 : 0,
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#515151',
    width: '45%',
    display: 'block',
    margin: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  logo: {
      width: 138,
      height: 131,
  },
});
