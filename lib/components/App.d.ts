/// <reference types="react" />
import * as React from 'react';
import 'isomorphic-fetch';
export interface Props {
    endpoint?: string;
    subscriptionEndpoint?: string;
    history?: any;
    match?: any;
}
export interface State {
    endpoint?: string;
    subscriptionEndpoint?: string;
    shareUrl?: string;
    loading: boolean;
    session?: any;
}
declare class App extends React.Component<Props, State> {
    constructor(props: Props);
    componentWillMount(): void;
    render(): JSX.Element;
    private handleChangeEndpoint;
}
export default App;
