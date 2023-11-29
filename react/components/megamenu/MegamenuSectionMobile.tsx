import React, { useState } from 'react'
import {megamenuType,firstLevelMenu, secondLevelMenu} from './MegamenuInterfaces';
import MegamenuSchema from './MegamenuSchema';
import styles from '../../styles/customMegamenu.css'

const MegamenuSectionMobile : StorefrontFunctionComponent<megamenuType> = ({ ...megamenuData  }) => {

    const [activeMegamenu, setActiveMegamenu] = useState(-1);
    const [activeFirstLevelMegamenu, setActiveFirstLevelMegamenu] = useState(-1);
    let [multilevelData, setMultilevelData] = useState<Array<secondLevelMenu>>();

    const showMainMegamenu = (index : number, secondLevelMenu : firstLevelMenu)=>{

        if(secondLevelMenu.firstLevel.length <= 0 ) return;

        setMultilevelData(secondLevelMenu.firstLevel);
        setActiveMegamenu(index);
    }


    const goToMainMenu = ()=>{
        setActiveMegamenu(-1);
    }

    const goToFirstLevelMenu = ()=>{
        setActiveFirstLevelMegamenu(-1);
    }
    
    
    const showFirstLevelMegaMenu = (index : number)=>{
        setActiveFirstLevelMegamenu(index);
    }


    return <div  className={`${styles.megamenu_container} fl w-100`}>
        { megamenuData?.megamenu?.length > 0 && (
            <div className={`${styles.drower_section} fl w-100`}>

                { (activeMegamenu == -1) && (
                    <ul> 
                        { megamenuData.megamenu?.map((mainMenu: firstLevelMenu,index:number) => {
                            return <li key={mainMenu.text}>
                                
                                <a className={`pv1 ph3`}  href={mainMenu.url}>
                                    {mainMenu.text} 
                                </a>

                                <span className='' onClick={()=>showMainMegamenu(index, mainMenu)}>
                                    <svg className="w1" data-icon="chevronRight" viewBox="0 0 32 32">
                                        <title>chevronRight icon</title>
                                        <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z"></path>
                                    </svg>
                                </span>
                            </li>
                            })
                        }
                    </ul>
                )}

                {(activeMegamenu >= 0) && (activeFirstLevelMegamenu == -1) && multilevelData && (
                   <div className='pl1'>
                        <span className='' onClick={goToMainMenu}>
                            <svg className="w1" data-icon="chevronLeft" viewBox="0 0 32 32">
                                <title>chevronLeft icon</title>
                                <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
                            </svg>
                            <b className="pl1">Go Back</b>
                        </span>
                        <div className={`${styles.drower_activated_link}`}>
                            <a href={megamenuData?.megamenu[activeMegamenu].url}>{megamenuData?.megamenu[activeMegamenu].text}</a>
                        </div>
                        <ul>
                            {
                                multilevelData?.map((firstLevel: secondLevelMenu, index:number) => {
                                    return <li  key={firstLevel.text}>
                                        <a className='pv1 ph3 pl4' href={firstLevel.url}>
                                            {firstLevel.text}
                                        </a>

                                        <span className='' onClick={()=>showFirstLevelMegaMenu(index)}>
                                            <svg className="w1" data-icon="chevronRight" viewBox="0 0 32 32">
                                                <title>chevronRight icon</title>
                                                <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z"></path>
                                            </svg>
                                        </span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                )}

                {(activeFirstLevelMegamenu >= 0) &&  multilevelData && (
                   <div className='pl1'>
                        <span className='' onClick={goToFirstLevelMenu}>
                            <svg className="w1" data-icon="chevronLeft" viewBox="0 0 32 32">
                                <title>chevronLeft icon</title>
                                <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
                            </svg>
                            <b className="pl1">Go Back</b>
                        </span>
                        <div className={`${styles.drower_activated_link}`}>
                            <a href={megamenuData?.megamenu[activeMegamenu].url}>{megamenuData?.megamenu[activeMegamenu].text}</a>
                            <a className="pl2" href={multilevelData[activeFirstLevelMegamenu].url}>{multilevelData[activeFirstLevelMegamenu].text}</a>
                        </div>
                        <ul>
                            {multilevelData[activeFirstLevelMegamenu]?.secondLevel?.map((secondLevel ) => {
                                return <li  key={secondLevel.text}>
                                    <a className='pv1 ph3 pl5' href={secondLevel.url}>
                                        {secondLevel.text} 
                                    </a>
                                </li>
                            })}
                        </ul>
                    </div>
                )} 
            </div>
        )}
    </div>
}

MegamenuSectionMobile.schema = MegamenuSchema;

export default MegamenuSectionMobile