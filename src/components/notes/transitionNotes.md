# PageTransition
## Usage

```js
import { PageTransition } from 'react-animation-presets';

const App = () => (
    <BrowserRouter>
        <Route render=(({ location }) => (
            <PageTransition
                animation={'fade'}
                backgroundColor={'blue'}
            >
                <Switch>
                    /* routes here */
                </Switch>
            </PageTransition>
        ))
    </BrowserRouter>
);

```


## Props
__animation:__
- value: `'fade'` <-- more coming
- required: `false`
- default: `'fade'`

__backgroundColor__
- value: `string` <-- HEX colorcode or 'transparent'
- required: `false`
- default: `'transparent'`

__Duration__
- value:
```
{
    in: number,
    out: number
}
```
- required: `false`
- default:
```
{
    in: 0.6
    out: 0.3
}
```

__initialAnimation__
- value: `boolean`
- required: `false`
- default: `true`
