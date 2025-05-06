import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from './ui/button';

export interface PaginationProps {
  // pagina atual
  pageIndex: number;
  // numero total de registro
  totalCount: number;
  // numero de registro por pagina
  perPage: number;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Pagina {pageIndex + 1} de {pages}{' '}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-4 w-4 cursor-pointer p-3">
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira pagina</span>
          </Button>
          <Button variant="outline" className="h-4 w-4 cursor-pointer p-3">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Pagina anterior</span>
          </Button>
          <Button variant="outline" className="h-4 w-4 cursor-pointer p-3">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Proxima pagina</span>
          </Button>
          <Button variant="outline" className="h-4 w-4 cursor-pointer p-3">
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Ultima pagina</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
