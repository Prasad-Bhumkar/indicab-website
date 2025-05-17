const _logger = {
    info: (_message: string, ..._args: any[]) => {
        console.info('[INFO]', _message, ..._args);
    },
    warn: (_message: string, ..._args: any[]) => {
        console.warn('[WARN]', _message, ..._args);
    },
    error: (_message: string, ..._args: any[]) => {
        console.error('[ERROR]', _message, ..._args);
    }
};

export default _logger;
