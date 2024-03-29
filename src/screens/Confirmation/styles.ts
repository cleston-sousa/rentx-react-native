import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: ${RFValue(96)}px;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  margin-top: ${RFValue(10)}px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  line-height: ${RFValue(25)}px;
  text-align: center;
  margin-top: ${RFValue(10)}px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin: ${RFValue(20)}px 0 ${RFValue(80)}px;
`;
