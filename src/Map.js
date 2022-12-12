import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import * as topojson from 'topojson-client';
import us from './data/states-albers-10m.json';
import data from './data/us-state-capitals.json';
import { text } from 'd3';

const width = 975;
const height = 610;

const projection = d3.geoAlbersUsa().scale(1300).translate([width/2, height/2]);
const Map = () => {
    const svg = d3.create('svg')
                .attr('height', height)
                .attr('width', width);

    const path = d3.geoPath();
    const statesBackground = svg.append('path')
                            .attr('fill', '#F4998D')
                            .attr('stroke', 'none')
                            .attr('d', path(topojson.feature(us, us.objects.nation)));

    const stateBorders = svg.append('path')
                            .attr('fill', 'none')
                            .attr('stroke', '#A33B20')
                            .attr('stroke-linecap', 'round')
                            .attr('stroke-linejoin', 'round')
                            .attr('d', path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
    document.body.appendChild(svg.node());



    const statesElements =
        svg.selectAll('g')
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .data(data)
        .join('g');

    const capitalGroups = statesElements
        .append('g')
        .attr(
        'transform', 
        // () => `translate(${projection([data[num].longitude, data[num].latitude]).join(",")})`);
        ({ longitude, latitude }) =>
            `translate(${projection([longitude, latitude]).join(",")})`
        );

    capitalGroups.append('circle')
        .attr('r', 5)
        .attr('fill', '#FEFFFE')
        .attr('stroke', '#27213C');

    capitalGroups
        .append('text')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#27213C')
        .attr('y', -10)
        .text(({name}) => name);

        var div = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);
    capitalGroups.on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '0.5');
            div.transition()
                .duration(50)
                .style("opacity", 1);

            div.html("Empty")
            .style("left", (width + 10) + "px")
            .style("top", (height/2) + "px");
        })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
            div.transition()
            .duration('50')
            .style("opacity", 0);
        });
    return (
        <>
            <div className="Map">
            </div>
        </>
        );
}

export default Map