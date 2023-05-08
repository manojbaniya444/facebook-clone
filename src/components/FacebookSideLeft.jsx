import React from "react";
import styled from "styled-components";
import SideLeftComponent from "./SideLeftComponent";
import { Avatar } from "@mui/material";

const FacebookSideLeft = () => {
  return (
    <FBSLWrapper>
        
      {/* avatar and profile link */}
      <Profile className="profile-link">
        <Avatar src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273"/>
        <h4>Manoj Baniya</h4>
      </Profile>
      <Profile className="profile-link">
        <Avatar src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273"/>
        <h4>Manoj Baniya</h4>
      </Profile>
      <Profile className="profile-link">
        <Avatar src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273"/>
        <h4>Manoj Baniya</h4>
      </Profile>
      <Profile className="profile-link">
        <Avatar src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273"/>
        <h4>Manoj Baniya</h4>
      </Profile>

      {/* icons and title *10 */}
      <SideLeftComponent />

      {/* More icons and title if showMore-> true */}

      {/* showmore button */}

      {/* showless button */}

      {/* page button -> privacy terms cookies ...more */}
    </FBSLWrapper>
  );
};
const Profile = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 20px 0 0 10px;
    padding: 5px;
    border-radius: 9px;
    max-width: 300px;
    width: 100%;
    &:hover{
        background-color: ${({theme})=> theme.colors.darkgray};
    }
    h4{
        margin-left: 8px;
        font-weight: 600;
    }
`

const FBSLWrapper = styled.aside`
`;

export default FacebookSideLeft;
