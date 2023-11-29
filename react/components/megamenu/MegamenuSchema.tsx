let   menuData = {
    text: {
        type: "string",
        title: "sub Menu title ",
    },
    url: {
        type: "string",
        default: "#",
        title: "Menu Link",
    },
    isActive: {
        type: "boolean",
        default: true,
        title: "Is Active",
    }
}

let MegamenuSchema = {
    title: "Megamenu",
    type: "object",
    properties: {
        megamenu : {
            type: "array",
            title: "Mega menu",
            items: {
                properties: {
                    text: {
                        title: "Menu Display Name",
                        type: "string",
                    },
                    url: {
                        title: "Menu Url",
                        type: "string",
                    },
                    isActive: {
                        title : "Active Status",
                        type : "boolean"
                    },
                    firstLevel: {
                        type: "array",
                        items: {
                            properties: {
                                ...menuData,
                                secondLevel: {
                                    type: "array",
                                    title: "Submenu",
                                    items: {
                                        properties: {
                                            ...menuData
                                        }
                                    }
                                }                  
                            }
                        }
                    }
                }
            }
        }
    }
}

export default MegamenuSchema