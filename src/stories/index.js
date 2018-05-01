// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select, boolean, object } from '@storybook/addon-knobs/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { withReadme } from 'storybook-readme';

import transitionNotes from '../components/notes/transitionNotes.md';

import ImageLoad from '../components/ImageLoad';
import Button from '../components/Button';
import { RouteSwitch, DemoLayout } from '../components/router.demo';
import PageTransition from '../components/PageTransition';

storiesOf('Images', module)
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
    .addWithJSX('Horizontal pass', () => (
        <Button type={select('type', ['stay', 'disappear'], 'stay')}>{text('label', 'Click!')}</Button>
    ))
    .addWithJSX('Horizontal fill', () => (
        <Button type={'fill'}>{text('label', 'Click!')}</Button>
    ));

storiesOf('Page transition', module)
    .addDecorator(withKnobs)
    .addDecorator(withReadme(transitionNotes))
    .addWithJSX('PageTransition', () => (
        <BrowserRouter>
            <Route render={({ location }) => (
                <DemoLayout>
                    <PageTransition
                        animation={select('animation', ['fade'], 'fade', 'transition')}
                        backgroundColor={text('backgroundColor', '#ddd')}
                        duration={object('duration', {
                            in: 0.5,
                            out: 0.3
                        }, 'duration')}
                        initialAnimation={boolean('initialAnimation', true)}
                    >
                        <RouteSwitch location={location}/>
                    </PageTransition>
                </DemoLayout>
            )}/>
        </BrowserRouter>
    ));
