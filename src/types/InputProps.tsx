import type { ButtonProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import type { CustomizableChatInputContent } from "./Message";
import type { ReactNode } from "react";

export interface InputSectionProps
{
    onSend: (msg: CustomizableChatInputContent) => void;
    keepKeyboardOnSend?: boolean,
    noDivider: boolean,
    defaultInputValue: string
    alwaysShowSend?: boolean
    hideSendButton?: boolean,
    hideInput: boolean
    hideRightInputElement: boolean,
    hideLeftInputElement: boolean,
    sendButtonContainerStyle?: ViewStyle,
    customSendButton?: ReactNode,
    sendButtonProps?: ButtonProps
    inputTopElement: ReactNode,
    hideTopElement: boolean,
    rightInputElement: ReactNode,
    leftInputElement: ReactNode,
    inputMaxLength: number,
    inputPlaceholderValue?: string,
    inputStyle: StyleProp<TextStyle>,
    inputPlaceholderColor?: string,
    dividerColor?: string,
    bottomContainerStyle?: ViewStyle,
}