
async function getExchangeRate(type) {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids='+ type +'&vs_currencies=usd');
    const data = await response.json();
    if (type === "Bitcoin"){
      return data.bitcoin.usd;
    }

    if (type === "Ethereum"){
      return data.ethereum.usd;
    }

  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
}

async function updateUSDAmount() {
  const bitcoinAmount = document.getElementById('bitcoinAmount').value;
  const type = document.querySelector('input[name="type"]').value;
  const conversionRate = await getExchangeRate(type);

  if (conversionRate) {
    const usdAmount = bitcoinAmount * conversionRate;
    document.getElementById('usdAmount').value = usdAmount.toFixed(2);  // 2 decimal places for USD
  } else {
    document.getElementById('usdAmount').value = 'Error fetching rate';
  }
}

async function updateBitcoinAmount() {
  const bitcoinAmount = document.getElementById('usdAmount').value;
  const type = document.querySelector('input[name="type"]').value;
  const conversionRate = await getExchangeRate(type);

  if (conversionRate) {
    document.getElementById('bitcoinAmount').value = bitcoinAmount / conversionRate
  } else {
    document.getElementById('bitcoinAmount').value = 'Error fetching rate';
  }
}

document.getElementById('bitcoinAmount').addEventListener('input', updateUSDAmount);
document.getElementById('usdAmount').addEventListener('input', updateBitcoinAmount);
