import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import themes from "Provider/themes";
import { rem, transparentize } from "polished";

export const Container = styled(motion.div)`
  transition: all 0.3s;
  display: flex;
  flex-direction: row;
  padding: 20px;

  border-radius: 12px;
  cursor: pointer;

  background-color: ${({ active }) =>
    active ? themes.colors.success : transparentize(0.6, themes.colors.gray)};

  p {
    transition: all 0.5s;
    line-height: 22px;
    font-size: ${rem(14)};
    font-family: ${themes.fonts.medium};

    color: ${themes.colors.white};
  }

  ${({ active }) =>
    active &&
    css`
      padding: 15px 20px;

      p {
        font-size: ${rem(15)};
        font-family: ${themes.fonts.bold};
      }

      :before {
        transition: all 0.5s;
        content: "";
        width: 5px;
        margin-left: -10px;
        background-color: ${themes.colors.white};
        border-radius: 12px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
      }
    `}

  :hover {
    background-color: ${({ active }) =>
      active
        ? themes.colors.success
        : transparentize(0.2, themes.colors.success)};

    p {
      font-size: ${rem(15)};
      font-family: ${themes.fonts.bold};
    }
  }
`;
