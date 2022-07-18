import React, { useState } from 'react';
import { StatusBar, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Footer, Container, Header, SubTitle, Title, Form } from './styles';

interface IProps {
  onPress: () => void;
}

const schema = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
  password: Yup.string().required('Senha obrigatória')
});

export function SignIn({ onPress }: IProps) {
  const { navigate } = useNavigation();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      await schema.validate({ email, password });
      Alert.alert('passou');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Nah', error.message);
      } else {
        return Alert.alert('Nah', 'Erro bah?');
      }
    }
  }

  function handleSignUp() {
    navigate('SignUpFirstStep');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} containerStyle={{ flex: 1 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="position" enabled>
        <Container onLayout={onPress}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>Faça seu login para começar{'\n'}uma experiência incrível.</SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput iconName="lock" placeholder="Senha" onChangeText={setPassword} value={password} />
          </Form>

          <Footer>
            <Button title="Login" onPress={handleSignIn} />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleSignUp}
            />
          </Footer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
