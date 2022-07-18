import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Bullet } from '../../components/Bullet';

import { BreadCrumb, Container, Form, FormTitle, Header, SubTitle, Title } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const schema = Yup.object().shape({
  driverLicense: Yup.string().required('Documento CNH é obrigatório'),
  email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
  name: Yup.string().required('Nome é obrigatório')
});

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const { goBack, navigate } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  async function handleNextStep() {
    try {
      const data = { name, email, driverLicense };
      await schema.validate(data);
      navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
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
            <FormTitle>1. Dados</FormTitle>
            <Input iconName="user" placeholder="Nome" onChangeText={setName} value={name} />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
