import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { ReactNode } from 'react';

export interface IButtonProps extends RectButtonProps {
  color?: string;
  children: ReactNode;
}

export interface IButtonText {
  color?: string;
}

export const Container = styled(RectButton)<IButtonProps>`
  width: 100%;
  padding: ${RFValue(19)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, color }) => (color ? color : theme.colors.main)};
  opacity: ${({ enabled }) => (enabled ? 1 : 0.5)};
`;

export const Title = styled.Text<IButtonText>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, color }) => (color ? color : theme.colors.shape)};
`;
