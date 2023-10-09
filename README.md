## Produto 2 Layback: 

Demo minimalista de um cliente para interagir com o servidor oAuth2 (construído nos moldes do RFC 6749 https://datatracker.ietf.org/doc/html/rfc6749) que possui a funcionalidade de login e logout, e mostra as informações da conta do cliente na página principal. 

## Dependencies

You must have the following programs installed on your machine in order to run this app:

##### docker
##### docker-compose
##### npm
##### nodejs

## Installation

Da pasta root, escreva o seguinte comando:

```
  make install
```
Depois disso, rode a aplicação em modo de desenvolvimento com:

```
  npm run dev
```

Para reiniciar a base de dados:

```
  make restart-database
```
Para apagar todos os dados da base de dados:
```
  docker images
  docker rmi -f <docker-image-name>
```
É necessário criar um .env com as seguintes variáveis:

```
DATABASE_URL=postgresql://postgres:senha@localhost:8083/basededados

NEXTAUTH_URL=http://64.176.3.252:3002
PUBLIC_CONTALAYBACK_URL=http://64.176.3.252:3000
SECRET=product2
CONTALAYBACK_SECRET=contalayback
NEXTAUTH_SECRET=product2
```
No ambiente de desenvolvimento basta utilizar o localhost no lugar do IP público.
