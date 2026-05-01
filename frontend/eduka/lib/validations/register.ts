"use client"

import { z } from "zod"

export const registerFormSchema = z
  .object({
    name: z.string().trim().min(1, "Informe seu nome completo"),
    email: z
      .string()
      .trim()
      .min(1, "Informe seu email")
      .email("Informe um email valido"),
    password: z
      .string()
      .min(1, "Informe uma senha")
      .min(8, "A senha precisa ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas nao coincidem",
    path: ["confirmPassword"],
  })

export type RegisterFormValues = z.infer<typeof registerFormSchema>

export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, string>
> & {
  form?: string
}

export function getRegisterFormValues(formData: FormData): RegisterFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirm-password") ?? ""),
  }
}

export function getRegisterFormErrors(
  result: z.ZodError<RegisterFormValues>
): RegisterFormErrors {
  const fieldErrors = result.flatten().fieldErrors

  return {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
    confirmPassword: fieldErrors.confirmPassword?.[0],
  }
}
