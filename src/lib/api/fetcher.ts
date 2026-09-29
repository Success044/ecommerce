export class ApiError extends Error {
  readonly status?: number;

  constructor(
    message: string,
    options: { status?: number; cause?: unknown } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "ApiError";
    this.status = options.status;
  }
}

export async function fetcher(
  url: string,
  options: RequestInit = {},
): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(url, {
      cache: "no-store",
      ...options,
      signal: options.signal ?? AbortSignal.timeout(10_000),
    });
  } catch (cause) {
    throw new ApiError("Unable to reach the store. Please try again.", {
      cause,
    });
  }

  if (!response.ok) {
    throw new ApiError("Unable to load store data. Please try again.", {
      status: response.status,
    });
  }

  try {
    return await response.json();
  } catch (cause) {
    throw new ApiError("The store returned an invalid response. Please try again.", {
      status: response.status,
      cause,
    });
  }
}
