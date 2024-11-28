import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Title } from "react-native-paper";

export default function ModalInput({ children, title, onSubmit, cancelable, visible = false, onDismiss }) {
  return (
    <Modal
       animationType="fade"
       transparent={true}
       visible={visible}
       onDismiss={onDismiss}
    >
      <View style={styles.centeredView}>
         <View style={styles.modalView}>
            <Title style={styles.modalText}>{title}</Title>
               <View>{children}</View>
               <View style={styles.buttonView}>
                   {cancelable && (<TouchableOpacity style={styles.button} onPress={onDismiss}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                   </TouchableOpacity>)}
                   {onSubmit && (<TouchableOpacity style={styles.button} onPress={onSubmit}>
                       <Text style={styles.textStyle}>Salvar</Text>
                   </TouchableOpacity>)}
               </View>
         </View>
      </View>
     </Modal>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        margin: 30,
        backgroundColor: "#A29E9E",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonView: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        borderRadius: 25,
        padding: 10,
        elevation: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#515151',
        marginLeft: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: "white",
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center"
    }
});
