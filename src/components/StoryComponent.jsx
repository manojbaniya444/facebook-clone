import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StoryComponent = () => {
  return (
    <SCWrapper>
      <div
        className="wrapper"
        style={{
          backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRReEqvjp5JfFwBoI4VxLjzvJ3XnpVZAkx6tw&usqp=CAU")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Avatar
          className="avatar"
          src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-1/285655908_3373164079578086_2980410443097564711_n.jpg?stp=dst-jpg_s480x480&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=CsjaHNzkrfcAX9MO7w5&_nc_ht=scontent.fbir1-1.fna&oh=00_AfBJS6qJ7hYvGhQ3yOFz6t5Qej20EWXzDKu-GMuY5IFhRQ&oe=645E5273
"
        />
        <h4>Manoj Baniya</h4>
      </div>
    </SCWrapper>
  );
};




const SCWrapper = styled.article`
  padding: 15px 9px;
  .wrapper {
    width: 120px;
    height: 200px;
    background-color: red;
    position: relative;
    border-radius: 13px;
    .avatar {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 3;
      border: 3px solid ${({ theme }) => theme.colors.blue};
    }
    h4 {
      /* position: absolute;
        bottom: 20px;
        left: 25px; */
      position: relative;
      top: 160px;
      text-align: center;
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }
  }
`;

export default StoryComponent;
