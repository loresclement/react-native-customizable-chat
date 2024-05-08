import type { ButtonProps, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import type { CustomizableChatInputContent, CustomizableChatMessage } from "./Message";
import type { ReactNode } from "react";

export interface CustomizableChatProps
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
    defaultInputValue?: string,
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
    filePreview?: (msg: CustomizableChatMessage) => void,
    fileContainerStyle?: ViewStyle,
}