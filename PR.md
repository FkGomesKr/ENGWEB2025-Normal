# Exame Eurovision - LEI 2024/2025

## 1. Introdução

Nesta exame foi desenvolvida uma aplicação web que permite consultar informações sobre edições da Eurivsão, países participantes, vencedores e organizadores, bem como os intérpretes e músicas associadas. A aplicação é composta por uma rest API e um frontend para visualização dos dados.

---

## 2. Persistência de Dados

Para persistir os dados, utilizou-se a base de dados **MongoDB**, depois de copiar o dataset **eurovisao_modified.json** e importá-lo através dos comandos:
```bash
docker cp eurovisao_modified.json mongoEW:/tmp
mongoimport -d eurovisao -c edicoes /tmp/eurovisao_modified.json --jsonArray
```

### 2.1 Modelos Mongoose

O modelo principal utilizado é o `edicoes`, definido com o **Mongoose** para persistir os dados no MongoDB.

#### Esquema de Música (`musicaSchema`)

Cada música tem o seguinte formato:

- `id` (String): Identificador único da música (não usado como _id do documento)
- `link` (String): URL para a música ou vídeo
- `título` (String): Nome da música
- `país` (String): País que a música representa
- `compositor` (String): Nome do compositor
- `intérprete` (String): Nome do intérprete
- `letra` (String): Letra da música

O schema de música é definido com `{ _id: false }` para que as músicas sejam subdocumentos sem identificador próprio no array.

#### Esquema de Edição (`edicoesSchema`)

Cada edição tem os seguintes campos:

- `_id` (String): Identificador da edição (exemplo: "ed1966")
- `anoEdição` (String): Ano da edição (exemplo: "1966")
- `musicas` (Array de `musicaSchema`): Lista das músicas participantes nesta edição
- `organizacao` (String): País organizador da edição
- `vencedor` (String): País vencedor da edição

O schema está definido sem a chave `versionKey` (não grava o campo `__v`).

Este modelo permite armazenar toda a informação da edição numa única coleção, facilitando consultas e atualizações.

---

## 3. Setup da Base de Dados

Para configurar a base de dados MongoDB, seguiu-se o seguinte:

Antes de estabelecer a ligação à base de dados, foi importado um ficheiro JSON contendo os dados das edições da Eurovisão para a base de dados **MongoDB** como já anteriormente referido.

### Conexão ao MongoDB

A aplicação **Node.js** utilizou o Mongoose para estabelecer ligação ao container onde está a base de dados **MongoDB**. A conexão é feita através da seguinte configuração:

```js
var mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1:27017/eurovisao';
mongoose.connect(mongoDB);
var connection = mongoose.connection
connection.on('error', console.error.bind(console, 'Erro na conexão ao mongoDB'));
connection.once('open', () => console.log('Conexão realizada com sucesso'));
```

## 4. REST API

Para dar resposta aos requisitos do projeto, foi desenvolvida uma REST API que expõe várias rotas para manipulação e consulta dos dados das edições da Eurovisão, países e intérpretes. A API está configurada para ouvir na porta 25000.

### Estrutura da API

A API foi organizada utilizando controladores para separar a lógica de negócio do routing. Cada grupo de funcionalidades relacionadas está encapsulado num controlador próprio, melhorando a manutenção e a clareza do código.

### Rotas implementadas

- `GET /edicoes`  
  Retorna uma lista com todas as edições, incluindo os campos: `anoEdição`, `organizador` e `vencedor`.

- `GET /edicoes/:id`  
  Devolve toda a informação detalhada da edição com o identificador `id`.

- `GET /edicoes?org=EEEE`  
  Retorna a lista das edições organizadas pelo país `EEEE`, com os campos: `anoEdição`, `organizador` e `vencedor`.

- `POST /edicoes`  
  Acrescenta um novo registo de edição à base de dados, recebendo os dados da nova edição no corpo da requisição.

- `PUT /edicoes/:id`  
  Atualiza os dados da edição identificada por `id` com as informações fornecidas no corpo da requisição.

- `DELETE /edicoes/:id`  
  Elimina da base de dados o registo correspondente à edição com o identificador `id`.

- `GET /paises?papel=org`  
  Devolve a lista de países organizadores, ordenada alfabeticamente e sem repetições, apresentando pares com o nome do país e a lista dos anos em que organizou edições.

- `GET /paises?papel=venc`  
  Devolve a lista de países vencedores, ordenada alfabeticamente e sem repetições, apresentando pares com o nome do país e a lista dos anos em que venceu.

- `GET /interpretes`  
  Lista os intérpretes, incluindo o nome e o país que representaram, ordenada alfabeticamente e sem repetições.

### Utilização de Controladores

Para melhor modularização e organização do código foram utilizados:

- **Controladores** contêm a lógica para interagir com a base de dados **MongoDB** usando **Mongoose**, processar os dados e montar as respostas.  
- **Roteadores (routers)** definem as rotas HTTP e delegam para os controladores as operações específicas.

Este padrão permite manter o código limpo, facilitar testes e eventuais expansões da aplicação.

### Tecnologias e Técnicas

- A base de dados MongoDB é acessada através do ODM Mongoose (models).  
- Agregações MongoDB são usadas para operações como agrupar países organizadores ou vencedores e eliminar duplicados.  
- A API segue os princípios REST, utilizando os termos HTTP adequados (GET, POST, PUT, DELETE).  
- Erros são tratados e retornados com os códigos HTTP apropriados.

---

Este design garante uma API robusta, organizada e extensível, adequada às necessidades do projeto Eurovisão.

## 5. Frontend

O frontend está implementado com **Express + Pug** como motor de templates, e utiliza **axios** para consumir a API que faz a "ponte" com a base de dados **MongoDB**.

### 5.1 Páginas principais

- **Página principal (`/`)**: Lista as edições da Eurovisão numa tabela, com links para as páginas individuais das edições e países.
- **Página da edição (`/:id`)**: Mostra detalhes da edição, incluindo as músicas e intérpretes.
- **Página do país (`/paises/:pais`)**: Mostra as edições em que o país participou e organizou.

O estilo visual utiliza a stylesheet **W3.CSS** para tornar a interface mais agradável.

---

## 6. Execução

Foi incluído o módulo **nodemon** portanto as aplicações tanto podem ser executdas com **npm start** como com **npm run dev**.
