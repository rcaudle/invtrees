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
  { key: "1",               node: "root node",      question: "(Q) Can we verify the email was sent from the CEO's mailbox?" },
  
  { key: "2",  parent: "1", node: "logical node",   question: "(Q-AND) Can we verify the vector for delivering the email?" },
  { key: "3",  parent: "1", node: "logical node",   question: "(Q-AND) Can we verify the access to the CEO's account?" },
  { key: "4",  parent: "2", node: "logical node",   question: "(Q-OR) Were emails sent via MAPI/RPC?" },
  { key: "5",  parent: "2", node: "logical node",   question: "(Q-OR) Were emails sent via ActiveSync?" },
  { key: "6",  parent: "2", node: "logical node",   question: "(Q-OR) Were emails sent via SMTP?" },
  { key: "7",  parent: "2", node: "logical node",   question: "(Q-OR) Were emails sent via OutlookAnywhere?" },
  { key: "8",  parent: "2", node: "logical node",   question: "(Q-OR) Were emails sent via Exchange WebServices?" },

  { key: "9",  parent: "6", node: "logical node",   question: "(Q-AND) Can we recover the presence of SMTP headers in the original email?" },
  { key: "10", parent: "6", node: "logical node",   question: "(Q-AND) Can we verify the presence of the original emails in the log events from the MTA (SMTP Gateway)?" },
  
  { key: "11", parent: "9", node: "atomic", question: "(Q-ATOM) Can we recover a copy of the original email from the subject computer?" },

  { key: "12", parent: "9", node: "atomic",   question: "(Q-ATOM) Does the email contain SMTP headers (RFC 821)?" },

  { key: "21", parent: "10", node: "atomic", question: "(Q-ATOM) Can we recover a copy of the log events from the MTA?." },
  { key: "26", parent: "10", node: "atomic", question: "(Q-ATOM) Can we recover a copy of the log events from a centralized log repository?." },
  { key: "30", parent: "7", node: "atomic", question: "(Q-ATOM) Can we recover the presence of activity in the Exchange Server logs?"},
  { key: "31", parent: "7", node: "atomic", question: "(Q-ATOM) Can we recover the presence of activity in the IIS logs?"},
  { key: "32", parent: "8", node: "atomic", question: "(Q-ATOM) Can we recover the presence of activity in the Exchange Server logs?"},
  { key: "33", parent: "8", node: "atomic", question: "(Q-ATOM) Can we recover the presence of activity in the IIS logs?"},
  { key: "34", parent: "5", node: "atomic", question: "(Q-ATOM) Can we recover the presence of activity in the Exchange Server logs?"},
  { key: "35", parent: "4", node: "atomic", question: "(Q-ATOM) Can we recover the presence of activity in the Exchange Server logs?"},

];

myDiagram.model = myModel;