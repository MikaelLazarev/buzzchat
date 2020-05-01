import {Contact} from './contact';

export interface Chat {
  id: string;
  name: string;
  members: Contact[];
}
