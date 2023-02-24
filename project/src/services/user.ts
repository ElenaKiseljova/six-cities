import { TUserData } from '../types/user-data';

const USER_DATA_KEY_NAME = 'six-cities-user';

const isUserData = (u: TUserData | null): u is TUserData => {
  if (u) {
    return 'token' in u;
  }

  return false;
};

export const getUserData = (
  type: keyof TUserData
): string | number | boolean => {
  const userString = localStorage.getItem(USER_DATA_KEY_NAME);
  const user = userString ? (JSON.parse(userString) as TUserData) : null;

  if (isUserData(user)) {
    return user[type];
  }

  return false;
};

export const saveUserData = (userData: TUserData): void => {
  localStorage.setItem(USER_DATA_KEY_NAME, JSON.stringify(userData));
};

export const dropUserData = (): void => {
  localStorage.removeItem(USER_DATA_KEY_NAME);
};
