// https://codepen.io/lgiraudel/pen/dpWJXq

var data = [4, 8, 15, 16, 23, 42];

var width = 420;
var barHeight = 20;

var chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', barHeight * data.length);


var scale = d3.scaleLinear()
  .domain([0, d3.max(data) * 1.1])
  .range([0, width]);

var colorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, d3.max(data)]);

chart.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('transform', function(d, i) { return 'translate(0, ' + i * barHeight + ')'})
  .attr('height', barHeight - 1)
  .transition()
  .duration(750)
  .attr('width', scale)
  .attr('fill', colorScale)

chart.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('x', function(d) { return scale(d) - 3; })
  .attr('y', barHeight / 2 + 3)
  .text(function(d) { return d })
  .attr('transform', function(d, i) { return 'translate(0, ' + i * barHeight + ')'});

/*
var bar = chart.selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function(d, i) { return 'translate(0, ' + i * barHeight + ')'});

var scale = d3.scaleLinear()
  .domain([0, d3.max(data) * 1.1])
  .range([0, width]);

//var colorScale = d3.scaleLinear()
//  .domain([0, d3.max(data)])
//  .range(['#ff0000', 'purple']);

//var colorScale = d3.scaleQuantize()
//  .domain([0, d3.max(data)])
//  .range(['#ff0000', 'purple']);

var colorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, d3.max(data)]);

bar.append('rect')
  .attr('height', barHeight - 1)
  .transition()
  .duration(750)
  .delay(function(d, i) { return i * 100; })
  .attr('width', scale)
  .attr('fill', colorScale)

bar.append('text')
  .attr('x', function(d) { return scale(d) - 3; })
  .attr('y', barHeight / 2 + 3)
  .text(function(d) { return d; });*/