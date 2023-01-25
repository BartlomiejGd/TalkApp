export interface GetMessageResponse{
    messageFrom: string;
    messageTo: string;
    messagePayload: string;
    messageTimestamp: string;
}


export interface SendMessageResponse {
    isSuccess: boolean;
}

export interface GetPaginatedConversationResponse {
    messages: GetMessageResponse[];
    pagesCount: number;

}
