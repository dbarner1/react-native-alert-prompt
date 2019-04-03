import React, { Component } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import timer from 'react-native-timer';
const onIos = Platform.OS === 'ios';

export default class AlertPrompt extends Component {
  constructor(props) {
    super(props);

    const {
      alertSubject,
      promptText
    } = this.props;

    this.state = {
      journalDeletionInputText: "",
      promptText: promptText,
      alertSubject: alertSubject,
      deletionFocused: false,
    }
  }

  closePrompt() {
    this.resetState();
    this.props.closePrompt();
  }

  cursorColor() {
    if (!onIos) {
      return this.props.androidColor || 'rgba(0, 150, 136,1)';
    } else {
      return null;
    }
  }

  resetState() {
    const {
      alertSubject,
      promptText
    } = this.props;

    this.setState({
      alertSubject: alertSubject,
      deletionFocused: false,
      journalDeletionInputText: "",
      promptText: promptText,
      promptVisible: true,
    })
  }

  checkPrompt() {
    if(this.props.alertOnly) {
      this.setState({ promptVisible: true, promptText: promptText, journalDeletionInputText: "" });
      this.props.successfulAnswer();
    }

    const stylez = Platform.OS != 'ios' ? androidStyles : styles;
    const { journalDeletionInputText } = this.state;
    const { promptText, validationCaseSensitive, validationText } = this.props;

    if(validationCaseSensitive && journalDeletionInputText === validationText) {
      this.props.closePrompt();
      this.setState({ promptVisible: true, promptText: promptText, journalDeletionInputText: "" });
      this.props.successfulAnswer();
    } else if(!validationCaseSensitive && journalDeletionInputText.toUpperCase() == validationText.toUpperCase()) {
      this.setState({ promptVisible: true, promptText: promptText, journalDeletionInputText: "" });
      this.props.successfulAnswer();
    } else {
      this.setState({
        promptVisible: false,
        promptText: this.props.rePromptText()
      }, () => {
        timer.setTimeout(this, 'close menu', () => this.setState({ promptVisible: true, journalDeletionInputText: '' }), this.props.checkDelay || 250);
      })
    }
  }

  render() {
    const {
      alertOnly,
      alertWrapperStyle,
      animationType,
      autoFocus,
      cancelButtonText,
      confirmButtonText,
      modalStyle,
      modalWrapperStyle,
      placeholderText,
      topAreaStyle,
      visible
    } = this.props;

    const {
      alertSubject,
      deletionFocused,
      journalDeletionInputText,
      promptText,
      promptVisible
    } = this.state;

    const conditionalStyle = onIos ? styles : androidStyles;

    let resetText = (
      <View>
        <Text>{promptText}</Text>
      </View>
    )

    return (
        <Modal
          visible={visible && promptVisible}
          style={[styles.modal, modalStyle]}
          animationType={animationType || 'fade'}
          transparent
        >
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <View style={[conditionalStyle.alertWrapper, alertWrapperStyle]}>
            <View style={[styles.topArea, topAreaStyle]}>
              <Text style={conditionalStyle.alertSubject}>{alertSubject}</Text>
              <Text style={conditionalStyle.alertText}>{promptText}</Text>
            {alertOnly != true && (
              <TextInput
                editable={true}
                style={conditionalStyle.textInput}
                placeholder={
                  journalDeletionInputText ||
                  deletionFocused
                    ? null
                    : placeholderText
                }
                placeholderTextColor={'#dcddde'}
                enablesReturnKeyAutomatically
                onSubmitEditing={() => this.checkPrompt()}
                clearTextOnFocus
                onChangeText={text =>
                  this.setState({ journalDeletionInputText: text })
                }
                autoFocus={autoFocus || true}
                selectionColor={this.cursorColor()}
                onFocus={() =>
                  journalDeletionInputText
                    ? null
                    : this.setState({ deletionFocused: true })
                }
                value={journalDeletionInputText}
              />
            )}
            </View>
            <View style={conditionalStyle.alertOptionRow}>
              <TouchableOpacity
                onPress={() => this.closePrompt()}
                style={conditionalStyle.cancelOptionButton}
              >
                <Text style={conditionalStyle.cancelOption}>{cancelButtonText ? cancelButtonText : 'Cancel'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.checkPrompt()}
                style={conditionalStyle.confirmOptionButton}
              >
                <Text style={conditionalStyle.confirmOption}>{confirmButtonText ? confirmButtonText : 'Confirm'}</Text>
              </TouchableOpacity>
            </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

    )
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  //global containers
  modal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(52,73,94,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //alert spacing
  alertWrapper: {
    alignSelf: 'center',
    width: '85%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,1)',
    minHeight: 100,
  },
  alertText: {
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: -10,
  },
  topArea: {
    padding: 20,
    paddingBottom: 10,
  },
  alertSubject: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'System',
    fontSize: 18,
    paddingBottom: 5,
    marginLeft: 2,
  },
  alertDetail: {
    textAlign: 'center',
    paddingBottom: 15,
    fontSize: 14,
    fontFamily: 'System',
  },
  alertDetail2: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: 'System',
  },
  alertDetail4: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 14,
    fontFamily: 'System',
  },
  alertDetail3: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: 'System',
  },
  alertOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    height: 50,
    borderTopWidth: 1,
    borderColor: 'rgba(24,127,254,.1)',
  },
  //Input
  textInput: {
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: 0.25,
    borderRightWidth: 0.25,
    borderColor: 'rgba(26,113,160,1)',
    backgroundColor: 'white',
    padding: 7,
  },
  //Options
  cancelOptionButton: {
    flex: 0.5,
    borderRightWidth: .5,
    borderColor: 'rgba(24,127,254,.1)',
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  },
  cancelOption: {
    color: 'rgba(24,127,254,1)',
    fontSize: 17,
    fontFamily: 'System',
  },
  confirmOptionButton: {
    flex: 0.5,
    borderLeftWidth: .5,
    borderColor: 'rgba(24,127,254,.1)',
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  },
  confirmOption: {
    fontWeight: '600',
    fontFamily: 'System',
    color: 'rgba(24,127,254,1)',
    fontSize: 17,
  },
});

const androidStyles = StyleSheet.create({
  alertWrapper: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'column',
    borderRadius: 0,
    minHeight: 200,
    backgroundColor: 'white',
    marginTop: 250,
  },
  alertSubject: {
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 21,
    paddingBottom: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  alertText: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    textAlign: 'left',
  },
  alertDetail: {
    textAlign: 'left',
    paddingBottom: 15,
    fontSize: 18,
    fontFamily: 'System',
    color: 'black',
  },
  alertDetail2: {
    textAlign: 'left',
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 18,
    fontFamily: 'System',
    color: 'black',
  },
  alertDetail4: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingTop: 5,
    fontSize: 18,
    color: 'black',
    fontFamily: 'System',
  },
  alertDetail3: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingBottom: 10,
    fontSize: 18,
    fontFamily: 'System',
    color: 'black',
  },
  alertOptionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 10,
    height: 50,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: 'rgba(113, 198, 220, 1)',
    backgroundColor: 'white',
    padding: 5,
    marginTop: 10,
  },
  confirmOptionButton: {
    padding: 5,
    alignItems: 'center',
    textAlign: 'center',
  },
  confirmOption: {
    fontWeight: '600',
    fontFamily: 'System',
    color: 'rgba(0, 150, 136,1)',
    fontSize: 16,
  },
  cancelOption: {
    color: 'rgba(0, 150, 136,1)',
    fontSize: 16,
    fontFamily: 'System',
  },
  cancelOptionButton: {
    padding: 5,
    alignItems: 'center',
    textAlign: 'center',
  },
});
