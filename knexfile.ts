import path from 'path';

module.exports = {
    client: 'mysql',
    connection: {
        host: 'pizzariabanco.mysql.dbaas.com.br',
        user: 'pizzariabanco',
        password: 'Joaopedro-321',
        database: 'pizzariabanco',
        port: 3306
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'Database', 'migrations')
    },
}