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

import { TimelineLite, TweenLite, Circ, Quad } from 'gsap';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import Image from './layout/Image';

type Props = {
    src: string,
    src2x?: string,
    alt?: string,
    ratio?: number,
    color?: string,
    direction?: 'top' | 'right' | 'bottom' | 'left',
    onLoad?: () => void,
    onError?: () => void,

    width?: string,
    height?: string,
    position?: 'top' | 'right' | 'bottom' | 'left' | 'center',
};

type State = {
    isLoading: boolean,
    progress: number
};

const DEFAULTS = {
    ratio: 16 / 9,
    direction: 'left',
    color: '#EEEEEE',
    
    width: '100%',
    height: '4px',
    position: 'top'
};

class ImageLoad extends PureComponent<Props, State> {
    state = {
        isLoading: true,
        progress: 0
    };

    loadingBar: HTMLElement;
    imageWrapper: HTMLElement;
    mask: HTMLElement;
    timeline: TimelineLite;
    
    loadAnimationComplete: boolean;

    render () {
        const { src, src2x, alt, ratio = DEFAULTS.ratio, color = DEFAULTS.color, direction = DEFAULTS.direction, position = DEFAULTS.position, width = DEFAULTS.width, height = DEFAULTS.height } = this.props;
        const { progress } = this.state;

        return (
            <ImageLoader>
                <LoadingBar
                    width={width}
                    height={height}
                    color={color}
                    position={position}
                    progress={progress}
                    onComplete={this.loadCompleteHandler}
                />
                <ImageMask
                    innerRef={ref => { this.imageMask = ref; }}
                    direction={direction}
                    color={color}
                >
                    <Image
                        src={src}
                        src2x={src2x}
                        ratio={ratio}
                        alt={alt}
                        onLoad={this.imageLoadHandler}
                        onError={this.imageErrorHandler}
                        onProgress={this.imageProgressHandler}
                    />
                </ImageMask>
            </ImageLoader>
        );
    }

    showImage = () => {
        const { isLoading } = this.state;
        this.setState({isLoading: false});
        const delay = 0;
        this.timeline = new TimelineLite({
            paused: true
        });
        this.timeline.add(TweenLite.to(this.imageMask, 0.6, {x: '0%', y: '0%', ease: Circ.easeInOut}), delay);
        this.timeline.add(TweenLite.fromTo(this.imageWrapper, 1.2, {transformOrigin: 'right', scale: 1.2}, {scale: 1, ease: Circ.easeOut}), delay);

        if (!isLoading && this.loadAnimationComplete) {
            this.timeline.play();
        }
    }

    imageLoadHandler = (e) => {
        const { onLoad } = this.props;
        this.imageWrapper = e.imageWrapper;
        this.showImage();
        onLoad && onLoad();
    };

    imageErrorHandler = (e) => {
        const { onError } = this.props;
        this.showImage();
        onError && onError(e);
    };

    imageProgressHandler = (progress: number) => {
        this.setState({progress});
    }

    loadCompleteHandler = () => {
        this.loadAnimationComplete = true;
        this.showImage();
    }
}

const ImageLoader = styled.figure`
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 100%;
    margin: 0;
`;

const directionTop = css`transform: translate(0, -100%);`;
const directionRight = css`transform: translate(100%, 0);`;
const directionBottom = css`transform: translate(0, 100%);`;
const directionLeft = css`transform: translate(-100%, 0);`;

const ImageMask = styled.figure`
    position: relative;
    overflow: hidden;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: ${({ color }: Props) => color};
    ${({ direction }: Props) => {
        switch (direction) {
            case 'top':
                return directionTop;

            case 'right':
                return directionRight;

            case 'bottom':
                return directionBottom;

            case 'left':
                return directionLeft;

            default:
                return directionLeft;
        }
    }}
`;

/* START LoadingBar */
type LoadingBarProps = {
    position?: 'top' | 'right' | 'bottom' | 'left' | 'center',
    width?: string,
    height?: string,
    color?: string,
    progress: number
};
class LoadingBar extends PureComponent<LoadingBarProps> {
    progressBar: HTMLElement;

    componentWillReceiveProps (newProps: LoadingBarProps) {
        if (this.progressBar) {
            const { position, progress, onComplete } = newProps;
            const progressX = (position === 'top' || position === 'bottom') ? progress : 1;
            const progressY = (position === 'right' || position === 'left') ? progress : 1;
            TweenLite.to(this.progressBar, 0.3, {
                scaleX: progressX,
                scaleY: progressY,
                ease: Quad.easeInOut,
                onComplete: () => {
                    if (progress >= 1 && onComplete) {
                        onComplete();
                    }
                }
            });
        }
    }

    render () {
        const { position, width, height, color } = this.props;
        return (
            <ProgressWrapper
                position={position}
                width={width}
                height={height}
            >
                <ProgressBar
                    innerRef={ref => { this.progressBar = ref; }}
                    position={position}
                    color={color}
                />
            </ProgressWrapper>
        );
    }
}

const wrapperPositionTop = css`
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
`;

const wrapperPositionRight = css`
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
`;

const wrapperPositionBottom = css`
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
`;

const wrapperPositionLeft = css`
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
`;

const wrapperPositionCenter = css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ProgressWrapper = styled.div`
    position: absolute;
    width: ${({ width }: Props) => width};
    height: ${({ height }: Props) => height};
    background-color: rgba(0, 0, 0, 0.2);

    ${({ position }: Props) => {
        switch (position) {
            case 'top':
                return wrapperPositionTop;

            case 'right':
                return wrapperPositionRight;

            case 'bottom':
                return wrapperPositionBottom;

            case 'left':
                return wrapperPositionLeft;

            case 'center':
                return wrapperPositionCenter;

            default:
                return wrapperPositionTop;
        }
    }}
`;

const barPositionTop = css`
    transform-origin: left;
    transform: scaleX(0);
`;

const barPositionRight = css`
    transform-origin: top;
    transform: scaleY(0);
`;

const barPositionBottom = css`
    transform-origin: left;
    transform: scaleX(0);
`;

const barPositionLeft = css`
    transform-origin: top;
    transform: scaleY(0);
`;

const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ color }: Props) => color};

    ${({ position }: Props) => {
        switch (position) {
            case 'top':
                return barPositionTop;

            case 'right':
                return barPositionRight;

            case 'bottom':
                return barPositionBottom;

            case 'left':
                return barPositionLeft;

            default:
                return barPositionTop;
        }
    }}
`;
/* END LoadingBar */

export default ImageLoad;