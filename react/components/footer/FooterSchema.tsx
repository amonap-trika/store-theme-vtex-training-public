
let   LinkData = {
    text: {
        title: 'Text',
        type: 'string'
    },
    url: {
        title: 'URL',
        type: 'string'
    }
}

let FooterSchema = {
    title: 'Footer',
    type: 'object',
    properties: {
        shopSectionLinks: {
            title: 'Shop',
            type: 'object',
            properties: {
                __editorItemTitle: {
                    title: "Shop Section Heading",
                    type: "string",
                    default:"Shop"
                },
                firstlevel : {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {...LinkData}
                    }
                }
            }
        },
        aboutSectionLinks: {
            title: 'About',
            type: 'object',
            properties: {
                __editorItemTitle: {
                    title: "About Section Heading",
                    type: "string",
                    default:"About"
                },
                firstlevel : {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {...LinkData}
                    }
                }
            }
        },
        helpSectionLinks: {
            title: 'Help',
            type: 'object',
            properties: {
                __editorItemTitle: {
                    title: "Help Section Heading",
                    type: "string",
                    default:"Help"
                },
                firstlevel : {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {...LinkData}
                    }
                }
            }
        },
        
        bottomLinks: {
            title: 'Footer Bottom',
            type: 'object',
            properties: {
                __editorItemTitle: {
                    title: "Footer Bottom Section Heading",
                    type: "string",
                    default:"Footer Bottom"
                },
                firstlevel : {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {...LinkData}
                    }
                }
            }
        }
    }
}

export default FooterSchema