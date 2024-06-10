import type { ReactNode } from "react"
import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

export type CustomizableChatMessage =
{
    id: number,
    content: string,
    date?: Date,
    isUser: boolean,
    file?: CustomizableChatFile
    seen?: boolean
    userAvatar?: string
}

export type CustomizableChatFile = {
    uri: string,
    mimetype: string
}

export type CustomizableChatInputContent = {
    content: string
}

export interface RenderMessageProps
{
    msg: CustomizableChatMessage
    onMsgPress: (msg: CustomizableChatMessage) => void
    onLongMsgPress: (msg: CustomizableChatMessage) => void 
    onAvatarPress: (msg: CustomizableChatMessage) => void
    hideOtherUserAvatar: boolean, 
    hideUserAvatar: boolean,
    userBubbleColor: string, 
    otherUserBubbleColor: string, 
    bubbleContainerStyle?: ViewStyle, 
    disableBubblePressOpacity: boolean, 
    seenMark: ReactNode,
    sentMark: ReactNode
    dateFormat: string, 
    hideBubbleDate: boolean, 
    imageStyle?: ImageStyle, 
    customVideoBadge: ReactNode, 
    bubbleTextStyle?: TextStyle, 
    otherUserBubbleTextStyle?: TextStyle
    dateTextStyle?: TextStyle, 
    otherUserDateTextStyle?: TextStyle
    handleEmailPress: (email: string) => void, 
    handlePhonePress: (phone: string) => void, 
    handleUrlPress: (url: string) => void,
    debug: boolean,
    filePreview?: (msg: CustomizableChatMessage) => void,
}