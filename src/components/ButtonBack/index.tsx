import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Container } from "./styles";
import { useTheme } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

export function ButtonBack({ ...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name="chevron-left" size={18} color={COLORS.TITLE} />
    </Container>
  )
}