import e from "express";

export interface SendNewConnectionResponse {
    isSuccess: boolean;
}

export interface AvailableConnection {
    availableUser: string
}

export type ListOfConnectionsResponse = AvailableConnection[];