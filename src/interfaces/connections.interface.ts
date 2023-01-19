import e from "express";

export interface SendNewConnectionResponse {
    isSuccess: boolean;
}

export interface AvailableConnection {
    availableUserId: string
}
