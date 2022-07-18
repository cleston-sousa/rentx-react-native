import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Footer, Message, Title } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackRoutesParamList } from '../../routes/stack.routes';

export type ScreenProps = NativeStackScreenProps<StackRoutesParamList, 'Confirmation'>;

export function Confirmation({ route }: ScreenProps) {
  const { width } = useWindowDimensions();
  const { title, message, nextScreenRoute } = route.params.data;

  const { navigate } = useNavigation();

  function handleOk() {
    navigate(nextScreenRoute);
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
