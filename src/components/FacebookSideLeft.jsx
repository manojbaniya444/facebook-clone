import React from "react";
import styled from "styled-components";
import SideLeftComponent from "./SideLeftComponent";
import { Avatar } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FlagIcon from "@mui/icons-material/Flag";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Groups2Icon from "@mui/icons-material/Groups2";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuthContext } from "../context/AuthContext";

const FacebookSideLeft = () => {
  const { user, guestUser } = useAuthContext();
  return (
    <FBSLWrapper>
      {/* avatar and profile link */}
      {!guestUser && (
        <Profile className="profile-link">
          <Avatar
            // src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273"
            src={user?.photoURL}
          />
          <h4>{user?.displayName}</h4>
        </Profile>
      )}

      {/* icons and title *10 */}
      <SideLeftComponent logo={<PeopleAltIcon />} text={"Friends"} />
      <SideLeftComponent logo={<StorefrontIcon />} text={"Marketplace"} />
      <SideLeftComponent logo={<BookmarkIcon />} text={"Saved"} />
      <SideLeftComponent logo={<FlagIcon />} text={"Pages"} />
      <SideLeftComponent logo={<WorkHistoryIcon />} text={"Most Recent"} />
      <SideLeftComponent logo={<Groups2Icon />} text={"Groups"} />
      <SideLeftComponent logo={<OndemandVideoIcon />} text={"Watch"} />
      <SideLeftComponent logo={<HistoryIcon />} text={"Memories"} />
      <SideLeftComponent logo={<CalendarMonthIcon />} text={"Events"} />
      <SideLeftComponent logo={<StarIcon />} text={"Favourites"} />
      <div className="showmore">
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
        <h4>See more</h4>
      </div>
    </FBSLWrapper>
  );
};

const Profile = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 20px 0 0 15px;
  padding: 5px;
  border-radius: 9px;
  max-width: 270px;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkgray};
  }
  h4 {
    margin-left: 8px;
    font-weight: 600;
  }
`;

const FBSLWrapper = styled.aside`
  width: 100%;
  height: calc(100vh - 77px);
  flex-basis: 22%;
  max-width: 500px;
  /* TODO: */
  // New Style end
  position: sticky;
  flex: 25%;
  top: 77px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  .showmore {
    margin: 10px 0 0 15px;
    display: flex;
    align-items: center;
    max-width: 270px;
    width: 100%;
    border-radius: 9px;
    cursor: pointer;
    h4 {
      margin-left: 8px;
      font-weight: 600;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.darkgray};
    }
  }
  @media (max-width: ${({ theme }) => theme.responsive.tablet}) {
    display: none;
  }
`;

export default FacebookSideLeft;
