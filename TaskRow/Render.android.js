import React from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';

const localStyle = StyleSheet.create({
  doneButton: {
    borderRadius: 5,
    padding: 5,
  }
})

export default function render(styles) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        and:{this.props.todo.task}
      </Text>
      <TouchableHighlight
        onPress={this.onDonePressed.bind(this)}
        style={localStyle.doneButton}
        underlayColor="#ddd"
      >
        <Image source={require('../images/done.png')} />
      </TouchableHighlight>
    </View>
  )
}
