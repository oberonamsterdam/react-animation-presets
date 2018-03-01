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
import styled from 'styled-components';
import Image from './layout/Image';

type Props = {
    src: string,
    src2x?: string,
    alt?: string,
    ratio?: number,
    color?: string,
    onLoad?: () => void,
    onError?: () => void
};

type State = {
    isLoading: boolean,
    progress: number
};

const DEFAULTS = {
    ratio: 16 / 9,
    color: '#EEEEEE'
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
        const { src, src2x, alt, ratio = DEFAULTS.ratio, color = DEFAULTS.color } = this.props;
        const { progress } = this.state;

        return (
            <ImageLoader>
                <LoadingBar
                    progress={progress}
                    onComplete={this.loadCompleteHandler}
                />
                <LoadingMask
                    innerRef={ref => { this.loadingMask = ref; }}
                    color={color}
                />
                <ImageMask
                    innerRef={ref => { this.imageMask = ref; }}
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
        this.scaleObject = {
            current: 0.001
        };
        if (!isLoading && this.loadAnimationComplete) {
            let delay = 2;
            this.timeline = new TimelineLite({
                onUpdate: this.scaleUpdateHandler
            });
            this.timeline.timeScale(0.2);
            this.timeline.add(TweenLite.fromTo(this.loadingMask, 1.2, {scaleY: 0.01}, {scaleY: 1, ease: Quad.easeInOut}), delay);

            delay += 0.2;
            this.timeline.add(TweenLite.to(this.scaleObject, 1.2, {current: 1, ease: Quad.easeInOut}), delay);
        }
    }

    scaleUpdateHandler = () => {
        this.imageMask.style.transform = `scaleY(${this.scaleObject.current})`;
        this.imageWrapper.style.transform = `scaleY(${1 / this.scaleObject.current})`;
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

const LoadingMask = styled.figure`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    transform: scaleY(0);
    background-color: ${({ color }: Props) => color};
`;

const ImageMask = styled.figure`
    position: relative;
    overflow: hidden;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    transform: scaleY(0);
    background-color: ${({ color }: Props) => '#ff0000' || color};
`;

/* START LoadingBar */
type LoadingBarProps = {
    progress: number
};
class LoadingBar extends PureComponent<LoadingBarProps> {
    progressBar: HTMLElement;

    componentWillReceiveProps (newProps: LoadingBarProps) {
        if (this.progressBar) {
            const { progress, onComplete } = newProps;
            TweenLite.to(this.progressBar, 0.1, {
                scaleX: progress,
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
        return (
            <ProgressWrapper>
                <ProgressBar innerRef={ref => { this.progressBar = ref; }} />
            </ProgressWrapper>
        );
    }
}

const ProgressWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
`;

const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #222222;
    transform-origin: left;
    transform: scaleX(0);
`;
/* END LoadingBar */

export default ImageLoad;