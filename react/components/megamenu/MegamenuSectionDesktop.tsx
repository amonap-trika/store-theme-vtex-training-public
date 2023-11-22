import React, { useState } from 'react'
import {megamenuType,firstLevelMenu,secondLevelMenu} from './MegamenuInterfaces';
import MegamenuSchema from './MegamenuSchema';
import styles from '../../styles/customMegamenu.css'

const MegamenuSectionDesktop : StorefrontFunctionComponent<megamenuType> = ({ ...megamenuData  }) => {

    const [activeMegamenu, setActiveMegamenu] = useState(-1);
    const [activeFirstLevelMegamenu, setActiveFirstLevelMegamenu] = useState(-1);
    let [multilevelData, setMultilevelData] = useState<Array<secondLevelMenu>>();

    const showMegamenu = (index : number, secondLevelMenu : firstLevelMenu)=>{
        if(!secondLevelMenu) {
            setActiveMegamenu(-1);
            return;
        }

        setActiveMegamenu(index);
        setMultilevelData(secondLevelMenu.firstLevel);
        setActiveFirstLevelMegamenu(0);
    }


    const hideMegamenu = ()=>{
        setActiveMegamenu(-1);
    }

    const showFirstLevelMegaMenu = (index : number)=>{
        setActiveFirstLevelMegamenu(index);
    }

    return <div>
        {megamenuData?.megamenu?.length > 0 && ( 
            <div  className={` ${styles.megamenu_container} fl w-100`}>
                <div className={`${styles.megamenu_navbar} fl w-100`}>
                    <ul>
                        { megamenuData.megamenu?.map((mainMenu: firstLevelMenu,index:number) => {
                            return  <li>
                                    <a className={`f6 f5-l link  pa4 ph7`}
                                    key={mainMenu.text}
                                    href={mainMenu.url} 
                                    onMouseOver={()=>showMegamenu(index,mainMenu)}
                                    >
                                        {mainMenu.text}
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                </div>

                {(activeMegamenu !== -1) && multilevelData && (
                    <div  className={` ${styles.megamenu_section} fl w-100 pa1 ma1`} onMouseLeave={hideMegamenu}>
                        <div className='fl w-100'>
                            <div className={`fl w-20 pa2`}></div>
                            <div className={`fl w-20`} >
                                <ul className={` ${styles.firstlevel}`}>
                                { multilevelData?.map((firstLevel: secondLevelMenu,index:number) => {return <li className='pa3' key={firstLevel.text} onMouseOver={()=>showFirstLevelMegaMenu(index)}><a href={firstLevel.url}>{firstLevel.text} <span className=''> {'>'}</span></a></li>})}
                                </ul>
                            </div>

                            {(activeFirstLevelMegamenu !== -1) && (
                                <div className='fl w-40'>
                                    <ul className={` ${styles.secondlevel} fl w-100 pa2`} >
                                        {multilevelData[activeFirstLevelMegamenu]?.secondLevel?.map((secondLevel ) => {return <li key={secondLevel.text} className='fl w-30 pa2'><a href={secondLevel.url}>{secondLevel.text}</a></li>})}
                                    </ul>
                                </div>
                            )}

                            <div className={`fl w-20 pa2`}></div>

                        </div>
                    </div>
                )}
                
            </div>
        )}
    </div>
}


MegamenuSectionDesktop.schema = MegamenuSchema;

export default MegamenuSectionDesktop