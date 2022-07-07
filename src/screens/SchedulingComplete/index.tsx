import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Footer, Message, Title } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { IProps } from '../../../App';
import { ConfirmButton } from '../../components/ConfirmButton';
import { RFValue } from 'react-native-responsive-fontsize';

export function SchedulingComplete({ onReady }: IProps) {
  const { width } = useWindowDimensions();

  const { navigate } = useNavigation();

  function handleGoToHome() {
    navigate('Home');
  }
  return (
    <Container onLayout={onReady}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={RFValue(80)} height={RFValue(80)} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleGoToHome} />
      </Footer>
    </Container>
  );
}
