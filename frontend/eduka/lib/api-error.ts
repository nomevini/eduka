export type ApiError = {
  message?: string
  code?: string
  errors?: Record<string, string>
}

export function parseApiError(err: unknown): string {
  if (err instanceof SyntaxError) {
    return "Resposta invalida do servidor"
  }

  const error = err as ApiError

  if (err instanceof Error && !error?.message) {
    return "Erro inesperado"
  }

  if (error?.errors) {
    return Object.values(error.errors)[0]
  }

  switch (error?.code) {
    case "EMAIL_ALREADY_EXISTS":
      return "Esse email já está em uso"

    case "WEAK_PASSWORD":
      return "Senha muito fraca"

    case "INVALID_SERVER_RESPONSE":
      return "Resposta invalida do servidor"

    case "UNEXPECTED_SERVER_ERROR":
      return "Ocorreu um erro inesperado no servidor"
  }

  return error?.message || "Erro inesperado"
}
