export type CustomizableChatMessage =
{
    id: number,
    content: string,
    date?: Date,
    isUser: boolean,
    uri?: string,
    seen?: boolean
    userAvatar?: string
}

export type CustomizableChatInputContent = {
    content: string
}