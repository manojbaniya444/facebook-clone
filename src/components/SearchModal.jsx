import { IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppContext } from "../context/context";

const SearchModal = () => {
  const { showModal, setShowModal } = useAppContext();
  return (
    <SMWrapper>
      {showModal && (
        <>
          <div className="search-modal">
            <div className="search-box">
              {/* <div className="icon" onClick={() => setSearchModal(false)}>
                  </div> */}
              <IconButton onClick={() => setShowModal(false)}>
                <ArrowBackIcon />
              </IconButton>

              <input className="input" placeholder="Search Facebook" />
            </div>
          </div>
        </>
      )}
    </SMWrapper>
  );
};

const SMWrapper = styled.section`
  .search-modal {
    position: absolute;
    z-index: 99;
    top: 0px;
    left: 0px;
    background-color: white;
    /* height: 400px; */
    padding: 5px 20px;
    border-radius: 9px;
    box-shadow: 1px 1px 21px -9px rgba(0, 0, 0, 0.5);
    .search-box {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        &:hover {
          background-color: #e4e6eb;
        }
        .MuiSvgIcon-root {
          color: gray;
          font-size: 30px;
        }
      }
      .input {
        display: block;
        outline-width: none;
        border: none;
        background-color: ${({ theme }) => theme.colors.gray};
        font-size: 1.3rem;
        padding: 0.9rem 1rem;
        /* height: 30px; */
        border-radius: 999px;
        margin: 5px;
      }
      .input:focus {
        outline: none;
      }
    }
    @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
      display: none;
    }
  }
`;

export default SearchModal;
