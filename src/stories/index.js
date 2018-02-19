// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';
import { BrowserRouter, Route } from 'react-router-dom';

import ImageLoad from '../components/ImageLoad';
import Button from '../components/Button';
import { RouteSwitch, DemoLayout, RouterLayout } from '../components/router.demo';
import PageTransition from '../components/PageTransition';

storiesOf('Images', module)
    .addDecorator(withKnobs)
    .addWithJSX('Imageload', () => (
        <ImageLoad
            src={text('src', 'https://picsum.photos/960/540?random')}
            src2x={text('src2x', 'https://picsum.photos/1920/1080?random')}
            alt={text('alt', 'Image alt text')}
            ratio={number('ratio', 16 / 9)}
            color={text('color', '#222')}
            onLoad={() => {
                console.log('onload');
            }}
            onError={() => {
                console.log('onError');
            }}
        />
    ));

storiesOf('Buttons', module)
    .addDecorator(withKnobs)
    .addWithJSX('Button', () => <Button>{text('label', 'Click me good!')}</Button>);

storiesOf('PageTransitions', module)
    .addDecorator(withKnobs)
    .addDecorator(RouterLayout)
    .addWithJSX('fade', (props) => (
        <PageTransition animation={text('animation', 'fade')} backgroundColor={text('background-color', '#ddd')}>
            <RouteSwitch test={props}/>
        </PageTransition>
    ));

storiesOf('full transition test', module)
    .addDecorator(withKnobs)
    .addWithJSX('fade test', () => (
        <BrowserRouter>
            <Route render={({ location }) => (
                <DemoLayout>
                    <PageTransition>
                        <RouteSwitch location={location}/>
                    </PageTransition>
                </DemoLayout>
            )
            }/>
        </BrowserRouter>
    ));
