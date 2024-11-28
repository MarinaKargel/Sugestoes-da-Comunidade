import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
)

export default function CardItem({ titulo, descricao, onEdit, onDelete }) {
  return (
       <Card style={styles.card}>
         <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.titulo}>{titulo}</Text>
              <Text multiline>{descricao}</Text>
            </View>
            <View style={styles.row}>
              <Button
                onPress={onEdit}
                icon="edit"
                style={styles.button} />
              <Button onPress={onDelete} icon='trash-2' />
            </View>
         </View>
       </Card>
  );
}

const styles = StyleSheet.create({
  card: {
      padding: 16,
      margin: 8,
      elevation: 2,
      borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    width: '75%'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    marginHorizontal: 16
  }
})