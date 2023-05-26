import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserComponent from "./UserComponent";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";
import ChatGlobal from "./ChatGlobal";
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

  return (
    <FBSRWrapper>
      <ChatGlobal />
    </FBSRWrapper>
  );
};

const FBSRWrapper = styled.section`
  display: none;
  height: calc(100vh - 77px);
  align-self: top;
  position: sticky;
  flex: 30%;
  top: 77px;
  .guest-info {
    font-size: 1.2rem;
    margin-top: 5px;
  }
  @media (min-width: ${({ theme }) => theme.responsive.tablet}) {
    display: block;
  }
`;

export default FacebookSideRight;
