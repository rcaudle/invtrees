var $ = go.GraphObject.make;
var myDiagram = $(go.Diagram, "myDiagramDiv", {
    // center the diagram contents
    initialContentAlignment: go.Spot.Center,
    // enable Ctrl-Z to undo and Ctrl-Y to redo
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
});

// define a simple Node template
myDiagram.nodeTemplate =
$(go.Node, "Vertical",
    { background: $(go.Brush, "Linear", { 1: "rgb(61, 61, 61)", 0: "rgb(119, 119, 119)" }) },
    $(go.TextBlock,
        {
            maxSize: new go.Size(160, NaN), 
            margin: 12,
            font: "16px sans-serif",
            stroke: "white",
            alignment: go.Spot.Top
        },
        new go.Binding("text", "question")
    ),
    $(go.TextBlock,
        {
            margin: 4,
            font: "12px sans-serif",
            stroke: "white"
        },
        new go.Binding("text", "node")
    ),
    $("TreeExpanderButton")
);  // end Node

// define a Link template that routes orthogonally, with no arrowhead
myDiagram.linkTemplate =
$(go.Link,
  { routing: go.Link.Orthogonal, corner: 5 },
  $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

var myModel = $(go.TreeModel);
myModel.nodeDataArray =[ 
// the "key" and "parent" property names are required,
  // but you can add whatever data properties you need for your app
  { key: "1",               node: "root node",      question: "(Q-AND) Can we verify this attack originated from spoofed IPs?" },
  
  // Level 2
  { key: "10",  parent: "1", node: "logical node",   question: "(Q-OR) Can we recover a list of source IPs from the attack?" },
  { key: "11",  parent: "1", node: "logical node",   question: "(Q-AND) Can we verify the source IPs are spoofed?" },

  // Level 3 - (10)
  { key: "20",  parent: "10", node: "atomic",   question: "(Q-ATOM) Can we recover a list of IP addresses from firewall logs?" },
  { key: "21",  parent: "10", node: "atomic",   question: "(Q-ATOM) Can we recover a list of IP addresses from IDS/IPS logs?" },
  { key: "22",  parent: "10", node: "atomic",   question: "(Q-ATOM) Can we recover a list of IP addresses from WAF logs?" },
  { key: "23",  parent: "10", node: "atomic",   question: "(Q-ATOM) Can we recover a list of IP addresses from packet captures?" },

  // Level 3 - (11)
  { key: "30",  parent: "11", node: "logical node",   question: "(Q-AND) Can we verify a low level of entropy for the TTL value from the source IPs?" },
];

myDiagram.model = myModel;