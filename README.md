## 💻 Projeto

Video Rental Manager is a simple and intuitive platform for you to manage your rental company.

## Functionalities

- User screen on this screen you will have the following features: 📦
  - Create a user when you press the "add" button
  - Edit the user by selecting him in the table
  - Perform a "soft delete" when editing and inactivating a user
    
- Customers screen on this screen you will have the following functionality:📦
  - Create a client when you press the "add" button
  - Edit the customer by selecting them in the table
  - Perform a "soft delete" when editing to inactivate a client
  - It is also possible to filter by customer name, document and status
  - When reloading the page, the filters are not lost
 
- Movie screen on this screen you will have the following functionality: 📦
  - Filter films by name and year
  - You can also rent a movie by selecting it in the table
  
- Allocations screen on this screen you will have the following functionality: 📦
  - You will be able to filter by customer name
  - You will be able to filter by the allocation date, returning all data that has the chosen rental date
  - You will be able to filter by delivery date, returning all data that has the chosen delivery date

## 📥 Installing the Project

### Option 1:

- Access the url: https://joao-souza-costa.github.io/locadora-test/#/
  
- Active user: 
    - login: joao.souza@example.com
    - senha: 123456789
    
- Inactive User  
    - login: alice.souza@example.com
    - senha: 123456789


### Option 2:

#### Prerequisites

- To use this option you must have Docker installed on your computer.q
  - [Windows](https://docs.docker.com/windows/started)
  - [MAC](https://docs.docker.com/mac/started/)
  - [Linux](https://docs.docker.com/linux/started/)

#### Etapas

- After installing docker, follow the following instructions:
  - Clone the project to your directory
  - Inside the directory, create the `.env` file at the root of the project and add the necessary variables as shown in the example file: `.env.example`;
  - Enter the command `docker-compose -up` in the terminal
  - After creating the container, copy and paste the URL provided into your preferred browser

- Users
   - Active user: 
    - login: joao.souza@example.com
    - senha: 123456789
    
- Inactive User  
    - login: alice.souza@example.com
    - senha: 123456789

### Option 3:

#### Prerequisites

- Node **(preferably version v18.16.0 or higher)**
   - [Node.js](https://nodejs.org/en/download/)
   
#### Etapas

- After installing node.js, follow the following instructions:
  - Clone the project to your directory
  - Inside the directory, create the `.env` file at the root of the project and add the necessary variables as shown in the example file: `.env.example`;
  - Type the command `yarn` or `npm install` to install the dependencies
  - Enter the build command `yarn dev` or `npm run dev` to run the project
  - Copy and paste the URL provided into your preferred browser

- Users
   - Active user: 
    - login: joao.souza@example.com
    - senha: 123456789
    
- Inactive User  
    - login: alice.souza@example.com
    - senha: 123456789

