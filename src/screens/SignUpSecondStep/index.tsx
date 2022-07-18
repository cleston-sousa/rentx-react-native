import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Yup from 'yup';

import { StackRoutesParamList } from '../../routes/stack.routes';

import { BackButton } from '../../components/BackButton';
import { Bullet } from '../../components/Bullet';

import { BreadCrumb, Container, Form, FormTitle, Header, SubTitle, Title } from './styles';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';

export type ScreenProps = NativeStackScreenProps<StackRoutesParamList, 'SignUpSecondStep'>;

const schema = Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
    .required('Confirmação de senha obrigatória')
});

export function SignUpSecondStep({ route }: ScreenProps) {
  const { goBack } = useNavigation();
  const theme = useTheme();
  const { user } = route.params;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleGoBack() {
    goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Opa', 'Senha e confirmação de senha devem ser preenchidos');
    }

    if (password != passwordConfirm) {
      return Alert.alert('Opa', 'Senha e confirmação devem ser iguais');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} containerStyle={{ flex: 1 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="position" enabled>
        <Container>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <Header>
            <BackButton onPress={handleGoBack} />
            <BreadCrumb>
              <Bullet active />
              <Bullet />
            </BreadCrumb>
          </Header>
          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput iconName="lock" placeholder="Senha" onChangeText={setPassword} value={password} />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button title="Cadastrar" color={theme.colors.success} onPress={handleRegister} />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
