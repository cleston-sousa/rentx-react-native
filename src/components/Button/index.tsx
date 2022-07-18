import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface IProps extends RectButtonProps {
  title: string;
  color?: string;
  textColor?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  textColor,
  onPress,
  light = false,
  enabled = true,
  loading = false,
  ...rest
}: IProps) {
  const theme = useTheme();

  return (
    <Container onPress={onPress} color={color} enabled={enabled} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} size="small" />
      ) : (
        <Title color={textColor} light={light}>
          {title}
        </Title>
      )}
    </Container>
  );
}
