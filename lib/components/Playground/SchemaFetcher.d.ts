import { GraphQLSchema } from 'graphql';
export interface TracingSchemaTuple {
    schema: GraphQLSchema;
    tracingSupported: boolean;
}
export declare class SchemaFetcher {
    cache: Map<string, TracingSchemaTuple>;
    constructor();
    fetch(endpoint: string, headers?: any): Promise<{
        schema: GraphQLSchema;
        tracingSupported: boolean;
    } | null>;
    refetch(endpoint: string, headers: any): Promise<{
        schema: GraphQLSchema;
        tracingSupported: boolean;
    } | null>;
    hash(endpoint: string, headers: any): any;
    private fetchSchema(endpoint, headers?);
}
