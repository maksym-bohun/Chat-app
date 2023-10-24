import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const contacts = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));

      setIsLoaded(true);
    }
  }, []);
  console.log(currentUser);

  useEffect(() => {
    if (currentUser && !currentUser.isAvatarImageSet) {
      navigate("/setAvatar");
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded &&
          (currentChat === undefined ? (
            <Welcome user={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} />
          ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 1fr 3fr;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-column: 35% 65%;
    }
  }
`;

export const contactsLoader = async ({ params }) => {
  if (localStorage.getItem("chat-app-user")) {
    const { data } = await axios.get(
      `${allUsersRoute}/${
        JSON.parse(localStorage.getItem("chat-app-user"))._id
      }`
    );
    return data.users;
  } else return null;
};

export default Chat;
