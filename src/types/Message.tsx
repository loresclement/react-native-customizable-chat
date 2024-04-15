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