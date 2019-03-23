import React, { Component } from 'react';
import {
  Dimensions,
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
    const { androidColor } = this.props;

    if (!onIos) {
      return androidColor || 'rgba(0, 150, 136,1)';
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

  checkDeleteJournalPrompt() {
    const stylez = Platform.OS != 'ios' ? androidStyles : styles;
    const { journalDeletionInputText } = this.state;
    const { validationCaseSensitive, validationText } = this.props;

    let newPrompt = this.props.rePromptText();

    if(validationCaseSensitive && journalDeletionInputText === validationText) {
      this.setState({ promptVisible: true });
      this.props.successfulAnswer();
    } else if(!validationCaseSensitive && journalDeletionInputText.toUpperCase() == validationText.toUpperCase()) {
      this.setState({ promptVisible: true });
      this.props.successfulAnswer();
    } else {
      this.setState({
        promptVisible: false,
        promptText: newPrompt
      }, () => {
        timer.setTimeout(this, 'close menu', () => this.setState({ promptVisible: true, journalDeletionInputText: '' }), this.props.checkDelay || 250);
      })
    }
  }

  render() {
    const {
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
        <View style={[styles.modalWrapperStyle, modalWrapperStyle]}>
          <View style={[conditionalStyle.alertWrapper, alertWrapperStyle]}>
          <View style={[styles.topArea, topAreaStyle]}>
            <Text style={conditionalStyle.alertSubject}>{alertSubject}</Text>
            <Text style={conditionalStyle.alertText}>{promptText}</Text>
            <TextInput
              editable={true}
              style={conditionalStyle.confirmDeleteInput}
              placeholder={
                journalDeletionInputText ||
                deletionFocused
                  ? null
                  : placeholderText
              }
              placeholderTextColor={'#dcddde'}
              enablesReturnKeyAutomatically
              onSubmitEditing={() => this.checkDeleteJournalPrompt()}
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
          </View>
          <View style={conditionalStyle.alertOptionRow}>
            <TouchableOpacity
              onPress={() => this.closePrompt()}
              style={conditionalStyle.cancelOptionButton}
            >
              <Text style={conditionalStyle.cancelOption}>{cancelButtonText ? cancelButtonText : 'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.checkDeleteJournalPrompt()}
              style={conditionalStyle.confirmOptionButton}
            >
              <Text style={conditionalStyle.confirmOption}>{confirmButtonText ? confirmButtonText : 'Confirm'}</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const { width } = Dimensions.get('window');

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
  confirmDeleteInput: {
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingTop: 0,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(52,73,94,0.6)',
    justifyContent: 'center',
    zIndex: 2,
  },
  alertWrapper: {
    alignSelf: 'center',
    width: '85%',
    marginTop: 250,
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
  cancelOption: {
    color: 'rgba(24,127,254,1)',
    fontSize: 17,
    fontFamily: 'System',
  },
  confirmOption: {
    fontWeight: '600',
    fontFamily: 'System',
    color: 'rgba(24,127,254,1)',
    fontSize: 17,
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
  cancelOptionButton: {
    flex: 0.5,
    borderRightWidth: .5,
    borderColor: 'rgba(24,127,254,.1)',
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  },
  mainWrapper: {
    width: '100%',
    flex: 0.9,
    flexDirection: 'column',
  },
  deleteJournalTrashCan: {
    alignSelf: 'center',
    marginTop: 10,
    marginRight: 6,
  },
  confirmDeleteInput: {
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderLeftWidth: 0.25,
    borderRightWidth: 0.25,
    borderColor: 'rgba(26,113,160,1)',
    backgroundColor: 'white',
    padding: 7,
  },
  coverImageWrapper: {
    alignSelf: 'stretch',
    marginBottom: 16,
    backgroundColor: '#C95DEC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  deleteJournalRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#dcddde',
  },
  clickabledeleteJournalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  deleteJournalWrapper: {
    flex: 0.1,
    width: '100%',
    backgroundColor: 'white',
  },
  deleteJournalText: {
    marginTop: 8,
    color: 'rgb(212,93,95)',
    fontWeight: '600',
  },
  image: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
  coverPhotoTitle: {
    fontSize: 18,
    color: '#fff',
  },
  choosePhoto: {
    width: 40,
    height: 40,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 20,
  },
  fieldTitle: {
    color: '#24313F',
    alignSelf: 'stretch',
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 16,
    marginBottom: 6,
  },
  relationshipPickerStyle: {
    minWidth: '50%',
    alignItems: 'center',
  },
  pickerStyleWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  toggleStyleWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 6,
    marginHorizontal: 16,
  },
  toggleLabel: {
    maxWidth: '90%',
    maxWidth: width - 84,
    color: '#24313F',
    fontSize: 13,
    paddingLeft: 12,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    color: '#24313F',
    fontSize: 14,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 4,
    borderColor:  'rgba(95, 48, 138, 1)',
    backgroundColor: '#fff',
  },
  pickerSelect: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 4,
    borderColor:  'rgba(95, 48, 138, 1)',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerSelectTitle: {
    color: '#24313F',
    fontSize: 14,
  },
  triangle: {
    marginTop: 2,
  },
  loadingModal: {
    alignSelf: 'stretch',
    flex: 1,
  },
  loadingModalInner: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: 'rgba(52,73,94,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
