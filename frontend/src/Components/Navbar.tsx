import React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";

const StyledNav = styled.nav`
  padding: 2rem 5.5rem;
  display: flex;
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FColumn = styled(Flex)`
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

export const Navbar: React.FC = () => {
  return (
    <StyledNav>
      <Flex>
        <Flex>
          <FColumn>
            <h3>My Unsplash</h3>
            <p>devchallenges.io</p>
          </FColumn>
        </Flex>
        <SearchInput placeholder="&#61442; Search by name" />
      </Flex>
      <Button>Add photo</Button>
    </StyledNav>
  );
};
