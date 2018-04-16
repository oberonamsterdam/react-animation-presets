// @flow

import TimelineLite from 'gsap/TimelineLite';
import * as React from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

type DurationProp = {
    in: number,
    out: number
};

type TransitionProps = {
    in: boolean,
    out: boolean
};

type OwnProps = {
    children: React.Node,
    duration?: DurationProp,
    backgroundColor?: string,
    initialAnimation?: boolean

};

type Props = TransitionProps & OwnProps;

class Fade extends React.Component<Props> {
    page: HTMLElement;

    static defaultProps = {
        backgroundColor: 'transparent',
        duration: {
            in: 0.6,
            out: 0.3,
        },
        initialAnimation: true,
    };

    componentDidMount () {
        if (this.props.initialAnimation) {
            this.animateIn();
        }
    }

    animateIn = (): void => {
        const enterTimeline = new TimelineLite({ paused: true });
        const { Quad, TweenLite } = window;

        TweenLite.killTweensOf(this.page);

        /* Fade in */
        enterTimeline.add(TweenLite.fromTo(
            this.page, this.props.duration.in, { alpha: 0 }, { alpha: 1, ease: Quad.easeIn }), 0,
        );
        enterTimeline.play();
    };

    animateOut = (): void => {
        const leaveTimeline = new TimelineLite({ paused: true });
        const { TweenLite, Power4 } = window;
        TweenLite.killTweensOf(this.page);

        /* Fade out */
        leaveTimeline.add(TweenLite.to(
            this.page, this.props.duration.out, { alpha: 0, ease: Power4.easeIn }), 0,
        );
        leaveTimeline.play();
    };

    render () {
        return (
            <Transition
                {...this.props}
                in={this.props.in}
                onEnter={this.animateIn}
                onExit={this.animateOut}
                timeout={{ enter: this.props.duration.in * 1000, exit: this.props.duration.out * 1000 }}
                mountOnEnter
                unmountOnExit >
                <PageContainer backroundColor={this.props.backgroundColor} innerRef={page => { this.page = page; }}>
                    {this.props.children}
                </PageContainer>
            </Transition>
        );
    }
}

const PageContainer = styled.section`
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    min-height: 100vh;
    z-index: 0;
    overflow: hidden;
    width: 100%;
    background: ${p => p.backgroundColor};
    transform-origin: 50vw 50vw;

    backface-visibility: hidden;
`;

export default Fade;