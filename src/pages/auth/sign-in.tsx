import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { useMutation } from '@tanstack/react-query'

import { signIn } from '@/api/sign-in'

const signInForm = z.object({
  email: z.email('E-mail inválido'),
})

// infer converte a estrutura do zod para a de TS
type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? ''
    }
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email })

      toast.success(`Enviamos um link de autenticação para seu e-mail ${data.email}`, {
        action: {
          label: 'Reenviar',
          onClick: () => {
            handleSignIn(data)
          }
        }
      })
    } catch {
      toast.error('Credenciais invalidos.')
    }
  }
  
  return (
    <>
      <Helmet title='Login'/>
      <div className="p-8">
        <Button variant="ghost" className='absolute right-8 top-8'>
          <Link to="/sign-up">
            Novo estabelecimento
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className='text-sm text-muted-foreground'>
              Acompanhe suas vendas pelo painel de parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input type='email' {...register('email')} id='email' />
            </div>

            <Button disabled={isSubmitting} type='submit' className='w-full cursor-pointer'>
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
