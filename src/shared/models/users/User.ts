import { Data, parseData, type DataRecord } from '../Data';
import { isRecord, dataError } from '../../common/values';
import { Roles, Types, Providers, ProfilePrivacy } from '../../../types/types';

export interface UserRecord extends DataRecord {
  email: string;
  role: Roles;
  photoURL?: string;
  provider: Providers;
  publicSharing: boolean;
  profilePrivacy: ProfilePrivacy;
}

export type PublicUserRecord = Pick<UserRecord, `id` | `name` | `number` | `created` | `updated` | `photoURL`>;

export class User extends Data {
  email: string;
  role: Roles;
  photoURL?: string;
  provider: Providers;
  publicSharing: boolean;
  profilePrivacy: ProfilePrivacy;

  constructor(record: DataRecord & Pick<UserRecord, `email`> & Partial<UserRecord>) {
    super(record);
    this.email = record.email;
    this.role = record.role ?? Roles.Subscriber;
    this.photoURL = record.photoURL;
    this.provider = record.provider ?? Providers.GoogleMock;
    this.publicSharing = record.publicSharing ?? false;
    this.profilePrivacy = record.profilePrivacy ?? ProfilePrivacy.Private;
  }

  toRecord(): UserRecord {
    return {
      ...super.toRecord(),
      email: this.email,
      role: this.role,
      provider: this.provider,
      publicSharing: this.publicSharing,
      profilePrivacy: this.profilePrivacy,
      ...(this.photoURL === undefined ? {} : { photoURL: this.photoURL }),
    };
  }
}

export const parseUser = (value: unknown): UserRecord => {
  const data = parseData(value, Types.User, `Saved Users`);
  if (!isRecord(value) || typeof value.email !== `string` || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)
    || !Object.values(Roles).includes(value.role as Roles) || value.provider !== Providers.GoogleMock
    || typeof value.publicSharing !== `boolean` || !Object.values(ProfilePrivacy).includes(value.profilePrivacy as ProfilePrivacy)
    || (value.photoURL !== undefined && (typeof value.photoURL !== `string` || !/^https:\/\//i.test(value.photoURL)))) {
    throw dataError(`Saved Users`);
  }
  return new User({
    ...data,
    email: value.email,
    role: value.role as Roles,
    provider: Providers.GoogleMock,
    publicSharing: value.publicSharing,
    profilePrivacy: value.profilePrivacy as ProfilePrivacy,
    ...(value.photoURL === undefined ? {} : { photoURL: value.photoURL as string }),
  }).toRecord();
};

export const publicUser = (user: UserRecord): PublicUserRecord => ({
  id: user.id,
  name: user.name,
  number: user.number,
  created: user.created,
  updated: user.updated,
  ...(user.photoURL === undefined ? {} : { photoURL: user.photoURL }),
});

