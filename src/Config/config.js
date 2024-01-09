const config = {
    // graph configuration
    graph: {
        node: {
            NODE_COLOR: "#00308F",
            NODE_IN_PATH_COLOR: "#FF7F50",
            SOURCE_NODE_COLOR: "#006A4E",
            TARGET_NODE_COLOR: "#AA0000",
            NODE_SIZE: 6,
            NODE_LABEL_FONT_SIZE: 16,
            NODE_LABEL_FONT_COLOR: "white"
        },
        link: {
            ARROW_SIZE: 4,
            LINK_COLOR: "#72A0C1",
            LINK_IN_PATH_COLOR: "#FF4500",
            LINK_WIDTH: 1,
            LINK_LABEL_FONT_SIZE: 16,
            LINK_LABEL_FONT_COLOR: "black",
            DISTANCE_FROM_LABEL_AND_LINK: 3
        },
        global: {
            FIT_VIEW: false,
        }
    },
};

module.exports = config;
