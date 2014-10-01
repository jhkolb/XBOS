(function($) {
    $(document).ready(function() {

        // plot demand data
        d3.json("/demanddata", function(err, data) {
            var margin = {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
              },
              width = 900,
              height = 200;
            
            var x = d3.time.scale()
                .range([0, width]);
            var y = d3.scale.linear()
                .range([height, 0]);
            var xAxis = d3.svg.axis()
                .scale(x)
                .tickSubdivide(true)
                .orient("bottom");
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.value); });

            var svg = d3.select("#totaldemandplot").append("svg")
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom)
                .append("g")
                .attr("transform","translate("+margin.left+","+margin.top+")");
            if (err) {
                console.log("ERROR", err);
            }
            console.log("main svg",svg);
            data = data['data'].sort(function(a,b) { return b.date - a.date; });
            console.log(data);
            data.forEach(function(d) {
                d.date = new Date(d['date']*1);
                d.value = d['value'];
            });

            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain(d3.extent(data, function(d) { return d.value; }));
            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("kW");

            svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);
        });

        $('.dailyplot').each(function( idx) {
            var val = $( this );
            var key = val.data("key");
            var zone = val.data("zone");
            d3.json("/zonedata/"+key+"/"+zone, function(err, data) {
                data = data['temp'];
                var margin = {
                    top: 10,
                    right: 10,
                    bottom: 20,
                    left: 50
                  },
                  width = 400,
                  height = 200;
                var x = d3.time.scale()
                    .range([0, width]);
                var y = d3.scale.linear()
                    .range([height, 0]);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .tickSubdivide(true)
                    .orient("bottom");
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");
                var line = d3.svg.line()
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(d.value); });

                var svg = d3.select("#"+key+"_"+zone).append("svg")
                    .attr("width", width+margin.left+margin.right)
                    .attr("height", height+margin.top+margin.bottom)
                  .append("g")
                    .attr("transform","translate("+margin.left+","+margin.top+")");
                data = data.sort(function(a,b) { return b.date - a.date; });
                data.forEach(function(d) {
                    d.date = new Date(d['date']*1);
                    d.value = d['value'];
                });

                x.domain(d3.extent(data, function(d) { return d.date; }));
                y.domain(d3.extent(data, function(d) { return d.value; }));
                svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

                svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("kW");

                svg.append("path")
                  .datum(data)
                  .attr("class", "line")
                  .attr("d", line);
              });
        });

    });


})(jQuery);
