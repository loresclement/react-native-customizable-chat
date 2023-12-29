import React, { type ReactNode } from 'react';
import { View, StyleSheet, FlatList, Linking } from 'react-native';
import type { CustomizableChatMessage } from './types/Message';
import type { ButtonProps, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import type { TextStyle } from 'react-native';
import InputSection from './components/InputSection';
import RenderMessage from './components/RenderMessage';

interface CustomizableChatProps
{
    messages: Array<CustomizableChatMessage>
    onSend: (msg: any) => void;
    onMsgPress?: (msg: CustomizableChatMessage) => void,
    onLongMsgPress?: (msg: CustomizableChatMessage) => void,
    keepKeyboardOnSend?: boolean,
    hideBubbleDate?: boolean,
    hideAvatar?: boolean,
    noDivider?: boolean,
    alwaysShowSend?: boolean
    hideSendButton?: boolean,
    hideInput?: boolean
    hideRightInputElement?: boolean,
    hideLeftInputElement?: boolean,
    disableBubblePressOpacity?: boolean;
    containerStyle?: ViewStyle,
    bubbleContainerStyle?: ViewStyle,
    bubbleTextStyle?: TextStyle,
    sendButtonContainerStyle?: ViewStyle,
    imageStyle?: ImageStyle,
    dateFormat?: string,
    customSendButton?: ReactNode,
    sendButtonProps?: ButtonProps
    inputTopElement?: ReactNode,
    hideTopElement?: boolean,
    rightInputElement?: ReactNode,
    leftInputElement?: ReactNode,
    otherUserBubbleColor?: string
    userBubbleColor?: string,
    inputMaxLength?: number,
    inputPlaceholderValue?: string,
    backgroundColor?: string,
    inputStyle?: StyleProp<TextStyle>,
    inputPlaceholderColor?: string,
    dividerColor?: string,
    bottomContainerStyle?: ViewStyle,
    dateTextStyle?: TextStyle,
    customVideoBadge?: ReactNode,
    debug?: boolean
}

const CustomizableChat = (props: CustomizableChatProps) => 
{
    const { messages, 
            bubbleContainerStyle,
            sendButtonContainerStyle,  
            imageStyle,
            bubbleTextStyle,
            onSend,
            onLongMsgPress = () => {},
            containerStyle,
            sendButtonProps,
            keepKeyboardOnSend,
            dividerColor,
            hideBubbleDate = false,
            dateFormat = "HH:MM DD/MM/YYYY",
            customSendButton,
            bottomContainerStyle,
            hideTopElement = false,
            inputTopElement = <></>,
            alwaysShowSend,
            hideInput = false,
            hideSendButton,
            inputMaxLength = 5000,
            rightInputElement = <></>,
            leftInputElement = <></>,
            hideRightInputElement = false,
            hideLeftInputElement = false,
            otherUserBubbleColor = "lightblue",
            userBubbleColor = "lightgray",
            onMsgPress = () => {},
            disableBubblePressOpacity = false,
            inputPlaceholderValue = "Your message...",
            backgroundColor = 'white',
            inputStyle,
            inputPlaceholderColor,
            hideAvatar = false,
            noDivider = false,
            dateTextStyle,
            customVideoBadge,
            debug = true
            } = props

    const handleUrlPress = (url: string) => 
    {
        Linking.openURL(url);
    }
    
    const handlePhonePress = (phone: any) =>
    {
        const phoneLink = `tel:${phone}`;
        Linking.openURL(phoneLink);
    }
    
    const handleEmailPress = (email: string) => 
    {
        const mailtoUrl = `mailto:${email}`;
        Linking.openURL(mailtoUrl);
    }
            

    return (
        <View style={[styles.container, containerStyle]}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <RenderMessage
                        msg={item}
                        onMsgPress={onMsgPress}
                        onLongMsgPress={onLongMsgPress}
                        hideAvatar={hideAvatar}
                        userBubbleColor={userBubbleColor}
                        otherUserBubbleColor={otherUserBubbleColor}
                        bubbleContainerStyle={bubbleContainerStyle}
                        disableBubblePressOpacity={disableBubblePressOpacity}
                        styles={styles}
                        dateFormat={dateFormat}
                        hideBubbleDate={hideBubbleDate}
                        imageStyle={imageStyle}
                        customVideoBadge={customVideoBadge}
                        bubbleTextStyle={bubbleTextStyle}
                        dateTextStyle={dateTextStyle}
                        handleEmailPress={handleEmailPress}
                        handlePhonePress={handlePhonePress}
                        handleUrlPress={handleUrlPress}
                        debug={debug}
                    />
                )}
                inverted
                contentContainerStyle={{backgroundColor: backgroundColor}}
                keyExtractor={(item: CustomizableChatMessage) => item.id.toString()}
            />

            <InputSection 
                onSend={onSend} 
                keepKeyboardOnSend={keepKeyboardOnSend} 
                noDivider={noDivider} 
                alwaysShowSend={alwaysShowSend} 
                hideSendButton={hideSendButton} 
                hideInput={hideInput} 
                hideRightInputElement={hideRightInputElement} 
                hideLeftInputElement={hideLeftInputElement} 
                sendButtonContainerStyle={sendButtonContainerStyle} 
                customSendButton={customSendButton} 
                sendButtonProps={sendButtonProps} 
                inputTopElement={inputTopElement} 
                hideTopElement={hideTopElement} 
                rightInputElement={rightInputElement} 
                leftInputElement={leftInputElement} 
                inputMaxLength={inputMaxLength} 
                inputPlaceholderValue={inputPlaceholderValue} 
                inputStyle={inputStyle} 
                inputPlaceholderColor={inputPlaceholderColor} 
                dividerColor={dividerColor} 
                bottomContainerStyle={bottomContainerStyle} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatBox:{
        padding: 10,
        borderRadius: 10,
        margin: 10,
        maxWidth: '70%'
    },
    dateStyle:{
        fontSize: 12,
        color: 'gray'
    },
    url: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    hashTag: {
        fontStyle: 'italic',
    },
    videoBadge:{
        position: 'absolute', 
        top: 5, 
        right: 5, 
        color: 'white', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        paddingHorizontal: 5,
        borderRadius: 5
    }
});

export default CustomizableChat;
