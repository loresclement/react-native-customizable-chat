import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, TextInput, Button } from 'react-native';
import type { InputSectionProps } from '../types';

const InputSection = (props: InputSectionProps) => 
{
    const { onSend, defaultInputValue, keepKeyboardOnSend, hideTopElement, dividerColor, inputTopElement, bottomContainerStyle, noDivider, leftInputElement, hideLeftInputElement, hideInput, inputPlaceholderColor, inputPlaceholderValue, inputMaxLength, inputStyle, hideRightInputElement, customSendButton, alwaysShowSend, hideSendButton, rightInputElement, sendButtonProps, sendButtonContainerStyle } = props

    const [inputMessage, setInputMessage] = useState<string>(defaultInputValue);

    const sendMessage = () =>
    {
        const msg = { content: inputMessage }
        onSend(msg)
        setInputMessage('')

        if(!keepKeyboardOnSend)
            Keyboard.dismiss()
    }

    return (<>
        {!hideTopElement && inputTopElement}

        {!noDivider && 
        <View style={{backgroundColor: dividerColor ? dividerColor : 'lightgray', marginVertical: 10, width: '100%', height: 2}}/>}

        {!hideInput && 
        <View style={[styles.bottomBar, bottomContainerStyle]}>

            {!hideLeftInputElement && 
            <View style={styles.leftRightInputContainer}>
                {leftInputElement}
            </View>}

            <TextInput
                value={inputMessage}
                onChangeText={text => setInputMessage(text)}
                placeholder={inputPlaceholderValue}
                style={[styles.messageInput, inputStyle]}
                multiline
                placeholderTextColor={inputPlaceholderColor}
                maxLength={inputMaxLength}
            />

            {!hideRightInputElement && 
            <View style={styles.leftRightInputContainer}>
                {rightInputElement}
            </View>}

            {((inputMessage.trim().length > 0 || alwaysShowSend) && !hideSendButton) && 
            <View style={[styles.sendButton, sendButtonContainerStyle]}>
                {customSendButton ? 
                    <View onTouchStart={sendMessage}>
                        {customSendButton}
                    </View> 
                : 
                <Button 
                    title='Send'
                    onPress={sendMessage}
                    accessibilityLabel='Send your message'
                    {...sendButtonProps}
                />}
            </View>}
        </View>}
    </>);
};

const styles = StyleSheet.create({
    bottomBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 0,
    },
    sendButton:{
        alignSelf: 'center', 
        margin: 5,
        marginRight: 0
    },
    messageInput:{
        padding: 5,
        flexGrow: 1,
        flexShrink: 1,
        borderColor: 'black',
        maxHeight: 150
    },
    leftRightInputContainer:{
        alignSelf: 'center'
    },
});

//make this component available to the app
export default InputSection;
