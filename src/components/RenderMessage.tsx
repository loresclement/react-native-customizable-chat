import dayjs from 'dayjs';
import React, { memo, useEffect, useState, type ReactNode } from 'react';
import { Text, Image as ImageRN, TouchableOpacity, View, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import type { CustomizableChatMessage } from '../types/Message';
import { Image } from 'expo-image';
import { UriType } from '../types/UriType';

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
    debug: boolean,
    fileIcon: ReactNode,
    fileContainerStyle?: ViewStyle
}

const RenderMessage = memo((props: RenderMessageProps) => 
{
    const { msg, onMsgPress, onLongMsgPress, hideAvatar, userBubbleColor, otherUserBubbleColor, bubbleContainerStyle, disableBubblePressOpacity, styles, dateFormat, hideBubbleDate, imageStyle, customVideoBadge, bubbleTextStyle, dateTextStyle, handleEmailPress, handlePhonePress, handleUrlPress, debug = true, fileIcon, fileContainerStyle } = props

    const [type, settype] = useState<UriType>();
    const [fileSize, setfileSize] = useState<number>();

    const ChatImage = ({ uri }: { uri: string }) => 
    {
        const [aspectRatio, setAspectRatio] = useState<number>(1);

        useEffect(() => 
        {
            if (uri)
            {
                fetch(uri, {
                    method: 'HEAD'
                })
                .then(response => {
                    const contentType = response.headers.get('content-type') || "";
                    const contentLength = response.headers.get('content-length');

                    if (contentLength) 
                    {
                      const fileSizeInBytes = parseInt(contentLength, 10);
                      const fileSizeInMB = fileSizeInBytes / (1024 * 1024); 
                      setfileSize(fileSizeInMB)
                    }

                    let type

                    if(contentType.startsWith('application'))
                    {
                        type = UriType.file
                    }
                    else if(contentType.startsWith('image'))
                    {
                        if(contentType === 'image/gif')
                        {
                            type = UriType.gif
                        }
                        else 
                        {
                            type = UriType.image
                        }
                    }
                    else if(contentType.startsWith('video'))
                    {
                        type = UriType.video
                    }

                    settype(type)
                })
                .catch(error => {
                    if(debug) console.warn('Error while getting Content-Type :', error);
                });  

                ImageRN.getSize(
                    uri,
                    (width, height) => {
                        if (height !== 0) {
                            setAspectRatio(width / height);
                        }
                    },
                    error => {
                        if(debug && type === "image") console.warn('Error while getting the image size of ' + uri + ', ' + error);
                    }
                );
            }

        }, [uri]);
      
        return  (<>{type === UriType.gif || type === UriType.image || type === UriType.video ? 
                <Image
                    style={[{width: '100%', aspectRatio: aspectRatio}, imageStyle]}
                    source={uri}
                    contentFit="cover"
                    transition={500}
                />
                :
                <View style={[{flexDirection: 'row', alignItems: 'center'}, fileContainerStyle]}>
                    {fileIcon}
                    <Text style={bubbleTextStyle}>{fileSize?.toFixed(3)} MB</Text>
                </View>
            }
        </>)
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
                {msg.uri && 
                <View>
                    <ChatImage uri={msg.uri}/>
                    {(type === UriType.video && 
                            (customVideoBadge ? customVideoBadge : 
                                <Text style={styles.videoBadge}>
                                    VIDEO
                                </Text>
                            )
                        )
                        ||
                        (type === UriType.gif &&
                            (customVideoBadge ? customVideoBadge : 
                                <Text style={styles.videoBadge}>
                                    GIF
                                </Text>
                            )
                    )}
                </View>}

                <ParsedText 
                    style={[{marginTop: msg.uri ? 5 : 0, color: 'black'}, bubbleTextStyle]}
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
