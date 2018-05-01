// @flow

import { TimelineLite, TweenLite, linear, Quad } from 'gsap';
import React, { PureComponent } from 'react';
import styled, {css} from 'styled-components';

type Props = {
    children: any,
    borderSize?: string,
    color?: string,
    colorSecondary?: string,
    type: string,
    totalDuration: number,
    width: string,
    height: string
};

type State = {
    isClicked: boolean
};

const DEFAULTS = {
    color: 'rgb(0,0,0)',
    colorSecondary: 'rgb(255,255,255)',
    borderSize: 2,
    totalDuration: 0.6,
    width: '200px',
    height: '50px'
};

class Button extends PureComponent<Props, State> {
    button: HTMLElement;
    hover: HTMLElement;
    before: HTMLElement;
    content: HTMLElement;
    after: HTMLElement;
    timeline: TimelineLite;

    /*
    * Todo:
    *
    * richting animatie
    * refactoren naar horizontalPassButton
    */

    initTimeline = () => {
        if (this.timeline) {
            this.timeline.kill();
        }
        this.timeline = new TimelineLite();
    };

    onButtonHover = () => {
        this.initTimeline();

        const { color = DEFAULTS.color, colorSecondary = DEFAULTS.colorSecondary, totalDuration = DEFAULTS.totalDuration } = this.props;
        let delay = 0;

        if (this.props.type === 'fill') {
            this.timeline.add(TweenLite.fromTo(this.hover, totalDuration * 0.45, {x: '-100%'}, {x: '-10%', ease: Quad.easeIn}), delay);
            delay += totalDuration * 0.1;
            this.timeline.add(TweenLite.fromTo(this.content, totalDuration * 0.1, {color: color}, {color: colorSecondary, ease: linear}), delay);
            delay += totalDuration * 0.25;
            this.timeline.add(TweenLite.fromTo(this.button, totalDuration * 0.2, {outline: color + ' solid 0px'}, {outline: color + ' solid 3px', ease: Quad.easeIn}), delay);
        }

        if (['disappear', 'stay'].indexOf(this.props.type) > -1) {
            this.timeline.add(TweenLite.fromTo(this.hover, totalDuration * 0.45, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: Quad.easeIn}), delay);
            delay += totalDuration * 0.1;
            this.timeline.add(TweenLite.fromTo(this.content, totalDuration * 0.1, {color: color}, {color: colorSecondary, ease: linear}), delay);
            delay += totalDuration * 0.45;
            this.timeline.add(TweenLite.to(this.hover, totalDuration * 0.45, {x: '100%', skewX: '0%', ease: Quad.easeOut}), delay);
            this.timeline.add(TweenLite.to(this.content, totalDuration * 0.1, {color: color, ease: linear}), delay);
        }

        // this.timeline.timeScale(0.2);
        return false;
    };

    onButtonClick = () => {
        this.initTimeline();
        const { totalDuration = DEFAULTS.totalDuration, color = DEFAULTS.color } = this.props;

        let delay = 0;

        if (this.props.type === 'disappear') {
            TweenLite.fromTo(this.before, totalDuration * 0.3, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: Quad.easeIn});
            delay += totalDuration * 0.3;
            this.timeline.add(TweenLite.fromTo(this.after, totalDuration * 0.4, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: Quad.easeIn}), delay);
        }
        if (this.props.type === 'stay') {
            TweenLite.fromTo(this.before, totalDuration * 0.3, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: Quad.easeIn});
            delay += totalDuration * 0.3;
            this.timeline.add(TweenLite.fromTo(this.after, totalDuration * 0.4, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: Quad.easeIn}), delay);
            delay += totalDuration * 0.4;
            this.timeline.add(TweenLite.to(this.before, totalDuration * 0.3, {x: '100%', skewX: '0%', ease: Quad.easeOut}), delay);
            this.timeline.add(TweenLite.to(this.after, totalDuration * 0.3, {x: '100%', skewX: '0%', ease: Quad.easeOut}), delay);
        }
        if (this.props.type === 'fill') {
            this.timeline = new TimelineLite();
            TweenLite.fromTo(this.button, totalDuration * 0.2, {outline: color + ' solid 3px', opacity: 1}, {outline: color + ' solid 0px', opacity: 0.8, ease: Quad.easeIn});
            delay += totalDuration * 0.2;
            this.timeline.add(TweenLite.to(this.button, totalDuration * 0.2, {outline: color + ' solid 3px', opacity: 1, ease: Quad.easeIn}), delay);
        }
        // this.timeline.timeScale(0.2);
    };

    onButtonLeave = () => {
        this.initTimeline();

        const { color = DEFAULTS.color, totalDuration = DEFAULTS.totalDuration } = this.props;
        let delay = 0;

        if (this.props.type === 'fill') {
            TweenLite.to(this.button, totalDuration * 0.2, {outline: color + ' solid 0px', ease: Quad.easeIn});
            this.timeline.add(TweenLite.to(this.hover, totalDuration * 0.45, {x: '100%', ease: Quad.easeOut}), delay);
            this.timeline.add(TweenLite.to(this.content, totalDuration * 0.1, {color: color, ease: linear}), delay);
        }
    };

    render () {
        const { borderSize = DEFAULTS.borderSize, color = DEFAULTS.color, colorSecondary = DEFAULTS.colorSecondary, children, width = DEFAULTS.width, height = DEFAULTS.height } = this.props;
        return (
            <ButtonContainer innerRef={ref => { this.button = ref; }} borderSize={borderSize} color={color} colorSecondary={colorSecondary} onClick={this.onButtonClick} onMouseEnter={this.onButtonHover} onMouseLeave={this.onButtonLeave} width={width} height={height}>
                <Border
                    color={color}
                    colorSecondary={colorSecondary}
                    borderSize={borderSize}
                />
                <Hover
                    innerRef={ref => { this.hover = ref; }}
                    color={color}
                    colorSecondary={colorSecondary}
                    borderSize={borderSize}
                />
                <Before
                    innerRef={ref => { this.before = ref; }}
                    color={color}
                    colorSecondary={colorSecondary}
                    borderSize={borderSize}
                />
                <Content
                    innerRef={ref => { this.content = ref; }}
                    color={color}
                    colorSecondary={colorSecondary}
                    borderSize={borderSize}
                >
                    <span>{children}</span>
                </Content>
                <After
                    innerRef={ref => { this.after = ref; }}
                    color={color}
                    colorSecondary={colorSecondary}
                />
            </ButtonContainer>
        );
    }
}

const innerElement = css`
    position: absolute;
    display: block;
    width: 120%;
    height: 120%;
    top: -10%;
    left: 0;
    margin: 0;
    transform: translate(-100%,0px);
`;

const ButtonContainer = styled.button`
    position: relative;
    cursor: pointer;
    background-color: transparent;
    width: ${props => props.width};
    height: ${props => props.height};
    box-sizing: border-box;
    outline: none;
    border: none;
    overflow: hidden;
`;

const Border = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border: ${props => props.borderSize}px ${props => props.color} solid;
    box-sizing: border-box;
    top: 0;
    left: 0;
`;

const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    line-height: 50px;
    color: ${props => props.color};
`;

const Hover = styled.div`
    ${innerElement};
    background-color: ${props => props.color};
    z-index:0;
`;

const Before = styled.div`
    ${innerElement};
    background-color: ${props => props.colorSecondary};
`;

const After = styled.div`
    ${innerElement};
    background-color: ${props => props.colorSecondary};
    z-index:0;
`;

export default Button;