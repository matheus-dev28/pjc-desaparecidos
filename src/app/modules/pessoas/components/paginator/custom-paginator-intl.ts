import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPortuguesePaginatorIntl() {
  const p = new MatPaginatorIntl();
  p.itemsPerPageLabel = 'Itens por página:';
  p.nextPageLabel = 'Próxima página';
  p.previousPageLabel = 'Página anterior';
  p.firstPageLabel = 'Primeira página';
  p.lastPageLabel = 'Última página';
  p.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) return `0 de ${length}`;
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };
  return p;
}
