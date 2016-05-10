(function () {
  'use strict';

  angular.module('fm').service('fmChartDefaults', ['fmUtilityFunctions', function (fmUtilityFunctions) {

    var utils = fmUtilityFunctions;
    var colors = ['#658eaa', '#d64646', '#f6bd0f', '#8bba00', '#ff8e46', '#008e8e', '#8e468e', '#588526', '#b3aa00', '#008ed6'];

    var colors2 = ['#1abc9c', '#2ecc71', '#4aa3df', '#9b59b6', '#34495e', '#f1c40f'];
    var graphColors = ['#0084b4', '#d64646', '#f6bd0f', '#8bba00', '#ff8e46', '#008e8e', '#8e468e', '#588526', '#b3aa00', '#008ed6'];
    var gradientColors = [];

    for (var i = 0; i < colors.length; i++) {

      var nextColorIndex = (i >= (colors.length - 1)) ? 0 : (i + 1);

      var gradient = {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, utils.blendColor(colors[i], 70)],
          [1, utils.blendColor(colors[i], -5)]
        ]
      };

      gradientColors.push(gradient);
    }

    return {
      getPieOptions: function() {
        return {
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
          //colors: graphColors,
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
            verticalAlign: "top",
            x: 0,
            y: 100,
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
              slicedOffset: 0,
              size: '75%',
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
              states: {
                hover: {
                  halo: false
                }
              }
            }
          }
        }
      },

      getLineOptions: function () {
        return {
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
        }
      }
      
    };
  }]);

})();








