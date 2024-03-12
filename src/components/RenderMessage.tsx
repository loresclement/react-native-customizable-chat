import dayjs from 'dayjs';
import React, { memo, useEffect, useState, type ReactNode } from 'react';
import { Text, Image as ImageRN, TouchableOpacity, View, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import type { CustomizableChatMessage } from '../types/Message';
import { Image } from 'expo-image';
import { UriType } from '../types/UriType';
import type { BubbleFileMetada } from '../types/BubbleFileMetadata';

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
    filePreview?: (msg: CustomizableChatMessage, fileInfos: BubbleFileMetada) => void,
}

const RenderMessage = memo((props: RenderMessageProps) => 
{
    const { msg, onMsgPress, onLongMsgPress, hideAvatar, userBubbleColor, otherUserBubbleColor, bubbleContainerStyle, disableBubblePressOpacity, styles, dateFormat, hideBubbleDate, imageStyle, customVideoBadge, bubbleTextStyle, dateTextStyle, handleEmailPress, handlePhonePress, handleUrlPress, debug = true, filePreview } = props

    const [type, settype] = useState<UriType>();

    const ChatImage = ({ uri }: { uri: string }) => 
    {
        const [aspectRatio, setAspectRatio] = useState<number>(1);
        const [fileInfo, setfileInfo] = useState<BubbleFileMetada>({
            size: 0,
            lastModified: new Date(),
            contentType: ''
        });

        useEffect(() => 
        {
            if (uri)
            {
                fetch(uri, {
                    method: 'HEAD'
                })
                .then(response => {
                    const contentType = response.headers.get('content-type') || '';
                    const contentLength = response.headers.get('content-length') || '';

                    if(debug) console.log(JSON.stringify(response.headers, null, 3))

                    setfileInfo({
                        size: parseInt(contentLength, 10) / (1024 * 1024), 
                        lastModified: response.headers.get('last-modified') || new Date(),
                        contentType: response.headers.get('content-type') || ''
                    })

                    if(contentType.startsWith('application'))
                    {
                        settype(UriType.file)
                    }
                    else if(contentType.startsWith('image'))
                    {
                        settype(contentType === 'image/gif' ? UriType.gif : UriType.image)
                    }
                    else if(contentType.startsWith('video'))
                    {
                        settype(UriType.video)
                    }
                })
                .catch(error => {
                    if(debug) console.warn('Error while getting Content-Type :', error);
                });  

                ImageRN.getSize(uri, (width, height) => {
                        setAspectRatio(height !== 0 ? (width / height) : 1);
                    },
                    error => {
                        if(debug && type === "image") console.warn('Error while getting the image size of ' + uri + ', ' + error);
                    }
                );
            }
        }, [uri]);
      
        if(type === undefined)
        {
            return <></>
        }

        return  (<>{type === UriType.gif || type === UriType.image || type === UriType.video ? 
                <Image
                    style={[{width: '100%', aspectRatio: aspectRatio}, imageStyle]}
                    source={uri}
                    contentFit="cover"
                    transition={500}
                />
                :<>
                    {filePreview ? filePreview(msg, fileInfo) :
                    <Text style={bubbleTextStyle}>{fileInfo?.size?.toFixed(3)} MB</Text>
                    }
                </>
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
