// [!file src/shared/lib/errors/apiError.ts]
/**
 * 自定义API错误类，用于在应用内部传递带有状态码的错误信息。
 */
export class ApiError extends Error {
    public readonly code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
    }
}