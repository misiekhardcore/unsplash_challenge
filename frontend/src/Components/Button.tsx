import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-weight: 700;
  color: white;
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  background-color: #3db46d;
  border: solid 1px #3db46d;
  border-radius: 12px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

interface ButtonProps {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <StyledButton placeholder="Search by name">{children}</StyledButton>
  );
};
