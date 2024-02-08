const Sequelize = require('sequelize');

const sequelize = new Sequelize('split_bill', 'root', 'Pranay@11', {
  host: 'localhost',
  port:3306,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate().then(()=>{
    console.info('CONNECTION SUCCESSFULL!!!');
}).catch((error) => {
    console.error('CONNECTION FAILED:::', error);
 });

module.exports=sequelize;