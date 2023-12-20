let express = require('express');
let DashboardService = require('../src/services/dashboardServices');
let router = express.Router();

router.get('/', async function (req, res, next) {
  // if (req.session.user){
  //
  // }
  const dashboardInfo = DashboardService.getDefaultInfo();
  res.render("dashboard", {
    title: 'Dashboard',
    transactions: dashboardInfo.transaction,
    fiat: dashboardInfo.fiat,
    ethereum: dashboardInfo.ethereum,
    error: dashboardInfo.error
  });
});

router.get('/wallet', async function (req, res, next) {
  const wallet = await DashboardService.createWallet();
  console.log(wallet.publicAddress + "/" + wallet.privateKey);
  res.redirect("/");
});

module.exports = router;
