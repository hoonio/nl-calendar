import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

import TaskRow from './TaskRow/Component';

class TaskList extends React.Component {
  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.todos),
    };
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);
    this.setState({ dataSource });
  }

  renderRow(todo){
    return (
      <TaskRow
        onDone={this.props.onDone}
        todo={todo}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          key={this.props.todos}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <TouchableHighlight
          onPress={this.props.onAddStarted}
          style={styles.button}>
          <Text
            style={styles.buttonText}>
            Add
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
});

TaskList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onAddStarted: React.PropTypes.func.isRequired,
  onDone: React.PropTypes.func.isRequired,
};

export default TaskList;
