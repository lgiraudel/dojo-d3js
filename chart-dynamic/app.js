// https://codepen.io/lgiraudel/pen/PGObwV

var nbElements = 10;
var maxValue = 100;
var barHeight = 20;

var data = [];
for (var i = 0; i < nbElements; i++) {
  data.push({
    id: _.uniqueId(),
    value: _.random(0, maxValue)
  });
}

var width = 420;

var chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', barHeight * data.length);

var scale = d3.scaleLinear()
  .domain([0, maxValue])
  .range([0, width]);

//var colorScale = d3.scaleSequential(d3.interpolateRainbow)
//  .domain([0, 100]);

var colorScale = d3.scaleLinear()
  .domain([0, maxValue / 2, maxValue])
  .range(['red', 'orange', 'green']);

//var colorScale = d3.scaleQuantize()
//  .domain([0, 100])
//  .range(['red', 'orange', 'green']);

function update(data) {
  var selection = chart.selectAll('g')
    .data(data, function(d) { return d.id; });
    console.log('selection', selection)

  var transform = function(d, i) { return 'translate(0, ' + i * barHeight + ')'};
  
  var bar = selection.enter()
    .append('g')
    .attr('transform', transform)
    console.log('bar', bar);
  
  selection.attr('transform', transform)
  
  selection.exit().remove();

  bar.append('rect')
    .attr('height', barHeight - 1)
    .transition()
    .duration(750)
    .delay(function(d, i) { return i * 50; })
    .attr('width', function(d) { return scale(d.value); })
    .attr('fill', function(d) { return colorScale(d.value); })

  bar.append('text')
    .attr('x', function(d) { return scale(d.value) - 3; })
    .attr('y', barHeight / 2 + 3)
    .text(function(d) { return d.value; });
}

update(data);
window.setInterval(function() {
  data.shift();
  data.push({
    id: _.uniqueId(),
    value: _.random(0, maxValue)
  });
  update(data);
}, 1000)
