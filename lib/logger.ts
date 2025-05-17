class Logger {
    info(_message: string, ..._optionalParams: any[]) {
        console.info(`[INFO] ${_message}`, ..._optionalParams);
    }

    warn(_message: string, ..._optionalParams: any[]) {
        console.warn(`[WARN] ${_message}`, ..._optionalParams);
    }

    error(_message: string, ..._optionalParams: any[]) {
        console.error(`[ERROR] ${_message}`, ..._optionalParams);
    }
}

const _logger = new Logger();
export default _logger;
