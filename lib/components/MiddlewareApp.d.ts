/// <reference types="react" />
import * as React from 'react';
import { Playground as IPlayground } from './Playground';
import { GraphQLConfig } from '../graphqlConfig';
export interface Props {
    endpoint?: string;
    endpointUrl?: string;
    subscriptionEndpoint?: string;
    setTitle?: boolean;
    settings?: EditorSettings;
    folderName?: string;
    configString?: string;
    showNewWorkspace?: boolean;
    isElectron?: boolean;
    canSaveConfig?: boolean;
    onSaveConfig?: (configString: string) => void;
    onNewWorkspace?: () => void;
    getRef?: (ref: any) => void;
    platformToken?: string;
    session?: any;
    env?: any;
    config?: GraphQLConfig;
}
export interface State {
    endpoint: string;
    subscriptionPrefix?: string;
    subscriptionEndpoint?: string;
    shareUrl?: string;
    platformToken?: string;
    settingsString: string;
    settings: EditorSettings;
    configIsYaml?: boolean;
    configString?: string;
    activeProjectName?: string;
    activeEnv?: string;
    headers?: any;
}
export declare type Theme = 'dark' | 'light';
export interface EditorSettings {
    ['editor.theme']: Theme;
    ['editor.reuseHeaders']: boolean;
    ['tracing.hideTracingResponse']: boolean;
}
declare class MiddlewareApp extends React.Component<Props, State> {
    playground: IPlayground;
    constructor(props: Props);
    getGraphcoolSubscriptionEndpoint(endpoint: any): any;
    migrateSettingsString(settingsString: any): any;
    componentWillReceiveProps(nextProps: Props): void;
    getInitialActiveEnv(config?: GraphQLConfig): {
        projectName?: string;
        activeEnv?: string;
    };
    isConfigYaml(configString: string): boolean;
    absolutizeUrl(url: any): any;
    normalizeSubscriptionUrl(endpoint: any, subscriptionEndpoint: any): any;
    componentWillMount(): void;
    componentDidMount(): void;
    render(): JSX.Element;
    handleUpdateSessionCount: () => void;
    getSessionCount: (endpoint: string) => number;
    getPlaygroundRef: (ref: any) => void;
    handleStartEditConfig: () => void;
    handleChangeConfig: (configString: string) => void;
    handleSaveConfig: () => void;
    handleSelectEnv: (env: string, projectName?: string | undefined) => void;
    getSettings(settingsString?: string): EditorSettings;
    normalizeSettings(settings: EditorSettings): EditorSettings;
    handleChangeSettings: (settingsString: string) => void;
    handleSaveSettings: () => void;
    private share;
    private normalizeEndpoint(endpoint);
    private handleChangeEndpoint;
    private handleChangeSubscriptionsEndpoint;
    private getTitle();
    private updateSubscriptionsUrl();
    private getSubscriptionsUrlCandidated(endpoint);
    private wsEndpointValid(url);
    private getProjectId(endpoint);
}
export default MiddlewareApp;
