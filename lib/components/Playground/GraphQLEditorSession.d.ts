/// <reference types="react" />
import * as React from 'react';
import { Session } from '../../types';
import { SchemaFetcher } from './SchemaFetcher';
import { SharingProps } from '../Share';
import { EditorSettings } from '../MiddlewareApp';
export interface Props {
    session: Session;
    index: number;
    onRef: (index: number, ref: any) => void;
    isGraphcoolUrl: boolean;
    fetcher: (session: Session, graphQLParams: any, headers?: any) => Promise<any>;
    schemaFetcher: SchemaFetcher;
    isEndpoint: boolean;
    storage?: any;
    onEditQuery: (sessionId: string, data: any) => void;
    onEditVariables: (sessionId: string, variables: any) => any;
    onEditOperationName: (sessionId: string, name: any) => any;
    onClickCodeGeneration: any;
    onChangeHeaders: (sessionId: string, headers: string) => any;
    onClickHistory: () => void;
    onChangeEndpoint: (sessionId: string, value: string) => void;
    onClickShare: (sessionId: string) => void;
    headers?: any[];
    disableQueryHeader?: boolean;
    disableResize?: boolean;
    responses?: any;
    useVim: boolean;
    isActive: boolean;
    sharing?: SharingProps;
    fixedEndpoint?: boolean;
    endpoint: string;
    settings: EditorSettings;
}
export default class GraphQLEditorSession extends React.PureComponent<Props, {}> {
    fetcher: (graphQLParams: any, headers?: any) => Promise<any>;
    render(): JSX.Element;
    private setRef;
    private handleOperationNameChange;
    private handleVariableChange;
    private handleQueryChange;
    private handleChangeHeaders;
    private handleClickHistory;
    private handleChangeEndpoint;
    private handleClickShare;
    private shouldHideTracingResponse;
}
