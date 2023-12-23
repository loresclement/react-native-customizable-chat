import * as React from 'react';
import CustomizableChat from 'react-native-customizable-chat';
import type { CustomizableChatMessage } from '../../src/types/Message';
import { Icon } from '@rneui/base';

export default function App() {
  
  const [messages, setmessages] = React.useState<Array<CustomizableChatMessage>>([
    {id: 0, content: "Hey ! how are you ?", isUser: false, date: new Date()},
    {id: 1, content: "Fine, i'm working on my customizable chat package", isUser: true, date: new Date()},
    {id: 2, content: "Nice, I hope it will be useful", isUser: false, date: new Date()},
    {id: 3, content: "emhh.. Imagine if it's never used", isUser: true, date: new Date(), image:"https://static-cse.canva.com/blob/1173517/giphy3.gif"},
  ].reverse());

  const addMessage = (msg: any) => 
  {
    const newMsg : CustomizableChatMessage = {
      id: 4,
      content: msg.content,
      isUser: true
    }

    setmessages([newMsg, ...messages])
  }

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
  );
}
