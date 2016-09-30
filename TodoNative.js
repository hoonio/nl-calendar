import React from 'react';
import {
  StyleSheet,
  View,
  AppRegistry,
  Navigator,
} from 'react-native';
import store from './todoStore';

import TaskList from './TaskList';
import TaskForm from './TaskForm';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState()); // eslint-disable-line react/no-set-state
    });
  }

  onAddStarted() {
    this.nav.push({
      name: 'taskform',
    });
  }

  onAdd(task) {
    console.log('task added:', task);
    store.dispatch({
      type: 'ADD_TODO',
      task,
    })
    this.nav.pop();
  }

  onCancel() {
    console.log('cancel');
    this.nav.pop();
  }

  onDone(todo) {
    console.log('task was completed:', todo.task);
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    });
  }

  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
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
            filter={this.state.filter}
            onAddStarted={this.onAddStarted.bind(this)}
            onDone={this.onDone.bind(this)}
            onToggle={this.onToggle.bind(this)}
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
