// Mock Upstash Redis Client
export const redis = {
    set: async (key: string, value: string) => "OK",
    get: async (key: string) => null,
    hset: async () => 1,
    hgetall: async () => ({}),
};
