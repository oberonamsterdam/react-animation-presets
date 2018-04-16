# React animation presets
Welcome to the React animation presets project. This project will give an overview of reusable animations used within react projects.

To see the live animation examples click [here](https://oberonamsterdam.github.io/react-animation-presets/).

## Motivation
The reason this package was created is because there are alot of animations that can be reused. So it would be meaningless to reïnvent the wheel everytime we want to create a default page transition or a button hover. This package will help developers to create those kind of animations quicker and easier.

More animations will be added to this package (checkout the [animation roadmap](animationRoadmap.md)) so it will be growing over time.

## Installation
`npm install react-animation-presets` or  `yarn add react-animation-presets`

## Usage
import the animation you want to use from the library, in the example we are using the `ImageLoad` animation.

```javascript
import React from 'react';
import { ImageLoad } from 'react-animation-presets';

export default App extends React.Component (
    <div className="App">
        <ImageLoad
            alt="Image alt text"
            color="#222"
            ratio={16 / 9}
            src="https://picsum.photos/960/540?random"
            src2x="https://picsum.photos/1920/1080?random"
        />
    </div>
);
```

## Copy and paste
For this package we are using the tool [storybook](https://github.com/storybooks/storybook). This means we have a nice overview of all the animations available in this package. When you make a choice on the animation you want to include in your project just head over to the `jsx` tab for the chosen animation and `copy` and `paste` the code and you are set!

## Want to contribute?
So you want to contribute to this library? Yaay! Good for you and for us! We want this library to have a good amount of content so it will be easier and faster to create more immersive content to websites/apps. Check the [animation requirements list](animationRequirementsList.md) to see the minimum requirements for each animation.