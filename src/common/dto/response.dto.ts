export class ResponseDto<T> {
  status: number;
  message: string;
  data: T;
  constructor(data?: T) {
    this.status = data ? 200 : 400;
    this.message = data ? 'success' : 'failed';
    this.data = data;
  }
}
