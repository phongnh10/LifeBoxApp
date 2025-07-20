// realm/providers/RealmProvider.js
import React from 'react';
import { RealmProvider as BaseRealmProvider } from '@realm/react';
import { realmConfig } from '../realmConfig';

export const RealmProvider = ({ children }) => {
  return <BaseRealmProvider {...realmConfig}>{children}</BaseRealmProvider>;
};
