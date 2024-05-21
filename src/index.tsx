import React from 'react';
import { View, StyleSheet, FlatList, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import InputSection from './components/InputSection';
import RenderMessage from './components/RenderMessage';
import type { CustomizableChatMessage, CustomizableChatProps } from './types';

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
            defaultInputValue = '',
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
            hideOtherUserAvatar = false,
            hideUserAvatar = false,
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

    const MessagesList = () => 
    {
        return(
            <FlatList
                data={messages}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RenderMessage
                        msg={item}
                        filePreview={filePreview}
                        onMsgPress={onMsgPress}
                        onLongMsgPress={onLongMsgPress}
                        hideOtherUserAvatar={hideOtherUserAvatar}
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
                        hideUserAvatar={hideUserAvatar}
                    />
                )}
                inverted
                contentContainerStyle={{backgroundColor: backgroundColor}}
                keyExtractor={(item: CustomizableChatMessage) => item.id.toString()}
            />
        )
    }

    const InputSectionComponent = () => 
    {
        return(
            <InputSection 
                onSend={onSend} 
                keepKeyboardOnSend={keepKeyboardOnSend} 
                noDivider={noDivider} 
                defaultInputValue={defaultInputValue}
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
        )
    }
            
    return (<>
        {Platform.OS === 'ios' ? 
        
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{flex: 1}}
        >
            <View style={[styles.container, containerStyle]}>
                <MessagesList/>
                <InputSectionComponent/>
            </View>
        </KeyboardAvoidingView> : 
        <View style={[styles.container, containerStyle]}>
            <MessagesList/>
            <InputSectionComponent/>
        </View>}
    </>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default CustomizableChat;
