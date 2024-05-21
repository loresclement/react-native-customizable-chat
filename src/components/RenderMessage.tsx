import dayjs from 'dayjs';
import React, { memo, useEffect, useState } from 'react';
import { Text, Image as ImageRN, TouchableOpacity, View, StyleSheet } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import type { CustomizableChatFile, RenderMessageProps } from '../types/Message';
import { Image } from 'expo-image';
import { UriType } from '../types/UriType';

const RenderMessage = memo((props: RenderMessageProps) => 
{
    const { msg, onMsgPress, onLongMsgPress, hideUserAvatar, hideOtherUserAvatar, userBubbleColor, otherUserBubbleColor, bubbleContainerStyle, disableBubblePressOpacity, dateFormat, hideBubbleDate, imageStyle, customVideoBadge, bubbleTextStyle, dateTextStyle, handleEmailPress, handlePhonePress, handleUrlPress, debug = true, filePreview, otherUserBubbleTextStyle, otherUserDateTextStyle, seenMark, sentMark } = props

    const [type, settype] = useState<UriType>();

    const ChatImage = ({ file }: { file: CustomizableChatFile }) => 
    {
        const [aspectRatio, setAspectRatio] = useState<number>(1);

        useEffect(() => 
        {
            if (file)
            {
                if(file.mimetype.startsWith('application'))
                {
                    settype(UriType.file)
                }
                else if(file.mimetype.startsWith('image'))
                {
                    settype(file.mimetype === 'image/gif' ? UriType.gif : UriType.image)
                }
                else if(file.mimetype.startsWith('video'))
                {
                    settype(UriType.video)
                }

                ImageRN.getSize(file.uri, (width, height) => 
                    {
                        setAspectRatio(height !== 0 ? (width / height) : 1);
                    },
                    error => {
                        if(debug && type === 'image') console.warn('Error while getting the image size of ' + file.uri + ', ' + error);
                    }
                );
            }
        }, [file]);
      
        if(type === undefined)
        {
            return <></>
        }

        return  (<>{type === UriType.gif || type === UriType.image || type === UriType.video ? 
                <Image
                    style={[{width: '100%', aspectRatio: aspectRatio}, imageStyle]}
                    source={file.uri}
                    contentFit='cover'
                    transition={500}
                />
                :<>
                    {filePreview ? filePreview(msg) :
                    <>{/*<Text style={bubbleTextStyle}>{fileInfo?.size?.toFixed(3)} MB</Text>*/}</>
                    }
                </>
            }
        </>)
    };

    return(
        <View 
            style={{
                flexDirection: msg.isUser ? 'row-reverse' : 'row', 
                alignItems: 'flex-end',
                marginLeft: (msg.isUser) ? 0 : (!hideOtherUserAvatar ? 10 : 0)
            }}
        >
            {(!hideOtherUserAvatar && !msg.isUser) && 
                <Image
                    style={{width: 30, height: 30, borderRadius: 50}}
                    contentFit={'fill'}
                    source={msg.userAvatar ? {uri: msg.userAvatar} : require('../pictures/empty-avatar.png')}
                />
            }
            {(!hideUserAvatar && msg.isUser) && 
                <Image
                    style={{width: 30, height: 30, borderRadius: 50}}
                    contentFit={'fill'}
                    source={msg.userAvatar ? {uri: msg.userAvatar} : require('../pictures/empty-avatar.png')}
                />
            }
            <TouchableOpacity 
                style={
                    [
                        styles.chatBox, 
                        {
                            backgroundColor: msg.isUser ? userBubbleColor : otherUserBubbleColor, 
                        }, 
                        bubbleContainerStyle
                    ]
                } 
                onPress={() => onMsgPress(msg)} 
                onLongPress={() => onLongMsgPress(msg)}
                activeOpacity={disableBubblePressOpacity ? 1 : 0.2}
            >
                {msg.file && 
                <View>
                    <ChatImage file={msg.file}/>
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
                    style={[{marginTop: msg.file ? 5 : 0, color: 'black'}, msg.isUser ? bubbleTextStyle : otherUserBubbleTextStyle]}
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

                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    {!hideBubbleDate && 
                    <Text 
                        style={[styles.dateStyle, msg.isUser ? dateTextStyle : otherUserDateTextStyle]}
                    >
                        {dayjs(msg.date).format(dateFormat)}
                    </Text>}
  
                    {msg.isUser && (msg.seen ? 
                        <>
                            {seenMark}
                        </>
                        : 
                        <>
                            {sentMark}
                        </>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    )
}, (prevProps, nextProps) => {
    if (prevProps.msg.id === nextProps.msg.id && 
        prevProps.msg.content === nextProps.msg.content && 
        prevProps.msg.date === nextProps.msg.date && 
        prevProps.msg.isUser === nextProps.msg.isUser && 
        prevProps.msg.seen === nextProps.msg.seen && 
        prevProps.msg.file === nextProps.msg.file && 
        prevProps.msg.userAvatar === nextProps.msg.userAvatar) return true;
    return false;
})

RenderMessage.displayName = 'RenderMessage'

const styles = StyleSheet.create({
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
})

export default RenderMessage;
