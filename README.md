## 💻 Projeto

O Video Rental Manager é uma plataforma simples e intuitiva para que você Gerenciar sua locadora.

## Funcionalidades

- Tela de usuário nessa tela você terá as seguintes funcionalidades: 📦
  - Criar um usuário quando aperta no botão "adicionar"
  - Editar o usuário ao selecionar ele na tabela
  - Fazer um "soft delete" ao editar e inativar um usuário
    
- Tela de clientes nessa tela você terá as seguintes funcionalidade:📦
  - Criar um cliente quando aperta no botão "adicionar"
  - Editar o cliente ao selecionar ele na tabela
  - Fazer um "soft delete" ao editar inativar um cliente
  - Também é possível fazer filtro pelo nome do cliente, documento e status
  - Ao dar reload na página os filtros não são perdidos
 
- Tela de filmes nessa tela você terá as seguintes funcionalidade: 📦
  - Filtrar os filmes por nomes e ano
  - Você também pode alugar um filme ao selecionar ele na tabela
  
- Tela de alocações nessa tela você terá as seguintes funcionalidade: 📦
  - Você conseguirá filtrar por nome do cliente 
  - Você conseguirá filtrar pela data de alocação, retornando todos os dados que tem a data de locação escolhida
  - Você conseguirá filtrar pela data de entrega, retornando todos os dados que tem a data de entregra escolhida


## 📥 Instalando o Projeto

### Opção 1:

- Acesse a url: https://joao-souza-costa.github.io/locadora-test/#/
- Usuário ativo: 
    - login: joao.souza@example.com
    - senha: 123456789
    
- Usuário inativo: 
    - login: alice.souza@example.com
    - senha: 123456789


### Opção 2:

#### Pré-requisitos

- Para usar esta opção é necessário ter o docker instalado em seu computador
  - [Windows](https://docs.docker.com/windows/started)
  - [MAC](https://docs.docker.com/mac/started/)
  - [Linux](https://docs.docker.com/linux/started/)

#### Etapas

- Após a instalação do docker siga as seguintes instruções: 
  - Faça um clone do projeto para o seu diretório
  - Dentro do diretório crie o arquivo `.env` na raíz do projeto e adicione as variáveis necessárias como mostra no arquivo de exemplo: `.env.example`;
  - Digite o comando `docker-compose -up` no terminal 
  - Após a criação do container copie e cole a url fornecida em seu navegador de preferencia
  
- Usuarios para uso da aplicação
  - ativo: 
    - login: joao.souza@example.com
    - senha: 123456789
    
  - inativo: 
    - login: alice.souza@example.com
    - senha: 123456789

### Opção 3:

#### Pré-requisitos

- Node **(preferência na versão v18.16.0 ou maior)**
   - [Node.js](https://nodejs.org/en/download/)
   
#### Etapas

- Após a instalação do node.js siga as seguintes instruções: 
  - Faça um clone do projeto para o seu diretório
  - Dentro do diretório crie o arquivo `.env` na raíz do projeto e adicione as variáveis necessárias como mostra no arquivo de exemplo: `.env.example`;
  - Digite o comando `yarn` ou `npm install` para instalar as dependencias
  - Digite o comando de build `yarn dev` ou `npm run dev` para rodar o projeto
  - Copie e cole a url fornecida em seu navegador de preferencia

- Usuarios para uso da aplicação
  - ativo: 
    - login: joao.souza@example.com
    - senha: 123456789
    
  - inativo: 
    - login: alice.souza@example.com
    - senha: 123456789

