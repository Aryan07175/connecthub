// Mock Neo4j Driver Client
export const neo4j = {
    session: () => ({
        run: async (query: string, params: any) => ({
            records: []
        }),
        close: async () => { },
    }),
    close: async () => { }
};
