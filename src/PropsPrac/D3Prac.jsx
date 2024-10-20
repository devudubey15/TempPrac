import { useEffect } from 'react';
import * as d3 from 'd3';

export default function Attribute() {

    const data = [30, 50, 70, 90];

    useEffect(() => {
        const svg = d3.select("body")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);

        // svg.selectAll("rect")
        //     .data(data)  // bind data points
        //     .enter()     // enter selection 
        //     .append("rect")
        //     .attr("cx", (d, i) => 50 + i * 100) // set x-position for each circle
        //     .attr("cy", 100) // set y-position (same for all circles)
        //     .attr("r", d => d) // set radius using data values
        //     .attr("fill", "blue")
        //     .attr("stroke", "black") // set border color (black)
        //     .attr("stroke-width", 2); // set border thickness to 2px

        // Cleanup function to remove the SVG on unmount
        return () => {
            d3.select("svg").remove();
        };

    }, []); // Only run once when the component is mounted

    return (
        <>
            <div>
                <h1>Circles with D3</h1>
                {/* SVG will be added to the body */}
            </div>
        </>
    );
}

//------------------
/*
        Here are some simple exercises for each D3 method you listed. You can practice by creating a small web page or React component that implements these functionalities:

    1. .attr()
    Exercise: Create a series of circles in an SVG element and use the .attr() method to update their cx, cy, and r attributes to change their position and size dynamically based on user input.
    2. .classed()
    Exercise: Build a button that, when clicked, toggles a class name (e.g., "active") on a set of div elements. Use the .classed() method to apply a different style (like background color) when the class is present.
    3. .style()
    Exercise: Create a set of rectangles in an SVG and use the .style() method to change their fill color to a random color whenever a button is clicked.
    4. .property()
    Exercise: Build a form with an input field. Use the .property() method to read the value of the input field and display it in a paragraph element on the page whenever the input changes.
    5. .text()
    Exercise: Create a button that, when clicked, changes the text content of a specific paragraph element. Use the .text() method to update the paragraph's text to a new message.
    6. .html()
    Exercise: Create a section of the webpage that displays a list of items. When a button is clicked, use the .html() method to replace the entire list with new items represented in HTML format (e.g., using <ul> and <li> elements).
    7. .append()
    Exercise: Create a button that, when clicked, appends a new <div> element to a container. Use the .append() method to add the new element and set its text content to something like "New Item".
    8. .insert()
    Exercise: Build a list of items in a <ul>. Create a button that, when clicked, inserts a new list item at the beginning of the list using the .insert() method.
    9. .remove()
    Exercise: Create a set of circles in an SVG and a button that, when clicked, removes a specific circle from the SVG using the .remove() method. You can select the circle to be removed by its index or class.
    These exercises will help you understand how each D3 method works and how to manipulate elements in the DOM effectively!
*/
