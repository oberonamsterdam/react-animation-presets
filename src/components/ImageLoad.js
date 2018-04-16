// @flow

/*
 * REQUIREMENTS:
 * - React
 * - Greensock Animation Platform (GSAP)
 * - Styled Components
 * 
 * USAGE:
 * 
 * props:
 * src: string = url of normal size image
 * src2x: string = url of retina size image
 * ratio: number = aspect ratio of image defaults to 16/9
 * color: string = color of image mask, defaults to light grey (#EEEEEE)
 * onLoad: function = function to call when image has loaded
 * onError: function = function to call when image did not load
 * 
 * <ImageLoader src='' src2x='' onLoad={onLoadHandler} onError={onErrorHandler} />
 * 
 */

import { TimelineLite, TweenLite, Circ } from 'gsap';
import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from './layout/Image';

type Props = {
    src: string,
    src2x?: string,
    alt?: string,
    ratio?: number,
    color?: string,
    direction?: 'top' | 'right' | 'bottom' | 'left',
    onLoad?: () => void,
    onError?: () => void
};

type State = {
    isLoading: boolean
};

const DEFAULTS = {
    ratio: 16 / 9,
    color: '#EEEEEE'
};

class ImageLoad extends PureComponent<Props, State> {
    state = {
        isLoading: true
    };

    mask: HTMLElement;
    timeline: TimelineLite;

    render () {
        const { src, src2x, alt, ratio = DEFAULTS.ratio, color = DEFAULTS.color } = this.props;
        const { isLoading } = this.state;

        return (
            <ImageLoader>
                <Image
                    src={src}
                    src2x={src2x}
                    ratio={ratio}
                    alt={alt}
                    onLoad={this.onImageLoad}
                    onError={this.onImageError}
                />
                <ImageMask
                    innerRef={ref => { this.mask = ref; }}
                    color={color}
                />
                {isLoading && <Loader />}
            </ImageLoader>
        );
    }

    onImageLoad = (e) => {
        const { direction = DEFAULTS.direaction, onLoad } = this.props;
        const { imageWrapper } = e;

        let x = 0;
        let y = 0;

        switch (direction) {
            case 'top':
                y = 100;
                break;

            case 'right':
                x = 100;
                break;

            case 'bottom':
                y = -100;
                break;

            case 'left':
                x = -100;
                break;
        }

        if (imageWrapper) {
            this.timeline = new TimelineLite();
            const delay = 0;
            this.timeline.add(TweenLite.to(this.mask, 0.6, {x: `${x}%`, y: `${y}%`, ease: Circ.easeInOut}), delay);
            this.timeline.add(TweenLite.fromTo(imageWrapper, 1.2, {transformOrigin: direction, scale: 1.2}, {scale: 1, ease: Circ.easeOut}), delay);
        }

        this.setState({isLoading: false});
        onLoad && onLoad();
    };

    onImageError = (e) => {
        const { onError } = this.props;
        this.setState({isLoading: false});
        onError && onError(e);
    };
}

const ImageLoader = styled.figure`
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    margin: 0;
`;

const ImageMask = styled.figure`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: ${({ color }: Props) => color};
    transform: translate(0, 0);
`;

const LoaderAnimation = keyframes`
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
`;
const Loader = styled.figure`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;
    border: 4px solid #fff;
    border-right: 4px solid transparent;
    border-radius: 50%;

    transform: translate(-50%, -50%);
    animation: ${LoaderAnimation} 1s linear infinite;
`;

export default ImageLoad;