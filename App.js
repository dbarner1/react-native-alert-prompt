/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
  } from 'react-native';

import { AlertPrompt } from './src/index';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      alertVisible: false
    }
  }

  turnOnAlert() {
    this.setState({
      alertVisible: true
    })
  }

  rePromptText = () => {
    return (
      <Text>
        <Text style={{fontWeight: 'bold'}}>Oops!</Text> That wasn't correct.  Please enter exactly <Text style={{fontWeight: 'bold'}}>DELETE</Text> to confirm deletion.  All associated memories will be deleted.
      </Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress= {() => this.turnOnAlert()} title="Alert me!" />
        <AlertPrompt
          animation={"fade"}
          androidColor={'rgba(0, 150, 136,1)'}
          checkDelay={250}
          autoFocus={true}
          cancelButtonText={'Cancel'}
          confirmButtonText={'Confirm'}
          placeHolderText={'Enter here'}
          validationCaseSensitive={false}
          validationText={'DELETE'}
          visible={this.state.alertVisible}
          alertSubject={"Are you sure?"}
          promptText={<Text>Are you sure you want to delete this post?  Enter exactly DELETE to delete it.</Text>}
          rePromptText={this.rePromptText}
          successfulAnswer={() => this.setState({ alertVisible: false })}
          closePrompt={() => this.setState({ alertVisible: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
