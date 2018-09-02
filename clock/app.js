// https://codepen.io/lgiraudel/pen/amwdOy

var width = 200;
var height = width;
var offsetX = width / 2;
var offsetY = height / 2;
var radius = 80;
var dotRadius = 8;

var svg = d3.selectAll('.chart')
  .attr('width', width)
  .attr('height', height);

var clockGroup = svg.append('g')
  .attr('transform', 'translate(' + offsetX + ', ' + offsetY + ')');

clockGroup.append('circle')
  .attr('r', radius)
  .attr('class', 'clock outercircle');

clockGroup.append('circle')
  .attr('r', dotRadius)
  .attr('class', 'clock innercircle');

//var data = [{unit: 'hours', numeric: 3}, {unit: 'minutes', numeric: 30}, {unit: 'seconds', numeric: 45}];
function getTime() {
  var currentTime = new Date();
  
  return [
    {'unit': 'seconds', 'numeric': currentTime.getSeconds()},
    {'unit': 'minutes', 'numeric': currentTime.getMinutes()},
    {'unit': 'hours', 'numeric': currentTime.getHours()},
  ];
}
var data = getTime();

function render(data) {
  clockGroup.selectAll('.clock-hand').remove();
  clockGroup.selectAll('.clock-hand')
    .data(data, function(d) { return d.numeric; })
    .enter()
    .append('path')
    .attr('d', function(d) {
      var scale;
      //var arc;

      console.log(d);

      var arc = function(d, scale) {
        var arcFunc = d3.arc()
          .innerRadius(0)
          .outerRadius(function(d) {
            if (d.unit === 'hours') {
              return 40;
            }

            return 70;
          })
          .startAngle(scale(d.numeric))
          .endAngle(scale(d.numeric));

        return arcFunc(d);
      }

      switch (d.unit) {
        case 'hours':
          scale = d3.scaleLinear()
            .domain([0, 12])
            .range([0, 2 * Math.PI]);

  //        arc = d3.arc()
  //          .innerRadius(0)
  //          .outerRadius(40)
  //          .startAngle(function(d) { return scale(d.numeric); })
  //          .endAngle(function(d) { return scale(d.numeric); });
  //        return arc(d);
          return arc(d, scale);
        case 'minutes':
          scale = d3.scaleLinear()
            .domain([0, 60])
            .range([0, 2 * Math.PI]);

  //        arc = d3.arc()
  //          .innerRadius(0)
  //          .outerRadius(70)
  //          .startAngle(function(d) { return scale(d.numeric); })
  //          .endAngle(function(d) { return scale(d.numeric); });
  //        return arc(d);
          return arc(d, scale);
        case 'seconds':
          scale = d3.scaleLinear()
            .domain([0, 60])
            .range([0, 2 * Math.PI]);

  //        arc = d3.arc()
  //          .innerRadius(0)
  //          .outerRadius(70)
  //          .startAngle(function(d) { return scale(d.numeric); })
  //          .endAngle(function(d) { return scale(d.numeric); });
  //        return arc(d);
          return arc(d, scale);
        default:
      }
    })
    .attr('class', function(d) {
      if (d.unit === 'hours') {
        return 'clock-hand clock-hand-big';
      }

      return 'clock-hand';
    });
}

render(getTime());
window.setInterval(function() {
  render(getTime());
}, 1000);

/*
function getTime() {
  var currentTime = new Date();
  
  return [
    {'unit': 'seconds', 'numeric': currentTime.getSeconds()},
    {'unit': 'minutes', 'numeric': currentTime.getMinutes()},
    {'unit': 'hours', 'numeric': currentTime.getHours()},
  ];
}

var scaleSeconds = d3.scaleLinear()
  .domain([0, 60])
  .range([0, 2 * Math.PI]);
var scaleMinutes = d3.scaleLinear()
  .domain([0, 60])
  .range([0, 2 * Math.PI]);
var scaleHours = d3.scaleLinear()
  .domain([0, 12])
  .range([0, 2 * Math.PI]);

function render(data) {
  console.log(data);
  clockGroup.selectAll('.clockhand').remove();
  
  var secondsArc = d3.arc()
    .innerRadius(0)
    .outerRadius(70)
    .startAngle(d => scaleSeconds(d.numeric))
    .endAngle(d => scaleSeconds(d.numeric))

  var minutesArc = d3.arc()
    .innerRadius(0)
    .outerRadius(70)
    .startAngle(d => scaleMinutes(d.numeric))
    .endAngle(d => scaleMinutes(d.numeric))

  var hoursArc = d3.arc()
    .innerRadius(0)
    .outerRadius(40)
    .startAngle(d => scaleHours(d.numeric))
    .endAngle(d => scaleHours(d.numeric))

  clockGroup.selectAll('.clockhand')
    .data(data)
    .enter()
    .append('path')
    .attr('d', function(d) {
      if (d.unit === 'seconds') {
        return secondsArc(d);
      } else if (d.unit === 'minutes') {
        return minutesArc(d);
      } else if (d.unit === 'hours') {
        return hoursArc(d);
      }
    })
    .attr('class', 'clockhand')
    .attr('stroke', 'black')
    .attr('stroke-width', function(d) {
      if (d.unit === 'seconds') {
        return 2;
      } else if (d.unit === 'minutes') {
        return 4;
      } else if (d.unit === 'hours') {
        return 4;
      }
    })
    .attr('fill', 'transparent');
};

//window.setInterval(function() {
  render(getTime());
//}, 1000);
*/
