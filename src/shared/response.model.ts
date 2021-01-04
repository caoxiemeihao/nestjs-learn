export class ResponseModel<D = any> {
  constructor(
    public success: boolean,
    public data: D,
    public code: number,
    public message: string,
  ) {}
}

export class SuccessModel<D = any> extends ResponseModel<D> {
  constructor(arg0?: { data?: D; code?: number; message?: string }) {
    const { data = null, code = 0, message = '成功' } = arg0 || ({} as any);
    super(true, data, code, message);
  }
}

export class ErrorModel<D = any> extends ResponseModel<D> {
  constructor(arg0?: { data?: D; code?: number; message?: string }) {
    const { data = null, code = -1, message = '失败' } = arg0 || ({} as any);
    super(false, data, code, message);
  }
}
