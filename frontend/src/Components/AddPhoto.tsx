import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/hooks";
import { createPhoto } from "../redux/photosSlice";
import { Button } from "./Button";
import { Input } from "./Input";

const ContainerAddPhoto = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const FormAddPhoto = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem 5.5rem;
  border-radius: 12px;
  width: 50%;

  @media (max-width: 800px) {
    width: 100%;
    padding: 2rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;

    label,
    input {
      display: block;
      width: 100%;
      min-width: 0;
      margin: 0;
    }

    label {
      font-size: 0.9rem;
      margin-bottom: 0.625rem;
    }

    input {
      margin-bottom: 1.2rem;
    }
  }

  div {
    margin-left: auto;
    display: flex;
    gap: 1rem;
  }
`;

const Error = styled.p`
  color: red;
`;

interface AddPhotoProps {
  setToggle: (a: any) => any;
}

export const AddPhoto: React.FC<AddPhotoProps> = ({ setToggle }) => {
  const [state, setState] = useState({ label: "", url: "", user: 1 });
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  return (
    <ContainerAddPhoto>
      <FormAddPhoto>
        <h1>Add a new photo</h1>
        {error && <Error>{error}</Error>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!(state.url.trim() && state.label.trim())) {
              setError("URL and/or label cannot be empty");
              return;
            }
            setError("");
            dispatch(createPhoto({ ...state }));
          }}
        >
          <label>Label</label>
          <Input
            placeholder="Suspendisse elit massa"
            value={state.label}
            onChange={(e) =>
              setState({ ...state, label: e.target.value })
            }
          />
          <label>Photo URL</label>
          <Input
            placeholder="https://images.unsplash.com/photo-1584395630"
            value={state.url}
            onChange={(e) =>
              setState({ ...state, url: e.target.value })
            }
          />
          <div>
            <Button blank onClick={() => setToggle(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormAddPhoto>
    </ContainerAddPhoto>
  );
};
