import React from "react";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import { useAppSelector } from "../hooks/hooks";
import { selectPhotos } from "../redux/photosSlice";
import { PhotoCard } from "./PhotoCard";

const Container = styled.div`
  padding: 2rem 5.5rem;
  
  @media (max-width: 800px){
    padding: 2rem;
  }
  
    @media (max-width: 414px){
    padding: 2rem 1rem;
  }
`;

interface photosProps {}

export const Photos: React.FC<photosProps> = () => {
  const { photos } = useAppSelector(selectPhotos);

  return (
    <Container>
      <Masonry
        breakpointCols={{
          default: 4,
          1200: 3,
          800: 2,
          414: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo) => (
          <PhotoCard photo={photo} key={photo.id} />
        ))}
      </Masonry>
    </Container>
  );
};
