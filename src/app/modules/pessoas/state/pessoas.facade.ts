import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { PessoasService } from '../api/pessoas.service';
import { IPessoa, IPessoaFiltro } from '../models/pessoa.model';
import { IPaginacao } from '../models/paginacao.model';
import { IEstatistica } from '../models/estatistica.model';

@Injectable({ providedIn: 'root' })
export class PessoasFacade {
  private _pessoas$ = new BehaviorSubject<IPaginacao<IPessoa> | null>(null);
  private _estatistica$ = new BehaviorSubject<IEstatistica | null>(null);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<string | null>(null);

  private _params$ = new BehaviorSubject<IPessoaFiltro>({
    pagina: 0,
    porPagina: 12,
    status: 'DESAPARECIDO',
  });

  pessoas$ = this._pessoas$.asObservable();
  estatistica$ = this._estatistica$.asObservable();
  loading$ = this._loading$.asObservable();
  error$ = this._error$.asObservable();

  constructor(private service: PessoasService) {
    this._params$
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap(() => {
          this._error$.next(null);
          this._loading$.next(true);
        }),
        switchMap((params) =>
          this.service.getPessoas(params).pipe(
            tap((page) => this._pessoas$.next(page)),
            catchError(() => {
              this._error$.next('Erro ao carregar pessoas');
              return of(null);
            }),
            finalize(() => this._loading$.next(false))
          )
        )
      )
      .subscribe();
  }

  setParams(p: Partial<IPessoaFiltro>) {
    const cur = this._params$.value;
    this._params$.next({ ...cur, ...p });
  }

  loadEstatistica() {
    this._error$.next(null);
    this.service.getEstatistica().subscribe({
      next: (stats) => this._estatistica$.next(stats),
      error: () => this._error$.next('Erro ao carregar estatísticas'),
    });
  }

  getPessoaById(id: string | number) {
    return this.service.getPessoaById(id);
  }
}
