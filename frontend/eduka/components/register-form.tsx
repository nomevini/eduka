"use client"

import { Button } from "@/components/ui/button"
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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRegisterForm } from "@/hooks/auth/useRegisterForm"
import { cn } from "@/lib/utils"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { clearFieldError, errors, handleSubmit, isSubmitting } =
    useRegisterForm()

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crie sua conta</CardTitle>
          <CardDescription>Cadastre-se com sua conta do Google</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" disabled={isSubmitting}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Cadastrar com Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou cadastre-se com
              </FieldSeparator>
              <Field data-invalid={!!errors.form}>
                <FieldError>{errors.form}</FieldError>
              </Field>
              <FieldGroup>
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    aria-invalid={errors.name ? true : undefined}
                    onChange={() => clearFieldError("name")}
                    disabled={isSubmitting}
                  />
                  <FieldError>{errors.name}</FieldError>
                </Field>
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="voce@exemplo.com"
                    aria-invalid={errors.email ? true : undefined}
                    onChange={() => clearFieldError("email")}
                    disabled={isSubmitting}
                  />
                  <FieldError>{errors.email}</FieldError>
                </Field>
                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    aria-invalid={errors.password ? true : undefined}
                    onChange={() => clearFieldError("password")}
                    disabled={isSubmitting}
                  />
                  <FieldError>{errors.password}</FieldError>
                </Field>
                <Field data-invalid={!!errors.confirmPassword}>
                  <FieldLabel htmlFor="confirm-password">
                    Confirmar senha
                  </FieldLabel>
                  <Input
                    name="confirm-password"
                    id="confirm-password"
                    type="password"
                    aria-invalid={errors.confirmPassword ? true : undefined}
                    onChange={() => clearFieldError("confirmPassword")}
                    disabled={isSubmitting}
                  />
                  <FieldError>{errors.confirmPassword}</FieldError>
                </Field>
              </FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Criando conta..." : "Criar conta"}
                </Button>
                <FieldDescription className="text-center">
                  Ja tem uma conta? <a href="/auth/login">Entrar</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Ao criar sua conta, voce concorda com nossos{" "}
        <a href="#">Termos de Uso</a> e <a href="#">Politica de Privacidade</a>.
      </FieldDescription>
    </div>
  )
}
