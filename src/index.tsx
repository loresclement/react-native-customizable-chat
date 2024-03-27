import React, { type ReactNode } from 'react';
import { View, StyleSheet, FlatList, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import type { CustomizableChatInputContent, CustomizableChatMessage } from './types/Message';
import type { ButtonProps, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import type { TextStyle } from 'react-native';
import InputSection from './components/InputSection';
import RenderMessage from './components/RenderMessage';
import type { BubbleFileMetada } from './types/BubbleFileMetadata';

interface CustomizableChatProps
{
    messages: Array<CustomizableChatMessage>
    onSend: (msg: CustomizableChatInputContent) => void;
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
    otherUserBubbleTextStyle?: TextStyle
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
    seenMark?: ReactNode,
    sentMark?: ReactNode
    bottomContainerStyle?: ViewStyle,
    dateTextStyle?: TextStyle,
    otherUserDateTextStyle?: TextStyle
    customVideoBadge?: ReactNode,
    debug?: boolean,
    filePreview?: (msg: CustomizableChatMessage, fileInfos: BubbleFileMetada) => void,
    fileContainerStyle?: ViewStyle,
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
            seenMark = <></>,
            sentMark = <></>,
            containerStyle,
            sendButtonProps,
            keepKeyboardOnSend,
            dividerColor,
            hideBubbleDate = false,
            dateFormat = 'HH:mm DD/MM/YYYY',
            customSendButton,
            bottomContainerStyle,
            hideTopElement = false,
            inputTopElement = <></>,
            otherUserDateTextStyle,
            alwaysShowSend,
            hideInput = false,
            hideSendButton,
            inputMaxLength = 5000,
            rightInputElement = <></>,
            leftInputElement = <></>,
            hideRightInputElement = false,
            hideLeftInputElement = false,
            otherUserBubbleColor = 'lightblue',
            userBubbleColor = 'lightgray',
            onMsgPress = () => {},
            disableBubblePressOpacity = false,
            inputPlaceholderValue = 'Your message...',
            backgroundColor = 'white',
            inputStyle,
            inputPlaceholderColor,
            hideAvatar = false,
            noDivider = false,
            dateTextStyle,
            customVideoBadge,
            otherUserBubbleTextStyle,
            debug = true,
            filePreview,
            } = props

    const handleUrlPress = (url: string) => 
    {
        Linking.openURL(url);
    }
    
    const handlePhonePress = (phone: string) =>
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
        >
            <View style={[styles.container, containerStyle]}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <RenderMessage
                            msg={item}
                            filePreview={filePreview}
                            onMsgPress={onMsgPress}
                            onLongMsgPress={onLongMsgPress}
                            hideAvatar={hideAvatar}
                            userBubbleColor={userBubbleColor}
                            otherUserBubbleColor={otherUserBubbleColor}
                            bubbleContainerStyle={bubbleContainerStyle}
                            disableBubblePressOpacity={disableBubblePressOpacity}
                            seenMark={seenMark}
                            sentMark={sentMark}
                            dateFormat={dateFormat}
                            hideBubbleDate={hideBubbleDate}
                            imageStyle={imageStyle}
                            customVideoBadge={customVideoBadge}
                            bubbleTextStyle={bubbleTextStyle}
                            otherUserBubbleTextStyle={otherUserBubbleTextStyle}
                            dateTextStyle={dateTextStyle}
                            otherUserDateTextStyle={otherUserDateTextStyle}
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
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default CustomizableChat;
