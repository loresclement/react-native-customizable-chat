export interface CustomizableChatMessage 
{
    id: number,
    content: string,
    date?: Date,
    isUser: boolean,
    uri?: string,
    userAvatar?: string
}