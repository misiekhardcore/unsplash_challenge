import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddPhoto } from "./Components/AddPhoto";
import { Button } from "./Components/Button";
import { Navbar } from "./Components/Navbar";
import { Photos } from "./Components/Photos";
import { useAppDispatch } from "./hooks/hooks";
import { getAllPhotos } from "./redux/photosSlice";

const Container = styled.div`
  position: relative;
`;

export const App: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPhotos({ page, search }));
  }, [page, search, dispatch]);

  return (
    <Container>
      {toggle && <AddPhoto setToggle={setToggle} />}
      <Navbar
        setPage={setPage}
        setToggle={setToggle}
        setSearch={setSearch}
      />
      <Photos />
      <div
        style={{
          marginBottom: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => setPage((prev) => prev + 1)}>
          Load more...
        </Button>
      </div>
    </Container>
  );
};
