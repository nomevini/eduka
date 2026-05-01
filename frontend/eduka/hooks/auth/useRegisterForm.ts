"use client"

import { apiRequest } from "@/lib/api"
import { parseApiError } from "@/lib/api-error"
import {
  getRegisterFormErrors,
  getRegisterFormValues,
  registerFormSchema,
  type RegisterFormErrors,
  type RegisterFormValues,
} from "@/lib/validations/register"
import { useState } from "react"

export function useRegisterForm() {
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function clearFieldError(field: keyof RegisterFormValues | "form") {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors
      }

      return {
        ...currentErrors,
        [field]: undefined,
      }
    })
  }

  async function submit(data: RegisterFormValues) {
    setIsSubmitting(true)
    setErrors({})

    try {
      await apiRequest("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      return { success: true }
    } catch (err) {
      const message = parseApiError(err)

      setErrors({ form: message })

      return { success: false, message }
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const values = getRegisterFormValues(formData)
    const validationResult = registerFormSchema.safeParse(values)

    if (!validationResult.success) {
      setErrors(getRegisterFormErrors(validationResult.error))
      return { success: false as const }
    }

    return submit(validationResult.data)
  }

  return {
    clearFieldError,
    errors,
    handleSubmit,
    isSubmitting,
    setErrors,
  }
}
