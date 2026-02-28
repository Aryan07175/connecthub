// Mock Socket.IO server
// Replace with real Express + Socket.IO server in production
export const io = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit: (event: string, data: any) => {
        console.log(`[Socket.io] Emitting ${event}:`, data);
    },
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
    on: (_event: string, _callback: Function) => { }
};
