import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import { ReactNode } from 'react';

export interface IButtonProps {
  color?: string;
  loading?: boolean;
  children: ReactNode;
}

export interface IButtonText {
  color?: string;
  light?: boolean;
}

export const Container = styled(RectButton)<IButtonProps>`
  width: 100%;
  padding: ${RFValue(19)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, color }) => (color ? color : theme.colors.main)};
  opacity: ${({ enabled, loading }) => (!enabled || loading ? 0.5 : 1)};
  margin-bottom: ${RFValue(8)}px;
`;

export const Title = styled.Text<IButtonText>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, color, light }) => (color ? color : light ? theme.colors.header : theme.colors.shape)};
`;
