export interface LinkInterface {
    text: string,
    url : string
}

export type sectionLinks = {
    title : string;
    __editorItemTitle : string,
    firstlevel : LinkInterface[];
}

export type footerSectionLinks  = { 
    shopSectionLinks : sectionLinks;
    aboutSectionLinks : sectionLinks;
    helpSectionLinks : sectionLinks;
    bottomLinks : sectionLinks;
}


