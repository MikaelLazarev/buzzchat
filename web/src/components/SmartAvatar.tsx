/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Avatar} from 'react-native-elements';

interface SmartAvatarProps {
    name: string;
    size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
}

const SmartAvatar: React.FC<SmartAvatarProps> = ({name, size}) => {
    const title = name
        .split('')
        .filter((e) => e >= 'A' && e <= 'Z')
        .splice(0, 2)
        .join('');

    return (
        <Avatar title={title} size={size} />
    );
};

export default SmartAvatar;
