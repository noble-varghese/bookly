const config = {
  development: {
    host: process.env.SUPABASE_HOST,
    port: 5432,
    database: process.env.SUPABASE_DATABASE,
    password: process.env.SUPABASE_PASSWORD,
    username: process.env.SUPABASE_USERNAME,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  // production: {
  //   host: process.env.SUPABASE_HOST,
  //   port: 5432,
  //   database: process.env.SUPABASE_DATABASE,
  //   password: process.env.SUPABASE_PASSWORD,
  //   username: process.env.SUPABASE_USERNAME,
  //   dialect: 'postgres',
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false
  //     }
  //   }
  // }
};

export default config;