// Replace 'your_api_key_here' with your CoinMarketCap API key
const apiKey = 'cbecfeb7-2300-4d37-936f-d586d342aa95';

// Define the API endpoint and parameters

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const params = {
  start: 1,
  limit: 10,
  convert: 'USD'
};

// Make the API request
fetch(url + '?' + new URLSearchParams(params), {
  headers: {
    'X-CMC_PRO_API_KEY': apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    // Loop through the data array to find the Bitcoin data
    let bitcoinData = {
      currentPrice: "",
      percentChanges: {}
    };

    let ethereumData = {
      currentPrice: "",
      percentChanges: {}
    };

    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].name === 'Bitcoin') {
        bitcoinData.currentPrice = data.data[i].quote.USD.price;
        bitcoinData.percentChanges = data.data[i].quote.USD;
      }

      if (data.data[i].name === 'Ethereum') {
        ethereumData.currentPrice = data.data[i].quote.USD.price;
        ethereumData.percentChanges = data.data[i].quote.USD;
      }
    }


    // Calculating the prices of Bitcoin at the different time points
    const previousPricesBitcoin = [
      bitcoinData.currentPrice / (1 + (bitcoinData.percentChanges.percent_change_90d / 100)),
      bitcoinData.currentPrice / (1 + (bitcoinData.percentChanges.percent_change_60d / 100)),
      bitcoinData.currentPrice / (1 + (bitcoinData.percentChanges.percent_change_30d / 100)),
      bitcoinData.currentPrice / (1 + (bitcoinData.percentChanges.percent_change_7d / 100)),
      bitcoinData.currentPrice / (1 + (bitcoinData.percentChanges.percent_change_24h / 100)),
      bitcoinData.currentPrice / (1 + (bitcoinData.percentChanges.percent_change_1h / 100))
    ];

    const previousPricesEthereum = [
      ethereumData.currentPrice / (1 + (ethereumData.percentChanges.percent_change_90d / 100)),
      ethereumData.currentPrice / (1 + (ethereumData.percentChanges.percent_change_60d / 100)),
      ethereumData.currentPrice / (1 + (ethereumData.percentChanges.percent_change_30d / 100)),
      ethereumData.currentPrice / (1 + (ethereumData.percentChanges.percent_change_7d / 100)),
      ethereumData.currentPrice / (1 + (ethereumData.percentChanges.percent_change_24h / 100)),
      ethereumData.currentPrice / (1 + (ethereumData.percentChanges.percent_change_1h / 100))
    ];

    // Creating an array of labels for the chart
    const labels = [
      '90 Days Ago', '60 Days Ago', '30 Days Ago', '7 Days Ago', '24 Hours Ago', '1 Hour Ago'
    ];

    // Create the chart data
    const dataObjectBitcoin = {
      labels: labels,
      datasets: [{
        label: 'Bitcoin Price (USD)',
        data: previousPricesBitcoin,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(200, 19, 19, 1)',
        fill: false,
      }]
    };

    const dataObjectEthereum = {
      labels: labels,
      datasets: [{
        label: 'Ethereum, Price (USD)',
        data: previousPricesEthereum,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(25, 150, 217, 1)',
        fill: false,
      }]
    };

    // Render the chart
    const ctxBitcoin = document.getElementById('bitcoinChart').getContext('2d');
    new Chart(ctxBitcoin, {
      type: 'line',
      data: dataObjectBitcoin,
      options: {
        title: {
          display: true,
          text: 'Bitcoin Price Over Various Time Frames'
        },
        scales: {
          y: {
            beginAtZero: false,  // Start y-axis at the lowest value in the dataset
            title: {
              display: true,
              text: 'Price (USD)'
            }
          }
        }
      }
    });

    const ctxEthereum = document.getElementById('ethereumChart').getContext('2d');
    new Chart(ctxEthereum, {
      type: 'line',
      data: dataObjectEthereum,
      options: {
        title: {
          display: true,
          text: 'Ethereum, Price Over Various Time Frames'
        },
        scales: {
          y: {
            beginAtZero: false,  // Start y-axis at the lowest value in the dataset
            title: {
              display: true,
              text: 'Price (USD)'
            }
          }
        }
      }
    });
  });

document.querySelectorAll('.switchButton').forEach(function(button) {
  button.onclick = function() {
    // Read the current type value from the input field
    let type = document.querySelector('input[name="type"]').value;

    // Switch the type value
    if (type === 'Bitcoin') {
      type = 'Ethereum';
    } else if (type === 'Ethereum') {
      type = 'Fiat';
    } else {
      type = 'Bitcoin';
    }

    // Update the hidden input field
    document.querySelector('input[name="type"]').value = type;

    // Update all instances of the .typeDisplay class
    document.querySelectorAll('.typeDisplay').forEach(function(element) {
      element.textContent = type;
    });

    // Update the form labels and placeholders
    const formField = document.querySelector('.form-floating.mb-3');
    if (type === 'Fiat') {
      formField.classList.add('d-none');
      document.getElementById('amountButton').textContent = type;
    } else {
      formField.classList.remove('d-none');
      document.getElementById('amountButton').textContent = type;
      document.querySelector('label[for="bitcoinAmount"]').textContent = type + ' Amount';
      document.querySelector('input[name="bitcoinAmount"]').placeholder = type + ' Amount';
    }
  };
});

document.querySelectorAll('.switchButtons').forEach(function(button) {
  button.onclick = function() {
    // Read the current type value from the input field
    let type = document.querySelector('input[name="type"]').value;

    // Switch the type value
    if (type === 'Bitcoin') {
      type = 'Ethereum';
    } else {
      type = 'Bitcoin';
    }

    // Update the hidden input field
    document.querySelector('input[name="type"]').value = type;

    // Update all instances of the .typeDisplay class
    document.querySelectorAll('.typeDisplay').forEach(function(element) {
      element.textContent = type;
    });


    document.getElementById('amountButton').textContent = type;
    document.querySelector('label[for="bitcoinAmount"]').textContent = type + ' Amount';
    document.querySelector('input[name="bitcoinAmount"]').placeholder = type + ' Amount';

  };
});

(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();


  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
  });


  // Sidebar Toggler
  $('.sidebar-toggler').click(function () {
    $('.sidebar, .content').toggleClass("open");
    return false;
  });


  // Progress Bar
  $('.pg-bar').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {offset: '80%'});


  // Calender
  $('#calender').datetimepicker({
    inline: true,
    format: 'L'
  });


  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
    nav: false
  });


  // Chart Global Color
  Chart.defaults.color = "#6C7293";
  Chart.defaults.borderColor = "#000000";


  // Worldwide Sales Chart
  var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
  var myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      datasets: [{
        label: "USA",
        data: [15, 30, 55, 65, 60, 80, 95],
        backgroundColor: "rgba(235, 22, 22, .7)"
      },
        {
          label: "UK",
          data: [8, 35, 40, 60, 70, 55, 75],
          backgroundColor: "rgba(235, 22, 22, .5)"
        },
        {
          label: "AU",
          data: [12, 25, 45, 55, 65, 70, 60],
          backgroundColor: "rgba(235, 22, 22, .3)"
        }
      ]
    },
    options: {
      responsive: true
    }
  });


  // Salse & Revenue Chart
  var ctx2 = $("#salse-revenue").get(0).getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      datasets: [{
        label: "Salse",
        data: [15, 30, 55, 45, 70, 65, 85],
        backgroundColor: "rgba(235, 22, 22, .7)",
        fill: true
      },
        {
          label: "Revenue",
          data: [99, 135, 170, 130, 190, 180, 270],
          backgroundColor: "rgba(235, 22, 22, .5)",
          fill: true
        }
      ]
    },
    options: {
      responsive: true
    }
  });


  // Single Line Chart
  var ctx3 = $("#line-chart").get(0).getContext("2d");
  var myChart3 = new Chart(ctx3, {
    type: "line",
    data: {
      labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
      datasets: [{
        label: "Salse",
        fill: false,
        backgroundColor: "rgba(235, 22, 22, .7)",
        data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
      }]
    },
    options: {
      responsive: true
    }
  });


  // Single Bar Chart
  var ctx4 = $("#bar-chart").get(0).getContext("2d");
  var myChart4 = new Chart(ctx4, {
    type: "bar",
    data: {
      labels: ["Italy", "France", "Spain", "USA", "Argentina"],
      datasets: [{
        backgroundColor: [
          "rgba(235, 22, 22, .7)",
          "rgba(235, 22, 22, .6)",
          "rgba(235, 22, 22, .5)",
          "rgba(235, 22, 22, .4)",
          "rgba(235, 22, 22, .3)"
        ],
        data: [55, 49, 44, 24, 15]
      }]
    },
    options: {
      responsive: true
    }
  });


  // Pie Chart
  var ctx5 = $("#pie-chart").get(0).getContext("2d");
  var myChart5 = new Chart(ctx5, {
    type: "pie",
    data: {
      labels: ["Italy", "France", "Spain", "USA", "Argentina"],
      datasets: [{
        backgroundColor: [
          "rgba(235, 22, 22, .7)",
          "rgba(235, 22, 22, .6)",
          "rgba(235, 22, 22, .5)",
          "rgba(235, 22, 22, .4)",
          "rgba(235, 22, 22, .3)"
        ],
        data: [55, 49, 44, 24, 15]
      }]
    },
    options: {
      responsive: true
    }
  });


  // Doughnut Chart
  var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
  var myChart6 = new Chart(ctx6, {
    type: "doughnut",
    data: {
      labels: ["Italy", "France", "Spain", "USA", "Argentina"],
      datasets: [{
        backgroundColor: [
          "rgba(235, 22, 22, .7)",
          "rgba(235, 22, 22, .6)",
          "rgba(235, 22, 22, .5)",
          "rgba(235, 22, 22, .4)",
          "rgba(235, 22, 22, .3)"
        ],
        data: [55, 49, 44, 24, 15]
      }]
    },
    options: {
      responsive: true
    }
  });


})(jQuery);

