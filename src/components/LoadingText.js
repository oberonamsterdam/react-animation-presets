// @flow

import React, { SFC } from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
    label: string
};

const LabelLoop = keyframes`
    25% {
        transform: translateY(0%);
    }
    
    50% {
        transform: translateY(100%);
    }
    
    50.01% {
        transform: translateY(-100%);
    }
    
    75% {
        transform: translateY(0%);
    }
`;

const LoadingMask = styled.div`
    position: absolute;
    display: block;
    overflow: hidden;
    top: 50%;
    left: 50%;
    width: auto;

    border-radius: 3px;

    background: #222;

    transform: translate(-50%, -50%);
`;

const Label = styled.span`
    position: relative;
    display: block;
    padding: 1rem;
    color: #fff;
    text-align: center;
    animation: ${LabelLoop} 2s ease-in-out infinite;
`;

const LoadingText: SFC = ({children}: Props) => (
    <LoadingMask>
        <Label>
            {children}
        </Label>
    </LoadingMask>
);

export default LoadingText;