export interface CustomizableChatMessage 
{
    id: number,
    content: string,
    date?: Date,
    isUser: boolean,
    image?: string,
    userAvatar?: string
}