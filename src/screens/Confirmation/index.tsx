import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Footer, Message, Title } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackRoutesParamList } from '../../routes/app.stack.routes';
import { AuthRoutesParamList } from '../../routes/auth.routes';

export interface IConfirmation {
  title: string;
  message: string;
  nextScreenRoute: keyof AppStackRoutesParamList | keyof AuthRoutesParamList;
}

export type ScreenProps = NativeStackScreenProps<AppStackRoutesParamList, 'Confirmation'>;

export function Confirmation({ route }: ScreenProps) {
  const { width } = useWindowDimensions();
  const { title, message, nextScreenRoute } = route.params.data;

  const { reset } = useNavigation();

  function handleOk() {
    reset({
      index: 0,
      routes: [{ name: nextScreenRoute }]
    });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={RFValue(80)} height={RFValue(80)} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleOk} />
      </Footer>
    </Container>
  );
}
