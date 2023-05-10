import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import UserComponent from "./UserComponent";

const FacebookSideRight = () => {
  return (
    <FBSRWrapper>
      <div className="allusers">
        <div className="top">
          <h4>Contacts</h4>
          <input placeholder="Search user" />
        </div>
        <hr />
        {/* All users list */}
        <UserComponent />
      </div>
    </FBSRWrapper>
  );
};

const FBSRWrapper = styled.section`
  height: 100%;
  /* position: fixed;
  right: 0; */
  .allusers {
    /* TODO: */
    /* max-width: 200px;
    width: 100%; */
    .top {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      h4 {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 5px;
      }
      input {
        border-top-left-radius: 9px;
        border-bottom-left-radius: 9px;
        border: none;
        outline: none;
        padding: 10px;
        /* margin-left: 5px; */
        background-color: ${({ theme }) => theme.colors.darkgray};
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.responsive.mobile}) {
    display: none;
  }
`;

export default FacebookSideRight;
