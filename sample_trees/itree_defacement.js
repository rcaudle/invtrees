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
  { key: "1",               node: "root node",       question: "(Q-AND) Should we escalate this event for further investigation?" },
  
  // Level 2
  { key: "10",  parent: "1", node: "logical node",   question: "(Q-OR) Can we verify this alert included malicous activity?" },
  { key: "11",  parent: "1", node: "atomic",         question: "(Q-ATOM) Can we verify the activity was successfully executed?" },

  // Level 3 - (10)
  { key: "20",  parent: "10", node: "atomic",       question: "(Q-ATOM) Can we verify the activity is from blacklisted or known viruses?" },
  { key: "21",  parent: "10", node: "logical node", question: "(Q-AND)  Can we verify the activity is related to 'fileless malware'?" },
  { key: "22",  parent: "10", node: "atomic",       question: "(Q-ATOM) Can we verify the activity resulted in outbound connections?" },

  // Level 4 - (21)
  { key: "30",  parent: "21", node: "atomic",       question: "(Q-ATOM) Can we verify the activity originated from a Microsoft Office document?" },
  { key: "31",  parent: "21", node: "atomic",       question: "(Q-ATOM) Can we verify the activity was executed using powershell?" },
];

myDiagram.model = myModel;