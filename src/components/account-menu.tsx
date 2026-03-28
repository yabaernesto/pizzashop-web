import { Building, ChevronDown, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";

import { signOut } from "@/api/sign-out";
import { getProfile } from "@/api/get-profile";
import { StoreProfileDialog } from "./store-profile-dialog";
import { getManagerRestaurant } from "@/api/get-managed-restaurant";

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    // a cada 1s essa informação vai se considerar obsoleta e atualizar com os dados da api
    // staleTime: 1000,
    // nao recarregar mesmo se o usuário der foco no navegador
    staleTime: Infinity
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagerRestaurant,
    // a cada 1s essa informação vai se considerar obsoleta e atualizar com os dados da api
    // staleTime: 1000,
    // nao recarregar mesmo se o usuário der foco no navegador
    staleTime: Infinity
  })

  const { mutateAsync: handleSingOut, isPending: isSignOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    }
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 select-none">
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingProfile ? (
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <>
              <span>{profile?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profile?.email}
              </span>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DialogTrigger asChild>
          <DropdownMenuItem className="cursor-pointer">
            <Building className="h-4 w-4 mr-2" />
            <span>Perfil da loja</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem 
          className="text-rose-500 dark:text-rose-400" 
          disabled={isSignOut}
        >
          <Button className="w-full flex justify-start cursor-pointer" onClick={() => handleSingOut}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Sair</span>
          </Button>
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  )
}
