import React from 'react';

import { Container, Title } from './styles';

interface IProps {
  title: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
}

export function Button({ title, color, textColor, onPress, ...rest }: IProps) {
  return (
    <Container onPress={onPress} color={color} {...rest}>
      <Title color={textColor}>{title}</Title>
    </Container>
  );
}
