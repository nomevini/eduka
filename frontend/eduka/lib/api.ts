type ApiRequestError = {
  message: string
  code?: string
  errors?: Record<string, string>
}

async function parseResponseBody(res: Response) {
  const contentType = res.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return res.json()
  }

  const text = await res.text()

  if (!text) {
    return null
  }

  return text
}

export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  })

  let data: unknown

  try {
    data = await parseResponseBody(res)
  } catch {
    throw {
      message: "Nao foi possivel processar a resposta do servidor",
      code: "INVALID_SERVER_RESPONSE",
    } satisfies ApiRequestError
  }

  if (!res.ok) {
    if (data && typeof data === "object") {
      throw data
    }

    throw {
      message:
        typeof data === "string" && data.trim()
          ? "O servidor retornou um erro inesperado"
          : "Nao foi possivel concluir a solicitacao",
      code: "UNEXPECTED_SERVER_ERROR",
    } satisfies ApiRequestError
  }

  return data as T
}
