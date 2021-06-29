import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/hooks";
import { clearPhotos } from "../redux/photosSlice";
import { Button } from "./Button";
import { Input } from "./Input";

const StyledNav = styled.nav`
  padding: 2rem 5.5rem;
  display: flex;
  justify-content: space-between;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FColumn = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;

  h3 {
    color: #333;
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;
  }

  p {
    color: #333;
    font-weight: 500;
    font-size: 9px;
    line-height: 12px;
  }
`;

const Form = styled.form`
  display: flex;
`;

interface navbarProps {
  setToggle: (a: any) => any;
  setSearch: (a: any) => any;
  setPage: (a: any) => any;
}

export const Navbar: React.FC<navbarProps> = ({
  setToggle,
  setSearch,
  setPage,
}) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  return (
    <StyledNav>
      <Flex>
        <Flex>
          <img
            style={{ marginRight: "0.7rem" }}
            src="https://picsum.photos/20/20"
            alt="Logo"
          />
          <FColumn>
            <h3>My Unsplash</h3>
            <p>devchallenges.io</p>
          </FColumn>
        </Flex>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(0);
            dispatch(clearPhotos());
            setSearch(value);
          }}
        >
          <Input
            placeholder="Search by name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Flex>
      <Button onClick={() => setToggle(true)}>Add photo</Button>
    </StyledNav>
  );
};
