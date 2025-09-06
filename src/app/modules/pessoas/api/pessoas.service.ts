// pessoas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaginacao } from '../models/paginacao.model';
import { IEstatistica } from '../models/estatistica.model';
import { IPessoa, IPessoaFiltro } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class PessoasService {
  private base = 'https://abitus-api.geia.vip';

  constructor(private http: HttpClient) {}

  getPessoas(params: IPessoaFiltro): Observable<IPaginacao<IPessoa>> {
    const httpParams = new HttpParams({
      fromObject: {
        nome: params.nome ?? '',
        faixaIdadeInicial: params.faixaIdadeInicial?.toString() ?? '',
        faixaIdadeFinal: params.faixaIdadeFinal?.toString() ?? '',
        sexo: params.sexo ?? '',
        status: params.status ?? '',
        pagina: String(params.pagina ?? 0),
        porPagina: String(params.porPagina ?? 12),
      },
    });

    return this.http.get<IPaginacao<IPessoa>>(
      `${this.base}/v1/pessoas/aberto/filtro`,
      { params: httpParams }
    );
  }

  getPessoaById(id: string | number): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.base}/v1/pessoas/${id}`);
  }

  getEstatistica(): Observable<IEstatistica> {
    return this.http.get<IEstatistica>(`${this.base}/v1/pessoas/aberto/estatistico`);
  }
}
