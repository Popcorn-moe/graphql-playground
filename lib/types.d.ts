export interface Session {
    id: string;
    name?: string;
    filePath?: string;
    query: string;
    file?: string;
    variables: string;
    result?: string;
    operationName?: string;
    subscriptionActive: boolean;
    isFile?: boolean;
    queryTypes: QueryTypes;
    starred?: boolean;
    date: Date;
    hasMutation: boolean;
    hasSubscription: boolean;
    hasQuery: boolean;
    selectedUserToken?: string;
    subscriptionId?: string;
    headers?: string;
    hasChanged?: boolean;
    absolutePath?: string;
    endpoint: string;
    isSettingsTab?: boolean;
    isConfigTab?: boolean;
}
export interface QueryTypes {
    firstOperationName: string | null;
    subscription: boolean;
    query: boolean;
    mutation: boolean;
    permission?: boolean;
}
export interface OperationDefinition {
    startLine: number;
    endLine: number;
    name: string;
}
export declare type HistoryFilter = 'HISTORY' | 'STARRED';
export declare type Environment = 'Node' | 'Browser' | 'Cli';
export declare type GraphQLClient = 'fetch' | 'relay' | 'apollo' | 'graphql-request' | 'curl';
export declare type Theme = 'dark' | 'light';
export interface Response {
    resultID: string;
    date: string;
    time: Date;
}
