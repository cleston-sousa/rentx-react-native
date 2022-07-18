import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

interface IInputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(8)}px;
`;

export const IconContainer = styled.View<IInputProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${RFValue(55)}px;
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: ${RFValue(2)}px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<IInputProps>`
  flex: 1;
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 0 ${RFValue(23)}px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
