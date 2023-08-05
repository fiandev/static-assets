
async function makeChart(ctx, type, title, datachart, datachartName, label) {
  let data = {
    labels: [],
    datasets: [
        {
        label: "",
        backgroundColor: random_rgba(),
        fill: true,
        data: [],
        borderColor: "#d1dbdd",
        borderWidth: 2
      }
    ]
  }
  let options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "popular posts"
    },
    legend: {
      display: false
    },
    sscale: {
      yAxes: [
        {
          ticks: {
            bbeginAtZero: true
          }
        }
      ]
    },
    elements: {
      point: {
        backgroundColor: "#ffffff"
      }
    }
  }
  if (label !== null && typeof label === "object") {
    label.forEach(function(name){
     data.datasets[0].label.push(name)
    })
  } else {
    options.title.text = title
    datachartName.forEach(function(_){
      data.labels.push(_)
    })
    datachart.forEach(function(_){
      data.datasets[0].data.push(_)
    })
    /*
    datachart.forEach(function(_){
      data.datasets.push({
        label: label,
        backgroundColor: random_rgba(),
        fill: true,
        data: _,
        borderColor: "#d1dbdd",
        borderWidth: 2
      })
    })
    */
    return new Chart(ctx, {
        type: type,
        data: data,
        options: options
      })
  }
}



function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}