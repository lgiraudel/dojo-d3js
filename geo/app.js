// https://jsbin.com/cojedup/1/edit?html,css,js,output

var size = 500;

var projection = d3.geoMercator()
    .scale(size / 2)
    .translate([size / 2, size / 2]);

var graticule = d3.geoGraticule();

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("svg")
  .attr("width", size)
  .attr("height", size);

/*
svg.append('circle')
  .attr('cx', size / 2)
  .attr('cy', size / 2)
  .attr('x', size / 2)
  .attr('y', size / 2)
  .attr('r', size / 2)
  .attr('class', 'globe');
*/
svg.append("path")
  .datum(graticule)
  .attr("class", "graticule")
  .attr("d", path);

var feature = svg.selectAll(".country")
  .data(features.features)
  .enter().append("path")
  .attr("d", path)
  .attr('class', 'country')
  .attr('id', function(d) { return d.id; });

feature.append("svg:title")
  .text(function(d) { return d.properties.name; });

var m0, o0;

var drag = d3.drag()
  .on('start', function() {
    var proj = projection.rotate();
      m0 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
      o0 = [-proj[0],-proj[1]];
  })
  .on('drag', function() {
    if (m0) {
      var m1 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
      var o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
      projection.rotate([-o1[0], -o1[1]]);
      refreshCountries();
      refreshGraticule();
    }
});
svg.call(drag);

function refreshCountries() {
  svg.selectAll('.country').attr('d', path);
}

function refreshGraticule() {
  d3.select('.graticule')
    .datum(graticule)
    .attr('d', path);
}

function selectCountry(countryId) {
  d3.selectAll('.selected').classed('selected', false);
  d3.select('#' + countryId).classed('selected', true);
}

function centerOnCountry(countryId) {
  selectCountry(countryId);
  var countryFeature = features.features.filter(function(f) { return f.id === countryId })[0];
  //countryFeature = d3.select('#' + countryId).data()[0];
  var centroid = d3.geoCentroid(countryFeature);
  d3.transition()
    .duration(1000)
    .tween('rotate', function() {
      var r = d3.interpolate(projection.rotate(), [-centroid[0], -centroid[1]]);
      return function(t) {
        projection.rotate(r(t));
        refreshCountries();
        refreshGraticule();
      }
    });
}

function injectCountryInCountryList(countryId, countryName) {
  var option = document.createElement('option');
    option.innerHTML = countryName;
    option.value = countryId;
    d3.select('select').node().appendChild(option);
}

function injectCountryList() {
  var select = document.createElement('select');
  document.body.append(select);
  injectCountryInCountryList('', '-- Choose a country --');
  features.features.forEach(function (feature) {
    injectCountryInCountryList(feature.id, feature.properties.name);
  });

  select.addEventListener('change', function(e) {
    if (e.target.value) {
      centerOnCountry(e.target.value);
    }
  });

  document.body.append(select);
}

injectCountryList();