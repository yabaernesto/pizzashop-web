import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import { 
  Table, 
  TableBody,
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { OrderTableRow } from './components/order-table-row'
import { OrderTableFilters } from './components/order-table-filters'
import { Pagination } from '@/components/pagination'

import { getOrders } from '@/api/get-orders'

export function Orders() {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  })

  return (
    <>
      <Helmet title='Pedidos' />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[64px]'></TableHead>
                  <TableHead className='w-[140px]'>Identificador</TableHead>
                  <TableHead className='w-[180px]'>Realizado há</TableHead>
                  <TableHead className='w-[140px]'>Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className='w-[140px]'>Total do pedido</TableHead>
                  <TableHead className='w-[164px]'></TableHead>
                  <TableHead className='w-[132px]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result && result.orders.map((order) => {
                  return <OrderTableRow key={order.orderId} order={order} />
                })}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={100} perPage={10} />
        </div>
      </div>
    </>
  )
}
