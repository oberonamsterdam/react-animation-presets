// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';

export type ImageProps = {
    src: string,
    src2x?: string,
    alt?: string,
    ratio?: number,
    imageFill?: boolean,
};

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

const Image = ({ src, src2x, ratio, alt, fill, onLoad, onError }) => {
    let image = null;
    let imageWrapper = null;

    const onImageLoad = () => {
        image.style.opacity = 1;
        onLoad && onLoad({imageWrapper, image});
    };

    const onImageError = (e) => {
        onError && onError(e);
    };

    return (
        <ImageWrapper
            innerRef={ref => { imageWrapper = ref; }}
            ratio={ratio}
            imageFill={fill}
            hover
        >
            <Img
                innerRef={ref => { image = ref; }}
                onLoad={onImageLoad}
                onError={onImageError}
                srcSet={`${src} 1x, ${src2x || src} 2x`}
                alt={alt}
            />
        </ImageWrapper>
    );
};

const LoadProgress = (WrappedComponent) => {
    return class Progress extends PureComponent {
        componentDidMount () {
            console.log('componentDidMount', this.props);
        }

        render () {
            return <WrappedComponent {...this.props}/>;
        }
    };
};

export default LoadProgress(Image);