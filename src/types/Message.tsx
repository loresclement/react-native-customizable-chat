export type CustomizableChatMessage =
{
    id: number,
    content: string,
    date?: Date,
    isUser: boolean,
    uri?: string,
    userAvatar?: string
}

export type CustomizableChatInputContent = {
    content: string
}