import React from "react";
import { Photo } from "../types";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 1rem;
  width: 100;

  img {
    border-radius: 1rem;
    display: block;
    max-width: 100%;
  }
`;

interface PhotoProps {
  photo: Photo;
}

export const PhotoCard: React.FC<PhotoProps> = ({ photo }) => {
  const { label, url } = photo;
  return (
    <Card>
      <img src={url} alt={label} />
    </Card>
  );
};
