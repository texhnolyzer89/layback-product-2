## Produto 1 Layback: 

Demo minimalista de um cliente para interagir com o servidor oAuth2 (construído nos moldes do RFC 6749 https://datatracker.ietf.org/doc/html/rfc6749) que possui a funcionalidade de login e logout. 

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
DATABASE_URL=postgresql://postgres:senha@localhost:8082/basedados

NEXTAUTH_URL=http://64.176.3.252:3001
PUBLIC_CONTALAYBACK_URL=http://64.176.3.252:3000
SECRET=product1
CONTALAYBACK_SECRET=contalayback
NEXTAUTH_SECRET=product1
```
No ambiente de desenvolvimento basta utilizar o localhost no lugar do IP público.
