# Projeto PJC Desaparecidos
Aplicação desenvolvida como parte do processo seletivo do **Desenvolve MT 2025**, destinada à consulta pública de pessoas desaparecidas.

A interface foi construída em **Angular** com **Tailwind CSS** e **Angular Material**, consumindo dados fornecidos pela **Polícia Judiciária Civil de Mato Grosso (PJC-MT)**.

**Aplicação em produção:** [pjc-desaparecidos.vercel.app](https://pjc-desaparecidos.vercel.app)
---
## Dados do Candidato
- Nome: Matheus Henrique Aristimunha Lé
- Cargo: Desenvolvedor Júnior
- E-mail: matheushale@gmail.com
- Telefone: (65) 9 99614-5345
---
## Tecnologias Utilizadas
- Angular 18
- TypeScript 5.4.2
- Tailwind CSS 3.4.17
- Angular Material 18
- RxJS
- Node.js / NPM
- Docker
- API PJC-MT
---
## Funcionalidades
- Listagem paginada de pessoas desaparecidas
- Filtros por nome, idade, sexo e status
- Página de detalhes com foto, status, local e data do desaparecimento
- Formulário de envio de informações e upload de imagens
- Interface responsiva
- Rotas com Lazy Loading para otimizar o carregamento
- Tratamento de erros (404 e 500) com páginas dedicadas
---
## Instalação e Execução
### 1. Clonar o repositório
```bash
git clone https://github.com/matheus-dev28/pjc-desaparecidos.git
cd pjc-desaparecidos
```
### 2. Instalar dependências
```bash
npm install
```
### 3. Rodar em ambiente local
```bash
ng serve
```
Acesse em: http://localhost:4200

### 4. Rodar via Docker
Certifique-se de que o Docker está instalado e rodando.
```bash
docker build -t pjc-desaparecidos .
docker run -d -p 8080:80 pjc-desaparecidos
```
Acesse em: http://localhost:8080
