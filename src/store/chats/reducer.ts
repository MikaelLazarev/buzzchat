/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {createDataLoaderReducer} from "../dataloader/reducer";
import {Chat} from "../../core/chat";
import {CHATS_PREFIX} from "./";

export default createDataLoaderReducer<Chat>(CHATS_PREFIX)
