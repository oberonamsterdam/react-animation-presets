// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';

// const Image = ({ ratio, alt, fill, progressEvent, onLoad, onError, onProgress }: ImageProps) => {
//     let image = null;
//     let imageWrapper = null;

//     const onImageLoad = () => {
//         image.style.opacity = 1;
//         onLoad && onLoad({imageWrapper, image});
//     };

//     const onImageError = (e) => {
//         onError && onError(e);
//     };

//     const progress = progressEvent.loaded / progressEvent.total;
//     if (progress < 1) {
//         onProgress && onProgress(progress);
//     }

//     if (progressEvent.target) {
//         console.log('target', progressEvent.target.responseURL);
//     }

//     return (
//         <ImageWrapper
//             innerRef={ref => { imageWrapper = ref; }}
//             ratio={ratio}
//             imageFill={fill}
//         >
//             {
//                 progress >= 1 && progressEvent.target.responseURL &&
//                     <Img
//                         innerRef={ref => { image = ref; }}
//                         onLoad={onImageLoad}
//                         onError={onImageError}
//                         src={progressEvent.target.responseURL}
//                         alt={alt}
//                     />
//             }
//         </ImageWrapper>
//     );
// };

export type ImageProps = {
    src: string,
    src2x?: string,
    alt?: string,
    ratio?: number,
    imageFill?: boolean,
    progressEvent?: ProgressEvent,

    onLoad?: () => void,
    onError?: () => void,
    onProgress?: () => void
};

type ImageState = {
    isLoaded: boolean,
    src: string
};

class Image extends PureComponent<ImageProps, ImageState> {
    state = {
        isLoaded: false,
        src: ''
    };

    image: HTMLElement;
    imageWrapper: HTMLElement;

    componentWillReceiveProps (newProps: ImageProps) {
        const { onProgress, progressEvent } = newProps;
        const progress = progressEvent.loaded / progressEvent.total;
        onProgress && onProgress(progress);
        if (progress >= 1) {
            this.setState({
                isLoaded: true,
                src: progressEvent.target.responseURL
            });
        }
    }

    render () {
        const { ratio, alt, fill } = this.props;
        const { isLoaded, src } = this.state;
        return (
            <ImageWrapper
                innerRef={ref => { this.imageWrapper = ref; }}
                ratio={ratio}
                imageFill={fill}
            >
                {
                    isLoaded &&
                        <Img
                            innerRef={ref => { this.image = ref; }}
                            onLoad={this.imageLoadHandler}
                            onError={this.imageErrorHandler}
                            src={src}
                            alt={alt}
                        />
                }
            </ImageWrapper>
            
        );
    }

    imageLoadHandler = () => {
        const { onLoad } = this.props;
        this.image.style.opacity = 1;
        onLoad && onLoad({
            imageWrapper: this.imageWrapper,
            image: this.image
        });
    }

    imageErrorHandler = (e: any) => {
        const { onError } = this.props;
        onError && onError(e);
    }
}

const ImageWrapper = styled.figure`
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
    height: ${({imageFill}: ImageProps) => imageFill ? '100%' : 'initial'};
    
    &:before {
        content: '';
        display: block;
        padding-bottom: ${({ ratio, imageFill }: ImageProps) => {
            if (imageFill) {
                return 0;
            }
            return ratio ? `${100 / ratio}%` : '100%';
        }};
    }

    ${({ hover }: ImageProps) => {
        if (hover) {
            return `
                &:hover {
                    > img {
                        transform: scale(1.05);
                    }
                }
            `;
        }
        return '';
    }};
`;

const Img = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: ${({ contain }: ImageProps) => contain ? 'contain' : 'cover'};
    top: 0;
    left: 0;
    transform: scale(1);
    transition: transform 1s ease-in-out;
`;

/* LoadProgress HOC */
type LoadProgressState = {
    progressEvent: ProgressEvent
};

const LoadProgress = (WrappedComponent) => {
    class Progress extends PureComponent<{}, LoadProgressState> {
        client: XMLHttpRequest;
        
        state = {
            progressEvent: {}
        };
        
        componentDidMount () {
            const imageSrc = window.devicePixelRatio > 1 ? this.props.src2x : this.props.src;

            this.client = new XMLHttpRequest();
            this.client.open('GET', imageSrc);
            this.client.onprogress = this.progressHandler;
            this.client.send();
        }

        render () {
            return <WrappedComponent {...this.props} progressEvent={this.state.progressEvent}/>;
        }

        progressHandler = (e: ProgressEvent) => {
            const progressEvent = e;
            this.setState({progressEvent});
        }
    }

    return Progress;
};

export default LoadProgress(Image);