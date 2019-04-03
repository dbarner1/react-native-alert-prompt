# react-native-alert-prompt
<img align="center" src="https://badge.fury.io/js/react-native-alert-prompt.svg" />
An ios and android styled alert that includes a prompt for the user.  If the user inputs what you expect, it exits with the `successfulAnswer` prop.  Fully customizable, and styled using ios design and material design by default.
<br />
<br />
<p align="center">
<img align="left" src="https://github.com/dbarner1/react-native-alert-prompt/raw/master/android_ux2.gif" margin="5px" width="47.5%" style="margin-bottom: 200px;" />
<img align="left" src="https://github.com/dbarner1/react-native-alert-prompt/raw/master/ios_ux2.gif" margin="5px" width="47.5%" />
</p>
<br/>
<br/>
<br/>
<br/>


## Changes in 0.0.6
- No breaking changes.
- Now able to show *just* an alert to the user, and not include the prompt input.
- Fixes checkPrompt()

## Install
Install via npm:
```sh
 npm install react-native-alert-prompt --save
```

## Usage
```js
 import { AlertPrompt } from 'react-native-alert-prompt';
```

```
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
   promptText={<Text>Are you sure you want to delete this account?  Enter exactly DELETE to delete it.</Text>}
   rePromptText={this.rePromptText}
   successfulAnswer={() => this.setState({ alertVisible: false, deleted: this.state.deleted+1 })}
   closePrompt={() => this.setState({ alertVisible: false})}
 />
```

## Props

| Prop                | Type          | Optional  | Default | Description                                                                             |
| ------------------- | ------------- | --------- | ------- | --------------------------------------------------------------------------------------- |
| validationCaseSensitive              | boolean      | No        |  true       | Whether the validation on the text input is case sensitive or not.        |
| validationText              | string      |  No        |  'DELETE'       | The text to compare with the user's inputted text to determine a sucessful answer or not.        |
| visible              | boolean      | No        |   -      | Whether the alert is visible or not.  Typically triggered by an action.     |
| alertSubject              | string      | No        |    -     | The title of the alert.        |
| promptText              | string      | No        |    -     | The initial text prompting the user.        |
| rePromptText              | string      | No        |    -     | The text prompting the user if they get the answer wrong.        |
| successfulAnswer              | callback function      | No        |   -      | On a successful answer, what would you like to do?       |
| closePrompt              | callback function      | No        |      -   | If the alert wants to close itself.  Typically setting root component visible state to false.        |
| animation               | string         | Yes        |    fade     | Matches RN's animationType on modal. (fade, slide, none)        |
| androidColor              | color value      | Yes        |   'rgba(0, 150, 136,1)'      | The color of the cursor and text input box on Android.     |
| checkDelay              | integer (milliseconds)      | Yes        |   250      | The delay between the initial prompt, and the reprompt if the user submits the wrong text.        |
| autoFocus              | boolean      | Yes        |    true     | Whether the text input auto focuses on alert show.        |
| cancelButtonText              | string     | Yes        |   'Cancel'      | The text shown for the cancel option.        |
| confirmButtonText              | string      | Yes        |    'Confirm'     | The text shown for the confirm option.        |
| placeHolderText              | string      | Yes        |    'Enter here'     | The placeholder text shown in the text input.        |
| alertOnly | boolean | Yes | false | Whether the prompt should include a prompt (set this to false, or just don't include it), or just be an alert (set as true).


## Contributions/Suggestions
Feel free to add issues and PRs.  As with any project, there are things to improve!
