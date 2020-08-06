/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import SocketIO from "socket.io";
import {tokenData} from "./users";
import {SocketUpdate} from "./operations";

export type socketListeners = Record<string, (...args: any[]) => Promise<void>>;

export interface SocketPusherDelegateI {
    setPusher(pusher: SocketPusher): void;
}

export interface SocketController extends SocketPusherDelegateI {
    namespace: string;
    getListeners: (socket: SocketWithToken, userId: string) => socketListeners;
}

export interface SocketPusher {
    pushPendingQueue(event: SocketUpdate): void
    pushUpdateQueue(event: SocketUpdate): void
}

export interface SocketWithToken extends SocketIO.Socket, SocketPusher {
    tData: tokenData;
    ok: (opHash: string) => void;
    failure: (opHash: string, error: string) => void;
}
