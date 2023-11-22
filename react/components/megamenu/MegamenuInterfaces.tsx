export interface menuInterface {
    text: string,
    url : string
}

export type secondLevelMenu = {
    text : string;
    url : string;
    secondLevel : menuInterface[];
}

export type firstLevelMenu = {
    text : string;
    url : string;
    firstLevel : secondLevelMenu[];
}

export type megamenuType = {
    megamenu : firstLevelMenu[]
}
