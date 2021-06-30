import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/hooks";
import { deletePhoto } from "../redux/photosSlice";
import { Photo } from "../types";

const Card = styled.div`
  border-radius: 1rem;
  width: 100;
  position: relative;

  &:hover div {
    visibility: visible;
    opacity: 1;
  }

  img {
    border-radius: 1rem;
    display: block;
    max-width: 100%;
    width: 100%;
  }

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    visibility: hidden;
    opacity: 0;
    border-radius: 1rem;

    button {
      padding: 0.375rem 1rem;
      margin-left: auto;
      color: #eb5757;
      border: solid 1px #eb5757;
      border-radius: 2rem;
      font-size: 0.625rem;
      background-color: rgba(0, 0, 0, 0);
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
    }

    p {
      color: white;
      font-weight: 700;
      font-size: 1.125rem;
      font-family: "Montserrat", sans-serif;
    }
  }
`;

interface PhotoProps {
  photo: Photo;
}

export const PhotoCard: React.FC<PhotoProps> = ({ photo }) => {
  const dispatch = useAppDispatch();
  const { label, url } = photo;
  return (
    <Card>
      <img src={url} alt={label} />
      <div>
        <button
          onClick={() => {
            dispatch(deletePhoto({ id: photo.id }));
          }}
        >
          delete
        </button>
        <p>{label}</p>
      </div>
    </Card>
  );
};
