import React, { useEffect, useState, type ReactNode } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import type { CustomizableChatMessage } from './types/Message';
import type { ButtonProps, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import type { TextStyle } from 'react-native';
import dayjs from 'dayjs';
import ParsedText from 'react-native-parsed-text';
import InputSection from './components/InputSection';

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
    customVideoBadge?: ReactNode
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
            customVideoBadge
            } = props

    const ChatImage = ({ uri }: { uri: string }) => 
    {
        const [aspectRatio, setAspectRatio] = useState<number>(1);

        useEffect(() => 
        {
            if (uri) {
                Image.getSize(
                    uri,
                    (width, height) => {
                        if (height !== 0) {
                            setAspectRatio(width / height);
                        }
                    },
                    error => {
                        console.error('Error while getting the image size, ', error);
                    }
                );
            }
        }, [uri]);
      
        return <Image 
                    source={{ uri }} 
                    style={[{width: '100%', aspectRatio: aspectRatio}, imageStyle]} 
                />;
    };

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
    
    const renderMessage = (msg: CustomizableChatMessage) =>
    {
        return(
            <View style={{flexDirection: msg.isUser ? 'row-reverse' : 'row', 
                        alignItems: 'flex-end',
                        marginLeft: (msg.isUser) ? 0 : (!hideAvatar ? 10 : 0)}}
            >
                {(!hideAvatar && !msg.isUser) && 
                <Image
                    style={{width: 30, height: 30, borderRadius: 50, resizeMode: 'stretch'}}
                    source={msg.userAvatar ? {uri: msg.userAvatar} : require("./pictures/empty-avatar.png")}
                />}
                <TouchableOpacity 
                    style={[styles.chatBox, {
                                backgroundColor: msg.isUser ? userBubbleColor : otherUserBubbleColor, 
                            }, bubbleContainerStyle]} 
                    onPress={() => onMsgPress(msg)} 
                    onLongPress={() => onLongMsgPress(msg)}
                    activeOpacity={disableBubblePressOpacity ? 1 : 0.2}
                >
                    {msg.image && 
                    <View>
                        <ChatImage uri={msg.image}/>
                        {msg.isVideo && 
                        (customVideoBadge ? customVideoBadge : <Text style={styles.videoBadge}>VIDEO</Text>)}
                    </View>}

                    <ParsedText 
                        style={[{marginTop: msg.image ? 5 : 0, color: 'black'}, bubbleTextStyle]}
                        parse={
                            [
                              {type: 'url',                       style: styles.url, onPress: handleUrlPress},
                              {type: 'phone',                     style: styles.url, onPress: handlePhonePress},
                              {type: 'email',                     style: styles.url, onPress: handleEmailPress},
                              {pattern: /#(\w+)/,                 style: styles.hashTag},
                            ]
                        }
                        childrenProps={{allowFontScaling: false}}
                    >
                        {msg.content}
                    </ParsedText>

                    {!hideBubbleDate && 
                    <Text style={[styles.dateStyle, dateTextStyle]}>{dayjs(msg.date).format(dateFormat)}</Text>}
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[styles.container, containerStyle]}>
            <FlatList
                data={messages}
                renderItem={({ item }) => renderMessage(item)}
                inverted
                contentContainerStyle={{backgroundColor: backgroundColor}}
                keyExtractor={(_item: CustomizableChatMessage, index: number) => index.toString()}
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
