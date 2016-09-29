import React from 'react';
import {
  StyleSheet,
  View,
  AppRegistry,
  Navigator,
} from 'react-native';

import TaskList from './TaskList';
import TaskForm from './TaskForm';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      todos: [
        {
          task: 'Follow React Native tutorial',
        },
        {
          task: 'Review redux',
        },
      ],
    };
  }

  onAddStarted() {
    this.nav.push({
      name: 'taskform',
    });
  }

  onAdd(task) {
    console.log('task added:', task);
    this.state.todos.push({ task });
    this.setState({
      todos: this.state.todos
    });
    this.nav.pop();
  }

  onCancel() {
    console.log('cancel');
    this.nav.pop();
  }

  onDone(todo) {
    console.log('task was completed:', todo.task);
    const filteredTodos = this.state.todos.filter((filterTodo) => {
      return filterTodo !== todo;
    });
    this.setState({ todos: filteredTodos });
  }

  renderScene(route, nav) {
    switch(route.name) {
      case 'taskform':
        return (
          <TaskForm
            onAdd={this.onAdd.bind(this)}
            onCancel={this.onCancel.bind(this)}
          />
        );
      default:
        return(
          <TaskList
            onAddStarted={this.onAddStarted.bind(this)}
            onDone={this.onDone.bind(this)}
            todos={this.state.todos} />
        );
    }
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'tasklist', index: 0 }}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
