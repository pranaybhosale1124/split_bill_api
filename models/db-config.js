const Sequelize = require('sequelize');

const sequelize = new Sequelize('split_bill', 'root', 'Pranay@11', {
  host: 'localhost',
  port:3306,
  dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.info('CONNECTION SUCCESSFULL!!!');
}).catch((error) => {
    console.error('CONNECTION FAIL:::', error);
 });

module.exports=sequelize;