// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/login.db3'
    },
  
      migrations: {
        tableName: '/data/migrations'
      },
      seeds: {
        directory: '/data/seeds',
  },
},
}


