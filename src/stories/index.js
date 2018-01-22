// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';

import ImageLoad from '../components/ImageLoad';
// import Button from '../components/Button';
import LoadingText from '../components/LoadingText';

import { Button } from '../index';

storiesOf('Images', module)
    .addDecorator(withKnobs)
    .addWithJSX('Imageload', () => (
        <ImageLoad
            src={text('src', 'https://picsum.photos/960/540?random')}
            src2x={text('src2x', 'https://picsum.photos/1920/1080?random')}
            alt={text('alt', 'Image alt text')}
            ratio={number('ratio', 16 / 9)}
            color={text('color', '#222')}
            onLoad={() => { console.log('onload'); }}
            onError={() => { console.log('onError'); }}
        />
    ));

storiesOf('Buttons', module)
    .addWithJSX('Button', () => <Button>Click</Button>);

storiesOf('Placeholders', module)
    .addWithJSX('Loading text', () => <LoadingText>Loading</LoadingText>);