/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {createDataLoaderReducer} from "../dataloader/reducer";
import {Chat} from "../../core/chat";
import {CHATS_PREFIX} from "./";

export default createDataLoaderReducer<Chat>(CHATS_PREFIX)
