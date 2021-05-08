# VidBits TAT

Aplicação exemplo para o programa de mentoria em testes automatizados com Cypress.

⚠️ **Este projeto foi descontinuado.** ⚠️

## Pre-requisitos

- [git](https://git-scm.com/downloads)
- [mongoDB](https://www.mongodb.com/download-center)
- [Node.js](https://nodejs.org/en/) (versão 8)

> Para verificar a versão do Node.js instalada em seu computador, execute o comando `node -v`. Você deve ver algo como v8.12.0. Se você não tiver o Node.js instalado, utilize o link acima para baixá-lo e instalá-lo.

## Instalação

Execute `npm i` para instalar a dependências do projeto e de desenvolvimento.

## Instalando e inicializando o banco de dados

Siga as instruções [deste arquivo](./MONGODB_INSTALLATION.md) para instalar e inicilizar o banco de dados.

## Inicializando a aplicação

Execute `npm start` para inicializar a aplicação.

> Apõs inicializada a aplicação deve estar acessível no navegador através da seguinte URL: http://localhost:4001.

## Executando os testes

Testes _end to end_ escritos com o framework [Cypress](https://cypress.io) estão disponíveis para esta aplicação.

### Modo interativo

Execute `npx cypress open` para rodar os testes em modo interativo.

### Modo headless

Execute `npm t` para rodar os testes em modo _headless_.

___

Feito com 💚 por [Walmyr Filho](http://walmyr-filho.com)
