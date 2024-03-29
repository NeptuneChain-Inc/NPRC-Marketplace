import styled from "styled-components";
import { motion } from "framer-motion";
import { style_template } from "./style_templates";

export const WELCOME_LOGO = styled.img`
width: ${({width}) => width ? width : '200px'};
  height: auto;
  cursor: pointer;
  margin: 20px 0;
  transition: 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
  }
`;

export const WELCOME_HEADING = styled.h1`
font-size: ${({ size }) => size ? size : '1.25rem'};
  margin-bottom: 20px;
  color: #333;
`;

export const INPUT = styled.input`
padding: 12px 16px;
box-sizing: border-box;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 4px;
outline: none;
transition: border-color 0.3s ease, box-shadow 0.3s ease;
margin: 0;

&::placeholder {
  color: #999;
}

&:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
`;

export const CardContainer = styled(motion.div)`
flex: 0 0 auto;
width: ${({ width }) => width ? width : '10%'};
width: 80%;
height: 400px;
margin: auto;
display: flex;
padding: 0.5rem;
min-width: 300px;
position: relative;
box-shadow: 0px 0px 10px 0px #d4d4d4;
box-sizing: border-box;
align-items: flex-start;
border-radius: 4px;
flex-direction: column;
background-color: #ffffff;
overflow-y: auto;
overflow-x: hidden;

&:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px 0px #0077b6;
}

@media (max-width: 768px) {
  width: 100%;
  min-width: 200px;
}
`;

export const LOADING_ANIMATION = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 10;
  transition: 0.5s ease-in-out;
`;

export const PROMPT_CARD = styled(motion.div)`
width: 80%;
 max-width: 1080px;
height: 70vh;
${style_template.flex_display.column_custom('center','center')}
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.5);
  overflow: auto;

  backface-visibility: hidden;
  transform-style: preserve-3d;

  @media (max-width: 980px) {
    width: 100%;
    padding: 1rem;
  }

  }
`;

export const PROMPT_FORM = styled(motion.form)`
width: 100%;
height: 100%;
  ${style_template.flex_display.column_custom('center')}
  background: rgba(255, 255, 255, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  backface-visibility: hidden;
  transform-style: preserve-3d;

  @media (max-width: 767px) {
    padding: 1rem;
  }

  }
`;

export const BUTTON = styled(motion.button)`
color: #FFF;
background-color: #0077b699;
padding: 15px 30px;
display: flex;
justify-content: center;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
cursor: pointer;

&:hover {
  background-color: #0077b6;
  color: white;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

border: none;
border-radius: 4px;
margin-bottom: 1rem;
`;

export const TEXT_LINK = styled.span`
color: #0077b6a1;
font-size: 0.8rem;
transition: 0.3s ease-in-out;
cursor: pointer;


&:hover {
  color: #005f8a;
  transform: translateY(-2px);
}
`;