declare namespace error {
  export interface ResponseError extends Error {
    status?: number;
    message: string;
  }
}

export = error;
