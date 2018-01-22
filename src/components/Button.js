// @flow

import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
    position: relative;
    cursor: pointer;

    padding: 1rem 2rem;
    border: 0;
    border-radius: 3px;
    color: #fff;
    background-color: #222;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);

    transition: color 0.3s ease-in-out, transform 0.1s ease-in-out;

    outline: none;

    > span {
        position: relative;
        z-index: 1;
    }
    
    &:before {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: left;
        transform: scaleX(0);
        background-color: #fff;
        transition: transform 0.3s ease-in-out;
        content: '';
    }

    &:hover {
        color: #222;
        &:before {
            transform: scaleX(1);
        }
    }

    &:active {
        transform: scale(0.95);
    }
`;

const Button = ({ children }) => (
    <ButtonContainer>
        <span>{children}</span>
    </ButtonContainer>
);

export default Button;