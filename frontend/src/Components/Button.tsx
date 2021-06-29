import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ blank?: boolean }>`
  font-weight: 700;
  color: ${(props) => (props.blank ? "#BDBDBD" : "white")};
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  background-color: ${(props) =>
    props.blank ? "rgba(0,0,0,0)" : "#3db46d"};
  border: ${(props) => (props.blank ? "none" : "solid 1px #3db46d")};
  border-radius: 12px;
  ${(props) =>
    !props.blank && "box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);"}
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover,
  &focus {
    cursor: pointer;
    ${(props) => !props.blank && "background-color: #1a7940;"}
    ${(props) => props.blank && "color: #999;"}
  }
`;

interface ButtonProps {
  blank?: boolean;
  onClick?: () => any;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  blank = false,
  children,
  onClick,
  type = "button",
}) => {
  return (
    <StyledButton type={type} blank={blank} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
