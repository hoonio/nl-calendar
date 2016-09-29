import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default function render(styles) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        and:{this.props.todo.task}
      </Text>
      <TouchableHighlight
        onPress={this.onDonePressed.bind(this)}
        style={styles.doneButton}
      >
        <Text>Done</Text>
      </TouchableHighlight>
    </View>
  )
}
