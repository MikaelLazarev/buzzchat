/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {createDataLoaderReducer} from '../dataloader/reducer';
import {CONTACT_PREFIX} from './';
import {Contact} from '../../core/contact';

export default createDataLoaderReducer<Contact>(CONTACT_PREFIX);
