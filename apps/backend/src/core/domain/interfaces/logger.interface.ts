/**
 * Application logger
 */
export interface AppLogger {
    info: (message: string, label: string) => void;
    warn: (message: string, label: string) => void;
    error: (message: string, label: string) => void;
    debug: (message: string, label: string) => void;
}
