import axios from "axios";
import React, { useEffect, useState } from "react";
import { Photo } from "../types";
import { PhotoCard } from "./PhotoCard";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 5.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<Photo[]>(
        "http://172.28.78.123:5000/api/photos",
        {}
      );
      if (result) setPhotos(result.data);
    };
    fetchData();
  }, []);
  return (
    <Container>
      {photos.map((photo) => (
        <PhotoCard photo={photo} key={photo.id} />
      ))}
    </Container>
  );
};
