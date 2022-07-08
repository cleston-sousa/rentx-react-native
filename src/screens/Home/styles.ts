import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';
import { ICar } from '../../dtos/ICar';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(105)}px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: ${RFValue(32)}px ${RFValue(24)}px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new (props: FlatListProps<ICar>) => FlatList<ICar>).attrs({
  contentContainerStyle: {
    padding: RFValue(24)
  },
  showsVerticalScrollIndicator: false
})``;

export const MyCarsButton = styled(RectButton)<{ children: ReactNode }>`
  height: ${RFValue(60)}px;
  width: ${RFValue(60)}px;

  border-radius: ${RFValue(30)}px;

  background-color: ${({ theme }) => theme.colors.main};

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: ${RFValue(22)}px;
  right: ${RFValue(22)}px;
`;
