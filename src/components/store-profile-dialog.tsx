import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from 'zod'

import { Button } from "./ui/button";
import { 
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import { getManagerRestaurant, type GetManagerRestaurantResponse } from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagerRestaurant,
    // a cada 1s essa informação vai se considerar obsoleta e atualizar com os dados da api
    // staleTime: 1000,
    // nao recarregar mesmo se o usuário der foco no navegador
    staleTime: Infinity
  })

  function updatedManagedRestaurantCached({ name, description }: StoreProfileSchema) {
    // cache da request
      const cached = queryClient.getQueryData<GetManagerRestaurantResponse>(['managed-restaurant'])

      if (cached) {
        // atualizar cache da request
        queryClient.setQueryData<GetManagerRestaurantResponse>(['managed-restaurant'], {
          ...cached,
          name,
          description
        })
      }

      return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updatedManagedRestaurantCached({ name, description })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updatedManagedRestaurantCached(context.previousProfile)
      }
    },
  })

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? ''
    }
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description ?? ""
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil. Tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize ás informações do seu estabelecimento visível ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">Nome</Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">Descrição</Label>
            <Textarea className="col-span-3" id="description" {...register('description')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}