MINI BLOG DESENVOLVIDO COM NEXT.JS,SQL

Antes de começar, certifique-se de ter instalado na sua máquina:

Node.js (versão 18 ou superior)
Git
Yarn ou npm (gerenciador de pacotes)


1° PASSO 

CLONE O REPOSITÓRIO
abra seu terminal e execute 

git clone https://github.com/PedroA-Santos/testeTytotech.git
cd teste

Se estiver usando npm:
npm install

Se estiver usando yarn:
yarn install



2° PASSO 


você deve configurar o arquivo db.js dentro da pasta api/database com seu banco sql

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'seuhost',
    user: 'seuuser',
    password: 'suasenha',
    database: 'sudatabase'
});



connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados.');
});

// Exportando a conexão
export { connection };




3°PASSO 

INICIE O SERVIDOR

npm run dev 

O projeto rodará em http://localhost:3000 