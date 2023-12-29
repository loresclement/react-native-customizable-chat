import dayjs from 'dayjs';
import React, { memo, useEffect, useState, type ReactNode } from 'react';
import { Text, Image as ImageRN, TouchableOpacity, View, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import type { CustomizableChatMessage } from '../types/Message';
import { Image } from 'expo-image';

interface RenderMessageProps
{
    msg: CustomizableChatMessage
    onMsgPress: (msg: CustomizableChatMessage) => void
    onLongMsgPress: (msg: CustomizableChatMessage) => void 
    hideAvatar: boolean, 
    userBubbleColor: string, 
    otherUserBubbleColor: string, 
    bubbleContainerStyle?: ViewStyle, 
    disableBubblePressOpacity: boolean, 
    styles: any, 
    dateFormat: string, 
    hideBubbleDate: boolean, 
    imageStyle?: ImageStyle, 
    customVideoBadge: ReactNode, 
    bubbleTextStyle?: TextStyle, 
    dateTextStyle?: TextStyle, 
    handleEmailPress: (email: string) => void, 
    handlePhonePress: (phone: string) => void, 
    handleUrlPress: (url: string) => void,
    debug: boolean
}

const RenderMessage = memo((props: RenderMessageProps) => 
{
    const { msg, onMsgPress, onLongMsgPress, hideAvatar, userBubbleColor, otherUserBubbleColor, bubbleContainerStyle, disableBubblePressOpacity, styles, dateFormat, hideBubbleDate, imageStyle, customVideoBadge, bubbleTextStyle, dateTextStyle, handleEmailPress, handlePhonePress, handleUrlPress, debug = true } = props

    const ChatImage = ({ uri }: { uri: string }) => 
    {
        const [aspectRatio, setAspectRatio] = useState<number>(1);

        useEffect(() => 
        {
            if (uri) {
                ImageRN.getSize(
                    uri,
                    (width, height) => {
                        if (height !== 0) {
                            setAspectRatio(width / height);
                        }
                    },
                    error => {
                        if(debug) console.warn('Error while getting the image size of ' + uri + ', ' + error);
                    }
                );
            }

        }, [uri]);
      
        return  <Image
                    style={[{width: '100%', aspectRatio: aspectRatio}, imageStyle]}
                    source={uri}
                    contentFit="cover"
                    transition={500}
                />
    };

    return(
        <View style={{flexDirection: msg.isUser ? 'row-reverse' : 'row', 
                    alignItems: 'flex-end',
                    marginLeft: (msg.isUser) ? 0 : (!hideAvatar ? 10 : 0)}}
        >
            {(!hideAvatar && !msg.isUser) && 
            <Image
                style={{width: 30, height: 30, borderRadius: 50}}
                contentFit={"fill"}
                source={msg.userAvatar ? {uri: msg.userAvatar} : require("../pictures/empty-avatar.png")}
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
}, (prevProps, nextProps) => {
    if (prevProps.msg.id === nextProps.msg.id) return true;
    return false;
})

export default RenderMessage;
