import { signOut, hydrateSession, signInWithGoogleMock } from '../shared/authentication/service';

export const authAPI = { signOut, hydrateSession, signInWithGoogleMock };
export type { MockGoogleProfile, AuthenticationResult } from '../shared/authentication/types';

