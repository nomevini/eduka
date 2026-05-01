"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSent, setHasSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()

    if (!email) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 600))

    setSubmittedEmail(email)
    setHasSent(true)
    setIsSubmitting(false)

    toast.success("Email de recuperacao enviado com sucesso.")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {hasSent ? "Verifique seu email" : "Recuperar acesso"}
          </CardTitle>
          <CardDescription>
            {hasSent
              ? "Enviamos um link de redefinicao para o email informado."
              : "Informe seu email para receber o link de redefinicao de senha."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {hasSent ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">{submittedEmail}</p>
                <p className="text-sm text-muted-foreground">
                  Se esse email estiver cadastrado, voce recebera as instrucoes
                  para redefinir sua senha em instantes.
                </p>
              </div>
              <Link
                className={buttonVariants({
                  className: "w-full",
                  variant: "outline",
                })}
                href="/auth/login"
              >
                Voltar ao login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    required
                    disabled={isSubmitting}
                  />
                  <FieldDescription>
                    Enviaremos as instrucoes para esse endereco.
                  </FieldDescription>
                </Field>

                <Field>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Enviando..."
                      : "Enviar link de recuperacao"}
                  </Button>
                  <FieldDescription className="text-center">
                    Lembrou sua senha? <Link href="/auth/login">Entrar</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
