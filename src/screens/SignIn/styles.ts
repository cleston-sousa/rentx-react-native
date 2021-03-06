import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  padding: 0 ${RFValue(24)}px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${RFValue(116)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
  margin-top: ${RFValue(16)}px;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const Form = styled.View`
  width: 100%;
  margin: ${RFValue(64)}px 0;
`;

export const Footer = styled.View`
  width: 100%;
`;
