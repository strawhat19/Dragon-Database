import type { UserRecord } from '../models/users/User';
import type { Providers } from '../../types/types';

export interface MockGoogleProfile {
  name?: string;
  email?: string;
  photoURL?: string;
}

export interface MockSession {
  demo: true;
  version: 1;
  userId: string;
  createdAt: string;
  expiresAt: number;
  provider: Providers.GoogleMock;
}

export interface AuthenticationResult {
  user: UserRecord;
  expiresAt: number;
}

