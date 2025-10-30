import axiosInstance from "../config";

export async function postRequest<T>(endpoint: string, body?: unknown) {
  const response = await axiosInstance.post(`${endpoint}`, body, {
    method: "POST",
  });

  return response.data as T;

  /*try {
    const response = await axiosInstance.post(`${endpoint}`, body, {
      method: "POST",
    });
    return response.data as T;
  } catch (e) {
    const axiosError = e as AxiosError;
    switch (axiosError.status) {
      case ErrorType.CONFLICT:
        throw new CustomError("Resource conflicts", ErrorType.CONFLICT);
      case ErrorType.FORBIDDEN:
        throw new CustomError(
          "You are not authorized to access the resource",
          ErrorType.FORBIDDEN
        );
      case ErrorType.NOT_FOUND:
        throw new CustomError("Resource not found!", ErrorType.NOT_FOUND);
      case ErrorType.UNAUTHENTICATED:
        throw new CustomError(
          "You are not authenticated",
          ErrorType.UNAUTHENTICATED
        );
      default:
        throw new CustomError("Bad request", ErrorType.BAD_REQUEST);
    }
  }*/
}
