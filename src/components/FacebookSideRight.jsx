import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserComponent from "./UserComponent";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";
const FacebookSideRight = () => {
  const [loggedUsers, setLoggedUsers] = useState();

  const { guestUser } = useAuthContext();

  useEffect(() => {
    const unsubscribe = async () => {
      const ref = collection(database, "users");
      onSnapshot(ref, (snap) => {
        setLoggedUsers(
          snap.docs.map((item) => ({ ...item.data(), id: item.id }))
        );
      });
    };
    return unsubscribe;
  }, []);

  const uniqueArray = loggedUsers?.filter((item, index, self) => {
    return index === self.findIndex((obj) => obj.userid === item.userid);
  });

  // console.log(uniqueArray);

  return (
    <FBSRWrapper>
      <div className="allusers">
        <div className="top">
          <h4>All logged in users</h4>
        </div>
        <hr />
        {guestUser ? (
          <p className="guest">Login to see</p>
        ) : (
          <div>
            {uniqueArray?.map((item, index) => {
              return (
                <UserComponent
                  profile={item.profileURL}
                  username={item.username}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </FBSRWrapper>
  );
};

const FBSRWrapper = styled.section`
  display: none;
  height: calc(100vh - 77px);
  align-self: top;
  flex-basis: 230px;

  //new

  position: sticky;
  flex: 25%;
  top: 77px;

  //new
  .allusers {
    /* TODO: */
    /* max-width: 200px;
    width: 100%; */
    .guest {
      margin-top: 20px;
    }
    .top {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      h4 {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 10px;
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
  @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
    display: block;
  }
`;

export default FacebookSideRight;
