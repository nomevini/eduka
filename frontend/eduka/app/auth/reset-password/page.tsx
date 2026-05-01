import { ArrowLeft, BookCopy, LockKeyhole } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ResetPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted px-6 py-10 md:px-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookCopy className="size-4" />
          </div>
          Eduka
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LockKeyhole className="size-5" />
            </div>
            <CardTitle className="text-xl">Redefinir senha</CardTitle>
            <CardDescription>
              Digite sua nova senha para concluir a recuperacao da conta.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">Nova senha</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Digite sua nova senha"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirmar senha
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="Repita sua nova senha"
                    required
                  />
                  <FieldDescription>
                    Use pelo menos 8 caracteres.
                  </FieldDescription>
                </Field>

                <Button type="submit">Salvar nova senha</Button>
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <Link
              href="/auth/login"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              <ArrowLeft className="size-4" />
              Voltar ao login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
