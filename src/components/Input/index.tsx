import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { TextInputProps } from 'react-native';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: IInputProps) {
  const theme = useTheme();
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    setFocused(false);
    setFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={RFValue(24)}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText isFocused={isFocused} onFocus={handleFocus} onBlur={handleBlur} {...rest} />
    </Container>
  );
}
