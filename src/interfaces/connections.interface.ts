import e from "express";

export interface SendNewConnectionResponse {
    isSuccess: boolean;
}

export interface AvailableConnectionResponse {
    connectionId: string;
    availableUserId: string
}

export interface ConnectionToAcceptResponse
{
    connectionId: string;
    userSenderId: string;
    date: string;
}