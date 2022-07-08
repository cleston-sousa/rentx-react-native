import React from 'react';

import { Container, Title } from './styles';

interface IProps {
  title: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
  enabled?: boolean;
}

export function Button({ title, color, textColor, onPress, enabled = true, ...rest }: IProps) {
  return (
    <Container onPress={onPress} color={color} enabled={enabled} {...rest}>
      <Title color={textColor}>{title}</Title>
    </Container>
  );
}
