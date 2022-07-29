import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { database } from '../database';
import { User } from '../database/model/User';
import { api } from '../services/api';
import { Q } from '@nozbe/watermelondb';

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

  useEffect(() => {
    async function loadUserData() {
      const usersCollection = database.get('users');
      const result = await usersCollection.query().fetch();
      console.log('auth : loadUserData : ' + result.length + ' : ');
      console.log(result);
      if (result.length > 0) {
        const userData = result[0]._raw as unknown as User;
        updateUserStateAndApi(userData, userData.token);
      }
    }
    loadUserData();
  }, []);

  async function updateUser(updatedData: IUser) {
    try {
      console.log('auth : updateUser : updatedData : ');
      console.log(updatedData);

      const usersCollection = database.get<User>('users');

      await database.write(async () => {
        const userSelected = await usersCollection.find(updatedData.id);

        console.log('auth : updateUser : userSelected : ');
        console.log(userSelected);

        await userSelected.update((persistedData) => {
          persistedData.name = updatedData.name;
          persistedData.driver_license = updatedData.driver_license;
          persistedData.avatar = updatedData.avatar;
        });
      });

      setData(updatedData);
    } catch (error) {
      console.log('auth : updateUser error : ');
      console.log(error);
    }
  }

  async function signOut() {
    try {
      //const idUserLogout = data.id;
      setData({} as IUser);
      //const usersCollection = database.get<User>('users');
      await database.write(async () => {
        // const userSelected = await usersCollection.find(idUserLogout);
        // await userSelected.destroyPermanently();
        await database.get<User>('users').query(Q.unsafeSqlQuery('delete from users')).fetch();
      });
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.log('auth : signOut error : ');
      console.log(error);
    }
  }

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password });
      const { token, user } = response.data;
      const usersCollection = database.get<User>('users');
      let result = {} as User;
      await database.write(async () => {
        result = await usersCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });
      updateUserStateAndApi(result._raw as unknown as User, token);
    } catch (error) {
      console.log('auth : signIn error : ');
      console.log(error);
    }
  }

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
