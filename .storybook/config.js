import { setOptions } from '@storybook/addon-options';
import { configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

function loadStories() {
    require('../src/stories');
}

setOptions({
    name: 'Oberon animations',
    url: 'https://oberon.nl',
});

setAddon(JSXAddon);

configure(loadStories, module);
