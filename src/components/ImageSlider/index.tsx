import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles';

interface IProps {
  imageUrl: {
    id: string;
    car_id: string;
    photo: string;
  }[];
}

interface IChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imageUrl }: IProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: IChangeImageProps) => {
    setImageIndex(info.viewableItems[0].index!);
  });

  return (
    <Container>
      <ImageIndexes>
        {imageUrl.map((_, index) => (
          <Bullet key={String(index)} active={index == imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imageUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
