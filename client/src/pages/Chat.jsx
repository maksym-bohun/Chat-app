import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const contacts = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);

  useEffect(() => {
    if (currentUser && !currentUser.isAvatarImageSet) {
      navigate("/setAvatar");
    }
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
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
  const { data } = await axios.get(
    `${allUsersRoute}/${JSON.parse(localStorage.getItem("chat-app-user"))._id}`
  );
  return data.users;
};

export default Chat;
