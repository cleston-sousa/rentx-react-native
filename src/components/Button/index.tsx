import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, Title } from './styles';

interface IProps {
  title: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({ title, color, textColor, onPress, enabled = true, loading = false, ...rest }: IProps) {
  const theme = useTheme();

  return (
    <Container onPress={onPress} color={color} enabled={enabled} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} size="small" />
      ) : (
        <Title color={textColor}>{title}</Title>
      )}
    </Container>
  );
}
