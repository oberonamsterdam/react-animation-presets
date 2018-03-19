// @flow

import React from 'react';
import styled from 'styled-components';

type ButtonType = {
    children: any,
    borderSize?: string,
    color?: string,
    colorSecondary?: string
};

const Button = ({ borderSize = '1px', color = '#000', colorSecondary = '#fff', children }: ButtonType) => (
    <ButtonContainer borderSize={borderSize} color={color} colorSecondary={colorSecondary}>
        <span>{children}</span>
    </ButtonContainer>
);

const ButtonContainer = styled.button`
    position: relative;
    cursor: pointer;

    padding: 1rem 2rem;
    border: ${props => props.borderSize} solid ${props => props.color};
    color: ${props => props.color};
    background-color: transparent;

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
        transform: scaleX(0) scaleY(1);
        background-color: ${props => props.color};
        transition: transform 0.3s ease-in-out;
        content: '';
    }

    &:hover {
        color: ${props => props.colorSecondary};
        &:before {
            transform: scaleX(1.2) scaleY(1.2);
        }
    }

    &:active {
        transform: scale(0.95);
    }
`;

export default Button;