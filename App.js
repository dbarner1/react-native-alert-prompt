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
  KeyboardAvoidingView,
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
      alertVisible: false,
      deleted: 0,
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
        <Text style={{fontWeight: 'bold'}}>Oops!</Text> That wasn't correct.  Please enter exactly <Text style={{fontWeight: 'bold'}}>DELETE</Text> to confirm deletion.  This post will be deleted.
      </Text>
    )
  }

  render() {
    const { deleted } = this.state;
    return (
      <View style={styles.container}>
      {deleted === 1 || deleted === 2 ? (
         <View>
           <Text style={{ marginTop: 30 }}>Account successfully deleted!</Text>
         </View>
        ) : (
          <View style={styles.buttonBackground}>
            <Button onPress= {() => this.turnOnAlert()} title="Delete this account" color="black" />
          </View>
        )}
        {deleted === 2 ? (
           <View>
             <Text style={{ marginTop: 30 }}>Account successfully deleted!</Text>
           </View>
          ) : (
            <View style={styles.buttonBackground}>
              <Button onPress= {() => this.turnOnAlert()} title="Delete this account" color="black" />
            </View>
          )}

        <AlertPrompt
          alertOnly={false}
          animation={"fade"}
          androidColor={'rgba(0, 150, 136,1)'}
          checkDelay={20}
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
          successfulAnswer={() => this.setState({ alertVisible: false, deleted: this.state.deleted+1 })}
          closePrompt={() => this.setState({ alertVisible: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
  },
  buttonBackground: {
    marginTop: 30,
    padding: 5,
  }
});
