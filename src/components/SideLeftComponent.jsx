import React from "react";
import styled from "styled-components";

const SideLeftComponent = ({ logo, text }) => {
  return (
    <SLCWrapper>
      {logo}
      <h4>{text}</h4>
    </SLCWrapper>
  );
};

const SLCWrapper = styled.section`
  display: flex;
  align-items: center;
  margin: 10px 0 0 15px;
  padding: 5px;
  border-radius: 9px;
  max-width: 270px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  .MuiSvgIcon-root {
    font-size: 2.1875rem;
    color: ${({ theme }) => theme.colors.blue};
  }
  h4 {
    margin-left: 8px;
    font-weight: 600;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.base};
  }
`;

export default SideLeftComponent;
