import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

import {
  BUTTON,
  INPUT,
  LOADING_ANIMATION,
  PROMPT_CARD,
  PROMPT_FORM,
  TEXT_LINK,
} from "../../../components/lib/styled";
import Notification from "../../../components/popups/NotificationPopup";

import { formVariant, loadingVariant } from "./motion_variants";
import { CardLogo, logoImage, logoVariants } from "../../Welcome";

import { environmentalRotation, successAnimation } from "../../../assets/animations";

/** #BACKEND */
import { createUserWithEmailAndPassword } from "firebase/auth";

/** FIREBASE AUTH */
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { UserAPI, firebaseAPI } from "../../../scripts/back_door";

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  height: 50px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  padding-left: 10px;
  box-sizing: border-box;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #0077b6;
  margin-right: 10px;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;
const RegisterForm = ({ onSuccess, onSwitchToLogin, updateUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("farmer");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const auth = await firebaseAPI.get.auth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = userCredential?.user;

      if(userData) {
        const newUser = {
          uid: userData.uid,
          username: username.toLowerCase(),
          email: userData.email.toLowerCase(),
          type: accountType,
        };

        const { result, error } = await UserAPI.create.dbUser(newUser);

        if(error){
          setError("Failed to register user in our database");
        }

        if (result) {
          setIsSuccess(Boolean(await updateUser?.(newUser.uid)));
          return true;
        }
      }

      return null;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <Notification type="error" message={error} />

      <PROMPT_CARD>
        {isLoading ? (
          <LOADING_ANIMATION
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loadingVariant}
          >
            <Player
              autoplay
              loop
              src={environmentalRotation}
              style={{ height: 100, width: 100 }}
            />
          </LOADING_ANIMATION>
        ) : !isSuccess ? (
          <PROMPT_FORM
            variants={formVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
          >
            <CardLogo
              src={logoImage}
              alt="NeptuneChain Logo"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            />
            <InputGroup>
              <Icon icon={faUser} />
              <INPUT
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Icon icon={faEnvelope} />
              <INPUT
                type="email"
                placeholder="Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Icon icon={faLock} />
              <INPUT
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Icon icon={faPeopleGroup} />
              <Dropdown
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="farmer">Farmer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
              </Dropdown>
            </InputGroup>

            <BUTTON type="submit">Register</BUTTON>
            <TEXT_LINK type="button" onClick={onSwitchToLogin}>
              Already have an account? Log in
            </TEXT_LINK>
          </PROMPT_FORM>
        ) : (
          <LOADING_ANIMATION
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loadingVariant}
          >
            <Player
              autoplay
              loop
              src={successAnimation}
              style={{ height: 100, width: 100 }}
            />
          </LOADING_ANIMATION>
        )}
      </PROMPT_CARD>
    </AnimatePresence>
  );
};

export default RegisterForm;
