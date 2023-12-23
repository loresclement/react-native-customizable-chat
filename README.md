# react-native-customizable-chat

Lightweight and easy chat view for your react native chat apps

## Features 

-FULLY customizable. Each component is customizable and replaceable<br>
-Link in messages can be opened<br>
-Clicked messages or long pressed messages events that return the selected message<br>
-Automatic scale for images in bubble<br>
-User avatar <br>
-Fully customizable input and buttons<br>

## Installation

```sh
npm install react-native-customizable-chat
```
⚠️FOR NON EXPO USER⚠️<br>
⚠️If you want to support gif and webp for image preview then check this <a href="https://reactnative.dev/docs/image#gif-and-webp-support-on-android" target="_blank">link</a> ⚠️


## Basic usage

```js
export default function App() {
  
  const messages : Array<CustomizableChatMessage> = [
    {id: 0/*optional*/, content: "Hey!", isUser: false, date: new Date()},
    {id: 1/*optional*/, content: "Hey how are you?", isUser: true, date: new Date()},
    {id: 2/*optional*/, content: "Fine and you?", isUser: false, date: new Date()},
    {id: 3/*optional*/, content: "I'm having great time!", isUser: false, date: new Date(), image: "IMAGE_URL"}
  ]

  return (
      <CustomizableChat 
        messages={messages}
        onSend={(e) => console.log(e)}
      />
  );
}
```
This will give you :
<p>
  <img src="https://github.com/loresclement/react-native-customizable-chat/blob/main/screenshots/fast-chat-usage-0.jpg" width="200" title="How it looks">
  <img src="https://github.com/loresclement/react-native-customizable-chat/blob/main/screenshots/fast-chat-usage-1.jpg" width="200" alt="How it looks">
  <img src="https://github.com/loresclement/react-native-customizable-chat/blob/main/screenshots/fast-chat-usage-gif-0.gif" width="200" alt="How it looks">
</p>

## Advanced usage

```js
  const bgColor = '#17120E'
  const textColor = "#FFE0C2"
  const otherUserBubbleColor = '#331E0B'
  const userBubbleColor = '#562800'
  const borderColor = '#66350C'
  const sendButtonColor = '#F76B15'

  return (
      <CustomizableChat 
        messages={messages}
        onSend={(e) => addMessage(e)}
        noDivider
        keepKeyboardOnSend
        hideBubbleDate
        containerStyle={{backgroundColor: bgColor}}
        backgroundColor={bgColor}
        userBubbleColor={userBubbleColor}
        inputStyle={{color: textColor, 
                    borderRadius: 20, 
                    borderWidth: 1.5,
                    borderColor: borderColor, 
                    padding: 10 }}
        bottomContainerStyle={{marginTop: 10}}
        otherUserBubbleColor={otherUserBubbleColor}
        bubbleTextStyle={{color: textColor}}
        inputPlaceholderColor={textColor}
        customSendButton={<Icon name='send' 
                                size={15} 
                                type='material-community' 
                                color={sendButtonColor} 
                                reverse
                          />}
      />
  )
```

<p>
  <img src="https://github.com/loresclement/react-native-customizable-chat/blob/main/screenshots/fast-chat-usage-2.jpg" width="200" title="How it looks">
  <img src="https://github.com/loresclement/react-native-customizable-chat/blob/main/screenshots/fast-chat-usage-3.jpg" width="200" alt="How it looks">
  <img src="https://github.com/loresclement/react-native-customizable-chat/blob/main/screenshots/fast-chat-usage-gif-1.gif" width="200" alt="How it looks">
</p>

## Messages type
```js

interface CustomizableChatMessage 
{
    id?: number,//It's recommended to implement it. Ex: if you want to delete the message on long press. You can easily remove it thanks to his id returned in the event
    content: string,
    date?: Date,
    isUser: boolean,//If true the message will be aligned to the right and considered as user message
    image?: string,//uri of your image (if it's a video the thumbnail will be taken as the image)
    isVideo?: boolean,//used to display the video badge on the image
}

```

## Required props

| Name | Type | Description |
| ----------------- | ----------------- | ----------------- |
| messages | Array<CustomizableChatMessage> | Your array of message formatted with the CustomizableChatMessage type |
| onSend | function | Triggered when user clicks on send, returns a CustomizableChatMessage |

## Customization props

| Name | Type | Description |
| ----------------- | ----------------- | ----------------- |
| onMsgPress | function | If user presses a bubble this function is triggered. Returns a CustomizableChatMessage |
| onLongMsgPress | function | If user long presses a bubble this function is triggered. Returns a CustomizableChatMessage |
| keepKeyboardOnSend | boolean | If true then the keyboard will not dimiss when the user presses sends |
| disableBubblePressOpacity | boolean | If true the opacity animation when a user touches a bubble is disabled |
| backgroundColor | string | Color of the chat background |
| containerStyle | ViewStyle | Customize the style of the whole chat container |
| bottomContainerStyle | ViewStyle | Customize the container of the input and send button |
| hideAvatar | boolean | Default : false, if false the avatar of the bubble won't display |
| hideSendButton | boolean | If true the send button won't display |
| alwaysShowSend | boolean | By default the send button will display only if input is not empty. Setting this to true will always display the send button |
| sendButtonContainerStyle | ViewStyle | Customize the container of the send button |
| dateFormat | string | dayjs format of the date, for example "DD/MM/YYYY" |
| hideBubbleDate | boolean | If true, the date of messages won't display |
| dateTextStyle | TextStyle | Text style of the date in bubble |
| bubbleTextStyle | TextStyle | Customize text in chat bubble |
| imageStyle | ImageStyle | Customize the style of an image in bubble |
| customSendButton | ReactFragment | Replace the default button by your own button. The onSend event is still triggered |
| sendButtonProps | ButtonProps | Add props of the default send button |
| inputTopElement | ReactFragment | Add any fragment between the chat and the input |
| hideTopElement | boolean | If true your fragment between the chat and the input won't display  |
| rightInputElement | ReactFragment | Add any fragment on the right of the input |
| leftInputElement | ReactFragment | Add any fragment on the left of the input |
| hideRightInputElement | boolean | Default: false, If true display your fragment on the right of the input |
| hideLeftInputElement | boolean | Default: false, If true display your fragment on the left of the input |
| otherUserBubbleColor | string | Change the background color of the other user's bubble |
| userBubbleColor | string | Change the background color of the user's bubble |
| bubbleContainerStyle | ViewStyle | Customize chat bubble container |
| inputMaxLength | number | Max length of the input |
| inputStyle | TextStyle | Customize the style of the input |
| inputPlaceholderColor | string | Color of the placeholder of the input |
| inputPlaceholderValue | string | Value of the placeholder of the input |
| customVideoBadge | ReactFragment | Add your own fragment to the video badge (video badge appears when the CustomizableChatMessage isVideo = true) <img src="https://github.com/loresclement/react-native-customizable-chat/blob/main/screenshots/fast-chat-video-badge.jpg" width="80" alt="Video badge"> |

## Supports me

You want to support me ? 
<a href="https://www.buymeacoffee.com/loresclement" target="_blank">Buy me a coffee</a>

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
