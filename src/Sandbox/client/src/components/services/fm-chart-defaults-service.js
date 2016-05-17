(function () {
  'use strict';

  angular.module('fm').service('fmChartDefaults', ['fmUtilityFunctions', '$timeout', function (fmUtilityFunctions, $timeout) {

    var utils = fmUtilityFunctions;
    var colors = ['#658eaa', '#d64646', '#f6bd0f', '#8bba00', '#ff8e46', '#008e8e', '#8e468e', '#588526', '#b3aa00', '#008ed6'];
    var graphColors = ['#0084b4', '#d64646', '#f6bd0f', '#8bba00', '#ff8e46', '#008e8e', '#8e468e', '#588526', '#b3aa00', '#008ed6'];
    var gradientColors = colors.reduce(function (result, value, key) {
      var gradient = {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, utils.blendColor(value, 70)],
          [1, utils.blendColor(value, -5)]
        ]
      };
      result.push(gradient);
      return result;
    }, []);

    var pieOptions = {
      chart: {
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Open Sans'
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        margin: 0
      },
      colors: gradientColors,
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: null
      },
      scrollbar: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      navigation: {
        buttonOptions: {
          enabled: false,
          verticalAlign: 'bottom',
          y: -20
        }
      },
      rangeSelector: {
        enabled: false,
        inputEnabled: false
      },
      legend: {
        align: "left",
        layout: "vertical",
        enabled: true,
        verticalAlign: "bottom",
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 10,
        itemStyle: {
          color: '#172039',
          fontWeight: 'bold',
          fontSize: '12px',
          paddingBottom: '1rem',
          opacity: '0.9'
        },
        itemHoverStyle: {
          opacity: '1'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: ({point.y}%)<br/>',
        valueDecimals: 2
      },
      plotOptions: {
        pie: {
          slicedOffset: 20,
          size: '250px',
          allowPointSelect: true,
          borderWidth: 0,
          cursor: 'pointer',
          innerSize: '45%',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true
        },
        series: {
          animation: true,
          point: {
            events: {
              legendItemClick: function () {
                return false;
              }
            }
          },
          states: {
            hover: {
              halo: false
            }
          }
        }
      }
    };

    var lineOptions = {
      chart: {
        defaultSeriesType: 'line',
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Open Sans'
        }
      },

      colors: graphColors,

      scrollbar: {
        enabled: false
      },

      navigator: {
        enabled: false
      },

      navigation: {
        buttonOptions: {
          enabled: false,
          verticalAlign: 'bottom',
          y: -20
        }
      },

      rangeSelector: {
        enabled: false,
        inputEnabled: false
      },

      legend: {
        align: "center",
        layout: "horizontal",
        enabled: true,
        verticalAlign: "bottom"
      },

      yAxis: {
        title: {
          text: '',
          style: {
            display: 'none'
          }
        },
        labels: {
          formatter: function () {
            return (this.value > 0 ? '+' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },

      plotOptions: {
        series: {
          fillOpacity: 0.2,
          dataGrouping: {
            dateTimeLabelFormats: {
              day: ['%A, %e %b %Y', '%A, %e %b %Y', ' - %A, %e %b %Y'],
              week: ['%A, %e %b %Y', '%A, %e %b %Y', ' - %A, %e %b %Y'],
              month: ['%B %Y', '%B %Y', ' - %B %Y'],
              year: ['%Y', '%Y', ' - %Y']
            },
          }
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: ({point.y}%)<br/>',
        valueDecimals: 2
      }
    };

    var chartDefaults = {

      options: {},

      series: [],

      title: {
        text: '',
        style: {
          display: 'none'
        }
      },

      subtitle: {
        text: '',
        style: {
          display: 'none'
        }
      },

      loading: false,

      xAxis: {
        title: {
          text: '',
          style: {
            display: 'none'
          }
        }
      },

      func: function (chart) {
        $timeout(function () {
          chart.reflow();
        }, 0);
      },

      useHighStocks: true,
    };

    return {

      getColors: function() {
        return colors;
      },

      getPieChart: function () {
        var pieDefaults = chartDefaults;
        pieDefaults.useHighStocks = false;
        pieDefaults.options = pieOptions;
        return pieOptions;
        //return pieDefaults;
      },

      getLineChart: function () {
        var lineDefaults = chartDefaults;
        lineDefaults.options = lineOptions;
        return lineOptions;
        //return lineDefaults;
      }
    };
  }]);

})();








