import { ArrowRight, Search, X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { OrderStatus } from '@/components/order-status'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { OrderDetails } from './order-details'

import { cancelOrder } from '@/api/cancel-order'
import { approveOrder } from '@/api/approve-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import type { GetOrdersResponse } from '@/api/get-orders'

interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"]
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
            
          return order
        })
      })
    })
  }

  const { 
    mutateAsync: cancelOrderFn, 
    isPending: isCancelingOrder 
  } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "canceled")
    },
  })

  const { 
    mutateAsync: approveOrderFn, 
    isPending: isApproveOrder 
  } = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "processing")
    },
  })

  const {
    mutateAsync: dispatchOrderFn, 
    isPending: isDispatchingOrder
  } = useMutation({
    mutationFn: dispatchOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "delivering")
    },
  })

  const { 
    mutateAsync: deliverOrderFn,
    isPending: isDeliveringOrder
  } = useMutation({
    mutationFn: deliverOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "delivered")
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className='h-3 w-3' />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className='text-xs font-mono font-medium'>
        {order.orderId}
      </TableCell>
      <TableCell className='text-muted-foreground'>
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className='font-medium'>
        {order.customerName}
      </TableCell>
      <TableCell className='font-medium'>
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>

        {order.status === "pending" && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApproveOrder}
            variant="outline" 
            className='cursor-pointer'
          >
          <ArrowRight className='h-3 w-3 mr-2' />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
            variant="outline" 
            className='cursor-pointer'
          >
          <ArrowRight className='h-3 w-3 mr-2' />
            Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
            variant="outline" 
            className='cursor-pointer'
          >
          <ArrowRight className='h-3 w-3 mr-2' />
            Entregue
          </Button>
        )}

      </TableCell>
      <TableCell>
        <Button 
          variant="ghost" 
          className='cursor-pointer'
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className='h-3 w-3 mr-2' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
