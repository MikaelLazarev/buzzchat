/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

// TYPES
export const TYPES = {

    // CHATS
    ChatsController: Symbol.for("ChatsController"),
    ChatsRepository: Symbol.for("ChatsRepository"),
    MessagesRepository: Symbol.for("MessagesRepository"),
    ChatsService: Symbol.for("ChatsService"),

    // USERS
    ProfilesController: Symbol.for("ProfilesController"),
    ProfilesRepository: Symbol.for("ProfilesRepository"),
    ProfilesService: Symbol.for("ProfilesService"),

    UsersController: Symbol.for("UsersController"),
    UsersService: Symbol.for("UsersService"),
    UserWebAuthController: Symbol.for("UserWebAuthController"),
}
