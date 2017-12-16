/// <reference types="react" />
import * as React from 'react';
import { GraphQLSchema } from 'graphql';
import { OperationDefinition, Session } from '../../types';
import { Response } from '../Playground';
import { LocalThemeInterface } from '../Theme/index';
import { SchemaFetcher } from './SchemaFetcher';
import { SharingProps } from '../Share';
/**
 * The top-level React component for GraphQLEditor, intended to encompass the entire
 * browser viewport.
 */
export interface Props {
    fetcher: (params: any, headers?: any) => Promise<any>;
    schemaFetcher: SchemaFetcher;
    isGraphcoolUrl?: boolean;
    query?: string;
    variables?: string;
    operationName?: string;
    responses?: Response[];
    isActive: boolean;
    session: Session;
    storage?: any;
    defaultQuery?: string;
    onEditQuery?: (data: any) => void;
    onEditVariables?: (variables: any) => any;
    onEditOperationName?: (name: any) => any;
    onToggleDocs?: (value: boolean) => any;
    onClickCodeGeneration?: any;
    onChangeHeaders?: (headers: string) => any;
    onClickHistory?: () => void;
    onChangeEndpoint?: (value: string) => void;
    onClickShare?: () => void;
    getDefaultFieldNames?: () => any;
    showCodeGeneration?: boolean;
    showEndpoints?: boolean;
    showQueryTitle?: boolean;
    showResponseTitle?: boolean;
    showDownloadJsonButton?: boolean;
    disableQueryHeader?: boolean;
    queryOnly?: boolean;
    showDocs?: boolean;
    rerenderQuery?: boolean;
    operations?: OperationDefinition[];
    showSchema?: boolean;
    schemaIdl?: string;
    schemaModelName?: string;
    disableAutofocus?: boolean;
    disableResize?: boolean;
    fixedEndpoint?: boolean;
    shouldHideTracingResponse: boolean;
    disableAnimation?: boolean;
    hideLineNumbers?: boolean;
    hideGutters?: boolean;
    readonly?: boolean;
    useVim?: boolean;
    endpoint: string;
    sharing?: SharingProps;
}
export interface ReduxProps {
    setStacks: (sessionId: string, stack: any[]) => void;
    navStack: any[];
}
export interface State {
    schema?: GraphQLSchema | null;
    query: string;
    variables?: any;
    operationName?: string;
    responses: any[];
    editorFlex: number;
    variableEditorOpen: boolean;
    variableEditorHeight: number;
    responseTracingOpen: boolean;
    responseTracingHeight: number;
    docExploreOpen: boolean;
    docExplorerWidth: number;
    isWaitingForReponse: boolean;
    subscription: any;
    variableToType: any;
    operations: any[];
    docExplorerOpen: boolean;
    schemaExplorerOpen: boolean;
    schemaExplorerWidth: number;
    isWaitingForResponse: boolean;
    selectedVariableNames: string[];
    responseExtensions: any;
    currentQueryStartTime?: Date;
    currentQueryEndTime?: Date;
    nextQueryStartTime?: Date;
    tracingSupported?: boolean;
    queryVariablesActive: boolean;
}
export interface SimpleProps {
    children?: any;
}
export interface ToolbarButtonProps extends SimpleProps {
    onClick: (e: any) => void;
    title: string;
    label: string;
}
export declare class GraphQLEditor extends React.PureComponent<Props & LocalThemeInterface & ReduxProps, State> {
    static Logo: (props: SimpleProps) => JSX.Element;
    static Toolbar: (props: SimpleProps) => JSX.Element;
    static Footer: (props: SimpleProps) => JSX.Element;
    static ToolbarButton: (props: ToolbarButtonProps) => JSX.Element;
    codeMirrorSizer: any;
    queryEditorComponent: any;
    variableEditorComponent: any;
    resultComponent: any;
    editorBarComponent: any;
    docExplorerComponent: any;
    private storage;
    private editorQueryID;
    private resultID;
    private queryResizer;
    private responseResizer;
    private queryVariablesRef;
    private httpHeadersRef;
    private updateQueryFacts;
    constructor(props: Props & LocalThemeInterface & ReduxProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getHeaderCount(): string;
    render(): JSX.Element;
    getCurl: () => string;
    setQueryVariablesRef: (ref: any) => void;
    setHttpHeadersRef: (ref: any) => void;
    setQueryResizer: (ref: any) => void;
    setResponseResizer: (ref: any) => void;
    setEditorBarComponent: (ref: any) => void;
    setQueryEditorComponent: (ref: any) => void;
    setVariableEditorComponent: (ref: any) => void;
    setResultComponent: (ref: any) => void;
    /**
     * Inspect the query, automatically filling in selection sets for non-leaf
     * fields which do not yet have them.
     *
     * @public
     */
    autoCompleteLeafs(): any;
    private reloadSchema;
    private renewStacks(schema);
    private convertHeaders(headers);
    private ensureOfSchema();
    private storageGet;
    private storageSet;
    private fetchQuery(query, variables, operationName, cb);
    private handleRunQuery;
    private handleStopQuery;
    private runQueryAtCursor();
    private handlePrettifyQuery;
    private handleEditQuery;
    private handleEditVariables;
    private handleHintInformationRender;
    private handleEditorRunQuery;
    private handleResizeStart;
    private didClickDragBar(event);
    private handleTracingResizeStart;
    private selectQueryVariables;
    private selectHttpHeaders;
    private handleVariableResizeStart;
    private onClickHintInformation;
}
declare const _default: React.ComponentClass<Props>;
export default _default;
