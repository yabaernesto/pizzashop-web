import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function OrderTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="font-semibold text-sm">Filtros</span>
      <Input className="h-8 w-auto" placeholder="ID do pedido" />
      <Input className="h-8 w-[320px]" placeholder="Nome do cliente" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button
        className="cursor-pointer"
        size="xs"
        type="submit"
        variant="secondary"
      >
        <Search className="rm-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        className="cursor-pointer"
        size="xs"
        type="button"
        variant="outline"
      >
        <X className="rm-2 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
