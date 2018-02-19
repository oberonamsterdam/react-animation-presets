import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const PageOne = () => <StyledP>Page one</StyledP>;
const PageTwo = () => <StyledP>Page two</StyledP>;
const PageThree = () => <StyledP>Page three</StyledP>;

export const DemoLayout = ({ children }) => {
    return (
        <section>
            <nav>
                <List>
                    <li><StyledLink to="/">one</StyledLink></li>
                    <li><StyledLink to="/two">two</StyledLink></li>
                    <li><StyledLink to="/three">Three</StyledLink></li>
                </List>
            </nav>
            <RelativeDiv>
                {children}
            </RelativeDiv>
        </section>
    );
};

export const RouteSwitch = (props) => {
    return (
        <Switch location={props.location}>
            <Route exact path={'/two'} component={PageTwo}/>
            <Route exact path={'/three'} component={PageThree}/>
            <Route component={PageOne}/>
        </Switch>
    );
};

const List = styled.ul`
    display: flex;
    list-style: none;
    padding: .5rem 0;
    margin: 0;
    background: #333;
    justify-content: space-around;
`;

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-family: sans-serif;
`;

const RelativeDiv = styled.div`
    position: relative;
`;

const StyledP = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    color: blue;
    font-family: sans-serif;
   text-shadow: 0 0 .5rem rgba(0,0,0,.2);
    font-size: 1.5rem;
    transform: translate(-50%);
`;

export const RouterLayout = (WrappedComponent) => {
    return (
        <BrowserRouter>
            <Route render={({ location }) => (
                <DemoLayout location={location}>
                    <WrappedComponent test={'yoloswag'} />
                </DemoLayout>
            )}/>
        </BrowserRouter>
    );
};
