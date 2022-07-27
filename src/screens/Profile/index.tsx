import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section
} from './styles';

const schema = Yup.object().shape({
  driver_license: Yup.string().required('CNH é obrigatória'),
  name: Yup.string().required('Nome é obrigatório')
});

export function Profile() {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const [option, setOption] = useState<'data' | 'password'>('data');
  const { user, signOut, updateUser } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  async function handleUpdateUser() {
    try {
      const data = { name, driver_license: driverLicense };

      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name: name,
        driver_license: driverLicense,
        avatar: avatar,
        token: user.token
      });

      Alert.alert('Profile Atualizado');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops', error.message);
      } else {
        Alert.alert('Ops', 'Não foi possível salvar os dados.');
      }
    }
  }

  function handleGoBack() {
    goBack();
  }

  function handleSignOut() {
    Alert.alert('Yo!', 'Lembre-se que saindo precisará de conexão para entrar novamente no app.', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Sair',
        onPress: () => {
          signOut();
        }
      }
    ]);
  }

  function handleOptionChange(type: 'data' | 'password') {
    setOption(type);
  }

  function isOption(type: 'data' | 'password') {
    return option === type;
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    if (result.cancelled) return;

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleGoBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={RFValue(24)} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={RFValue(24)} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                onPress={() => {
                  handleOptionChange('data');
                }}
                active={isOption('data')}
              >
                <OptionTitle active={isOption('data')}>Dados</OptionTitle>
              </Option>
              <Option
                onPress={() => {
                  handleOptionChange('password');
                }}
                active={isOption('password')}
              >
                <OptionTitle active={isOption('password')}>Trocar Senha</OptionTitle>
              </Option>
            </Options>
            {isOption('data') && (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input iconName="mail" editable={false} defaultValue={user.email} />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            )}
            {isOption('password') && (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha Atual" />
                <PasswordInput iconName="lock" placeholder="Nova Senha" />
                <PasswordInput iconName="lock" placeholder="Repetir Senha" />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleUpdateUser} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
