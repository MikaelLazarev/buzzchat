import React from 'react';
import {View} from 'react-native';
import {Avatar, withBadge} from 'react-native-elements';
import {Contact} from '../core/contact';

interface SmartAvatarProps {
  persons: Contact[];
  preferableId?: string;
}

const SmartAvatar: React.FC<SmartAvatarProps> = ({persons, preferableId}) => {
  if (!persons || persons.length === 0) {
    return <Avatar rounded icon={{name: 'ios-person', type: 'ionicon'}} />;
  }
  const notNullPersons = persons.filter((i) => i);
  const preferable = notNullPersons.find((elem) => elem.id === preferableId);
  const userAvatarUrl = preferable
    ? preferable.avatarUrl
    : notNullPersons[0].avatarUrl;

  // Add a badge to Avatar if it's more than 1 person
  const AvatarComponent =
    notNullPersons.length === 1
      ? Avatar
      : withBadge('+' + (notNullPersons.length - 1), {
          status: 'primary',
          top: 12,
          left: 8,
        })(Avatar);

  return (
    <View style={{paddingTop: 3}}>
      <AvatarComponent rounded source={{uri: userAvatarUrl}} />
    </View>
  );
};

export default SmartAvatar;
