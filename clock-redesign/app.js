// https://codepen.io/lgiraudel/pen/ALxbkm?editors=0010

var width = 400;
var height = width;

var svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

var clockGroup = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

function getTime() {
  var currentTime = new Date();
  
  return [
    {'unit': 'milliseconds', 'numeric': currentTime.getMilliseconds()},
    {'unit': 'seconds', 'numeric': currentTime.getSeconds()},
    {'unit': 'minutes', 'numeric': currentTime.getMinutes()},
    {'unit': 'hours', 'numeric': currentTime.getHours()},
  ];
}

var units = ['hours', 'minutes', 'seconds', 'milliseconds'];
var domains = [24, 60, 60, 1000];
var unitHeight = 20;
var radiuses = []
for (var i = 0; i < units.length * unitHeight; i += unitHeight) {
  radiuses.push(i);
}

function render(data) {
  //console.log(data);
  clockGroup.selectAll('.clock-hand').remove();
  clockGroup.selectAll('.clock-hand')
    .data(data)
    .enter()
    .append('path')
    .attr('d', function(d) {
      var scale;

      var arc = function(d, scale) {
        var arcFunc = d3.arc()
          .innerRadius(function(d) {
            return radiuses[units.indexOf(d.unit)];
/*            switch (d.unit) {
              case 'hours':
                return 0;
              case 'minutes':
                return 20;
              case 'seconds':
                return 40;
              case 'milliseconds':
                return 60;
            }*/
          })
          .outerRadius(function(d) {
/*            switch (d.unit) {
              case 'hours':
                return 19;
              case 'minutes':
                return 39;
              case 'seconds':
                return 59;
              case 'milliseconds':
                return 79;
            }*/
            return radiuses[units.indexOf(d.unit)] + unitHeight;
          })
          .startAngle(0)
          .endAngle(scale(d.numeric));

        return arcFunc(d);
      }

      scale = d3.scaleLinear()
        .domain([0, domains[units.indexOf(d.unit)]])
        .range([0, 2 * Math.PI]);

/*
      switch (d.unit) {
        case 'hours':
          scale = d3.scaleLinear()
            .domain([0, 24])
            .range([0, 2 * Math.PI]);
          break;
        case 'minutes':
          scale = d3.scaleLinear()
            .domain([0, 60])
            .range([0, 2 * Math.PI]);
          break;
        case 'seconds':
          scale = d3.scaleLinear()
            .domain([0, 60])
            .range([0, 2 * Math.PI]);
          break;
        case 'milliseconds':
          scale = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, 2 * Math.PI]);
          break;
      }*/

      return arc(d, scale);
    })
    .attr('class', 'clock-hand')
    .attr('fill', function(d, i) {
      var colorScale = d3.scaleLinear()
        .domain([0, data.length])
        .range(['red', 'black']);

      return colorScale(i);
    })

}

render(getTime());
setInterval(function() {
  render(getTime());
}, 24);

/*
const width = 400;
const height = 400;
const arcSize = 20;
const spaceBetweenArcs = 1;
const minimumRadius = 1;
const palette = ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'];
const texts = ['ms', 'seconds', 'minutes', 'hours', 'days', 'months', 'years'];
const periodConf = {
  milliseconds: { position: 0, maxValue: 1000 },
  seconds: { position: 1, maxValue: 60 },
  minutes: { position: 2, maxValue: 60 },
  hours: { position: 3, maxValue: 24 },
  day: { position: 4, maxValue: d => (new Date(d[6].numeric, d[5].numeric, 0).getDate()) },
  month: { position: 5, maxValue: 12 },
  year: { position: 6, maxValue: 2100 }
}

function getTime() {
  const currentTime = new Date();
  
  return [
    {unit: 'milliseconds', numeric: currentTime.getMilliseconds()},
    {unit: 'seconds', numeric: currentTime.getSeconds()},
    {unit: 'minutes', numeric: currentTime.getMinutes()},
    {unit: 'hours', numeric: currentTime.getHours()},
    {unit: 'day', numeric: currentTime.getUTCDate()},
    {unit: 'month', numeric: currentTime.getMonth() + 1},
    {unit: 'year', numeric: currentTime.getFullYear()},
  ];
}

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);

const clockGroup = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`);

const arcGenerator = function(maxValue, position) {
  return d3.arc()
    .innerRadius(minimumRadius + position * (arcSize + spaceBetweenArcs))
    .outerRadius(minimumRadius + (position + 1) * (arcSize + spaceBetweenArcs) - spaceBetweenArcs)
    .startAngle(0)
    .endAngle(function(d) {
      const scale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, 2 * Math.PI]);
      return scale(d.numeric);
    });
}

const textArcGenerator = function(position) {
  const radius = minimumRadius + position * (arcSize + spaceBetweenArcs) + 6;
  return d3.arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle(0.1)
    .endAngle(2 * Math.PI);
}

for (let i = 0; i < 7; i++) {
  svg.select('defs')
    .append('path')
    .attr('d', textArcGenerator(i))
    .attr('id', `arc-${i}`);

  svg.select('g')
    .append('text')
    .append('textPath')
    .attr('xlink:href', `#arc-${i}`)
    .style('fill', 'black')
    .text(texts[i]);
}

function render(data) {
  clockGroup.selectAll('.clockhand').remove();
  
  clockGroup.selectAll('.clockhand')
    .data(data)
    .enter()
    .insert('path', ':first-child')
    .attr('class', 'clockhand')
    .attr('fill', function(d) {
      if (periodConf[d.unit]) {
        return palette[periodConf[d.unit].position];
      }
    })
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .attr('d', function(d) {
      if (periodConf[d.unit]) {
        let maxValue = periodConf[d.unit].maxValue;
        if (typeof maxValue === 'function') {
          maxValue = maxValue(data);
        }
        const position = periodConf[d.unit].position;
        return arcGenerator(maxValue, position)(d);
      }
    });
}

render(getTime());
window.setInterval(function() {
  render(getTime());
}, 30);
*/