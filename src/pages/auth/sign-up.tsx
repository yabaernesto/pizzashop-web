import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.email(),
})

// infer converte a estrutura do zod para a de TS
type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

  const navigate = useNavigate()

  async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(data)
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        }
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }
  
  return (
    <>
      <Helmet title='Cadastro'/>
      <div className="p-8">
        <Button variant="ghost" className='absolute right-8 top-8'>
          <Link to="/sign-in">
            Fazer login
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className='text-sm text-muted-foreground'>
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
              <Input 
                type='text'
                id='restaurantName'
                {...register('restaurantName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor='managerName'>Seu nome</Label>
              <Input 
                type='text'
                id='managerName'
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input 
                type='text'
                id='email'
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor='email'>Seu celular</Label>
              <Input
                type='tel'
                id='phone'
                {...register('phone')}
              />
            </div>

            <Button disabled={isSubmitting} type='submit' className='w-full cursor-pointer'>
              Finalizar cadastro
            </Button>

            <div className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com os nossos 
              <a href="" className='underline underline-offset-4'>
                termos e serviços
              </a>{' '}
              e <a href="" className='underline underline-offset-4'>
                política de privacidade
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
