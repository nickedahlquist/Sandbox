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

    /* GUAGE */
    function GuageOptions() {

      this.chart = {
        backgroundColor: 'transparent',
        type: 'solidgauge',
        style: {
          fontFamily: 'Open Sans',
        }
      };

      this.pane = {
        center: ['50%', '50%'],
        size: '100%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#F2F2F0',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      };

      this.solidgauge = {
        dataLabels: {
          y: -30,
          borderWidth: 0,
          useHTML: false
        }
      };

      this.tooltip = {
        enabled: false
      };

      this.plotOptions = {
        series: {
          dataLabels: {
            y: -50,
            borderWidth: 0,
            format: '<span style="font-size: 250%; color: #303E4C;">{y}</span>'
          }
        }
      };

    }

    /* PIE */
    function PieOptions() {
      
      this.chart = {
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Open Sans'
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        margin: 0
      };

      this.colors = gradientColors;

      this.credits = {
        enabled: false
      };

      this.exporting = {
        enabled: false
      };

      this.title = {
        text: null
      };

      this.scrollbar = {
        enabled: false
      };

      this.navigator = {
        enabled: false
      };

      this.navigation = {
        buttonOptions: {
          enabled: false,
          verticalAlign: 'bottom',
          y: -20
        }
      };
      
      this.rangeSelector = {
        enabled: false,
        inputEnabled: false
      };

      this.legend = {
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
      };

      this.tooltip = {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: ({point.y}%)<br/>',
        valueDecimals: 2
      };

      this.plotOptions = {
        pie: {
          slicedOffset: 15,
          size: '100%',
          allowPointSelect: true,
          borderWidth: 0,
          cursor: 'pointer',
          innerSize: '45%',
          center: ['50%', '50%'],
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
      };
    }

    /* LINE */
    function LineOptions () {
      
      this.chart = {
        defaultSeriesType: 'area',
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Open Sans'
        }
      };

      this.colors = graphColors;

      this.scrollbar = {
        enabled: false
      };

      this.navigator = {
        enabled: false
      };

      this.navigation = {
        buttonOptions: {
          enabled: false,
          verticalAlign: 'bottom',
          y: -20
        }
      };

      this.rangeSelector = {
        enabled: false,
        inputEnabled: false
      };

      this.legend = {
          align: "center",
          layout: "horizontal",
          enabled: true,
          verticalAlign: "bottom"
      };

      this.yAxis = {
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
      };

      this.plotOptions = {
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
      };

      this.tooltip = {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: ({point.y}%)<br/>',
        valueDecimals: 2
      };
    }

    /* DEFAULTS */
    function ChartDefaults() {

      this.options = {};

      this.series = [];

      this.title = {
        text: '',
        style: {
          display: 'none'
        }
      };

      this.subtitle = {
        text: '',
        style: {
          display: 'none'
        }
      };

      this.loading = false;

      this.xAxis = {
        title: {
          text: '',
          style: {
            display: 'none'
          }
        }
      };

      this.func = function (chart) {
        $timeout(function () {
          chart.reflow();
        }, 0);
      };

      this.useHighStocks = true;
    }

    return {

      getColors: function() {
        return colors;
      },

      getPieChart: function (options) {
        var options = options || {};
        var pieDefaults = new ChartDefaults();
        pieDefaults.useHighStocks = false;
        pieDefaults.options = new PieOptions();

        // Reparent pie chart legend to selector if selector is provided.
        if (options.legendParent !== undefined) {

          function resetLegend() {
            var chart = $(options.legendParent),
            legend = chart.find('.highcharts-legend').removeAttr('transform');
          }

          pieDefaults.options.chart.events = {
            load: function () {
              var id = '#' + this.renderTo.id,
                  chart = $(id),
                  legend = chart.find('.highcharts-legend').removeAttr('transform').appendTo(options.legendParent);
            },
            redraw: function () {
              resetLegend();
            }
          };
        }

        return pieDefaults;
      },

      getLineChart: function () {
        var lineDefaults = new ChartDefaults();
        lineDefaults.options = new LineOptions();
        return lineDefaults;
      },

      getGuage: function (options) {
        var options = options || {};
        var guageDefaults = new ChartDefaults();
        guageDefaults.useHighStocks = false;

        guageDefaults.yAxis = {
          currentMin: 0,
          currentMax: 24,
          title: {
            y: 140
          },
          stops: [[0.1, '#55BF3B'], [0.5, '#DDDF0D'], [0.9, '#DF5353']],
          lineWidth: 0,
          tickInterval: 0,
          tickPixelInterval: 0,
          tickWidth: 0,
          labels: {
            y: 150
          }
        };

        if(options.title !== undefined) {
          guageDefaults.title = {
            text: options.title,
            y: 20
          };
        }

        guageDefaults.series = [{ data: [0]}];
        guageDefaults.subtitle = undefined;
        guageDefaults.xAxis = undefined;
        guageDefaults.options = new GuageOptions();
        return guageDefaults;
      }

    };
  }]);

})();








