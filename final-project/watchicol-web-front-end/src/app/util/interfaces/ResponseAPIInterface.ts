export interface ResponseAPIInterface<T> {
  status: string;
  data?: T;
  error?: string;
  httpStatusCodeError?: number;
  errorDescription?: string;
}
