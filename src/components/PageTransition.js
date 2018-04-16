// @flow

import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import Fade from './transitions/Fade';

export type AnimationType = 'fade';

type OwnProps = {
    children: React.Node,
};

type RestProps = {
    animation?: AnimationType
};

type Props = OwnProps & RestProps;

const setAnimation = (animation: AnimationType) => {
    switch (animation) {
        case 'fade':
        default:
            return Fade;
    }
};

const PageTransition = ({ children, animation, ...rest }: Props) => {
    const Component = setAnimation(animation);
    const key = window && window.location ? window.location.pathname.split('/').join('-') || '/' : '/';

    return (
        <TransitionGroup>
            <Component {...rest} key={key}>
                {children}
            </Component>
        </TransitionGroup>
    );
};

export default PageTransition;