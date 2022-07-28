import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { database } from '../database';
import { User } from '../database/model/User';
import { api } from '../services/api';

interface IUser {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updatedData: IUser) => Promise<void>;
}
interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProvider) {
  const [data, setData] = useState<IUser>({} as IUser);

  async function updateUser(updatedData: IUser) {
    try {
      const usersCollection = database.get<User>('users');

      await database.write(async () => {
        const userSelected = await usersCollection.find(updatedData.id);
        await userSelected.update((persistedData) => {
          persistedData.name = updatedData.name;
          persistedData.driver_license = updatedData.driver_license;
          persistedData.avatar = updatedData.avatar;
        });
      });

      setData(updatedData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const usersCollection = database.get<User>('users');
      await database.write(async () => {
        const userSelected = await usersCollection.find(data.id);
        await userSelected.destroyPermanently();
      });
      delete api.defaults.headers.common['Authorization'];
      setData({} as IUser);
    } catch (error) {
      console.log('Logout error: ');
      console.log(error);
    }
  }

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      updateUserStateAndApi(user, token);

      const usersCollection = database.get<User>('users');

      await database.write(async () => {
        await usersCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const usersCollection = database.get('users');
      const result = await usersCollection.query().fetch();
      if (result.length > 0) {
        const userData = result[0]._raw as unknown as User;
        updateUserStateAndApi(userData, userData.token);
      }
    }
    loadUserData();
  });

  function updateUserStateAndApi(user: User, token: string) {
    setData({ ...user, token });
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>{children}</AuthContext.Provider>;
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
