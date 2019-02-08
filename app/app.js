var markDiagram = undefined

jsPlumb.ready(function () {

    markDiagram = window.jsp = new MarkDiagram()
    var instance = markDiagram.jsPlumbInstance

    // suspend drawing and initialise.
    instance.batch(function () {

        markDiagram.addEndpoints("Window1", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
        markDiagram.addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
        markDiagram.addEndpoints("Window2", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
        markDiagram.addEndpoints("Window4", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);

        markDiagram.initWindowListeners(".flowchart-demo .window");

        // connect a few up
        markDiagram.connect("Window1RightMiddle", "Window2LeftMiddle");
        markDiagram.connect("Window2RightMiddle", "Window3LeftMiddle");
        markDiagram.connect("Window2BottomCenter", "Window4LeftMiddle");
        markDiagram.connect("Window3BottomCenter", "Window4TopCenter");
        //

        //
        // listen for clicks on connections, and offer to delete connections on click.
        //
        markDiagram.bindClick(function (conn, originalEvent) {
           if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
               markDiagram.deleteConnection(conn);
            // conn.toggleType("basic");
        });

        markDiagram.bindConnectionDrag(function (connection) {
            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        markDiagram.bindConnectionDragStop(function (connection) {
            console.log("connection " + connection.id + " was dragged");
        });

        markDiagram.bindConnectionMoved(function (params) {
            console.log("connection " + params.connection.id + " was moved");
        });

        markDiagram.bindConnection(function (connection) {
            // console.log("connection " + params.connection.id + " was created");
            console.log("connection was created");
        });

        markDiagram.bindDisconnection(function (connection, originalEvent) {
            // console.log("connection " + params.connection.id + " was created");
            console.log("connection was deleted");
        });
    });

    // jsPlumb.fire("jsPlumbDemoLoaded", instance);

});
