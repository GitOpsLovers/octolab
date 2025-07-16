/**
 * Email client interface
 */
export interface EmailClient {
    readonly key?: string | undefined;
    readonly apiKeys: any;
    readonly audiences: any;
    readonly batch: any;
    readonly broadcasts: any;
    readonly contacts: any;
    readonly domains: any;
    readonly emails: any;

    fetchRequest: <T>(
        path: string,
        options?: any,
    ) => Promise<{
        data: T | null;
        error: any | null;
    }>;
    post: <T>(
        path: string,
        entity?: unknown,
        options?: any & any,
    ) => Promise<{
        data: T | null;
        error: any | null;
    }>;
    get: <T>(
        path: string,
        options?: any,
    ) => Promise<{
        data: T | null;
        error: any | null;
    }>;
    put: <T>(
        path: string,
        entity: unknown,
        options?: any,
    ) => Promise<{
        data: T | null;
        error: any | null;
    }>;
    patch: <T>(
        path: string,
        entity: unknown,
        options?: any,
    ) => Promise<{
        data: T | null;
        error: any | null;
    }>;
    delete: <T>(
        path: string,
        query?: unknown,
    ) => Promise<{
        data: T | null;
        error: any | null;
    }>;
}
