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
    totalDuration: number
};

type State = {
    isClicked: boolean
};

const DEFAULTS = {
    color: 'rgb(0,0,0)',
    colorSecondary: 'rgb(255,255,255)',
    borderSize: 2,
    totalDuration: 0.9
};

class Button extends PureComponent<Props, State> {
    hover: HTMLElement;
    before: HTMLElement;
    content: HTMLElement;
    after: HTMLElement;
    timeline: TimelineLite;

    onButtonClick = () => {
        const { totalDuration = DEFAULTS.totalDuration } = this.props;
        this.timeline = new TimelineLite();
        let delay = 0;
        if (this.props.type === 'disappear') {
            TweenLite.fromTo(this.before, totalDuration / 5, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: linear});
            delay += totalDuration / 5;
            this.timeline.add(TweenLite.fromTo(this.after, totalDuration / 3, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: linear}), delay);
        }
        if (this.props.type === 'stay') {
            TweenLite.fromTo(this.before, totalDuration / 5, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: linear});
            delay += totalDuration / 5;
            this.timeline.add(TweenLite.fromTo(this.after, totalDuration / 5, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: linear}), delay);
            delay += totalDuration / 5;
            this.timeline.add(TweenLite.to(this.before, totalDuration / 5, {x: '100%', skewX: '0%', ease: linear}), delay);
            this.timeline.add(TweenLite.to(this.after, totalDuration / 5, {x: '100%', skewX: '0%', ease: linear}), delay);
        }
        // this.timeline.timeScale(0.2);
    };

    onButtonHover = (e) => {
        const { color = DEFAULTS.color, colorSecondary = DEFAULTS.colorSecondary, totalDuration = DEFAULTS.totalDuration } = this.props;
        this.timeline = new TimelineLite();
        let delay = 0;
        this.timeline.add(TweenLite.fromTo(this.hover, totalDuration / 3, {x: '-100%', skewX: '0%'}, {x: '-10%', skewX: '-20%', ease: Quad.easeIn}), delay);
        this.timeline.add(TweenLite.fromTo(this.content, totalDuration / 10, {color: color}, {color: colorSecondary, ease: linear}), delay);
        delay += totalDuration / 3;
        this.timeline.add(TweenLite.to(this.hover, totalDuration / 3, {x: '100%', skewX: '0%', ease: Quad.easeOut}), delay);
        this.timeline.add(TweenLite.to(this.content, totalDuration / 10, {color: color, ease: linear}), delay);

        // this.timeline.timeScale(0.2);
        return false;
    };

    render () {
        const { borderSize = DEFAULTS.borderSize, color = DEFAULTS.color, colorSecondary = DEFAULTS.colorSecondary, children } = this.props;
        return (
            <ButtonContainer borderSize={borderSize} color={color} colorSecondary={colorSecondary} onClick={this.onButtonClick} onMouseEnter={this.onButtonHover}>
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
    width: 200px;
    height:50px;
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