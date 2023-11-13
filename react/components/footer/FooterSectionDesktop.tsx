import React from 'react'
import {footerSectionLinks,LinkInterface, sectionLinks} from './FooterInterfaces';
import FooterSchema from './FooterSchema';
import styles from '../../styles/customFooter.css'

const FooterSectionDesktop : StorefrontFunctionComponent<footerSectionLinks> = ({ ...data }) => {
    let sectionData = [
        data.shopSectionLinks,
        data.aboutSectionLinks,
        data.helpSectionLinks
    ]
    return <div className={`${styles.footer_container} fl w-100`}> 
    <div className='fl w-100'>
        <div className={` mw9 mr-auto ml-auto pv9`}>
        {
            sectionData?.length > 0 && (
                sectionData.map((sec : sectionLinks)=>{
                    return sec?.firstlevel?.length > 0 && (
                        <div className='fl w-30'>
                            <div className='flex justify-between'>
                                <h4 className='ma0'>
                                    {sec?.__editorItemTitle}
                                </h4>
                            </div>

                            <ul className='pa0'>
                                {sec?.firstlevel?.map((link: LinkInterface) => {return <li key={link.text}><a href={link.url}>{link.text}</a></li>})}
                            </ul>
                        </div >
                    )
                })
            )
        }
        </div>
    </div>

    <div className='fl w-100 pt2'>
        <div className={`mw9 mr-auto ml-auto pv5`}>
            <div className='fl w-50'>
                    <form >
                        <fieldset className="cf bn ma0 pa0">
                            <div className={`${styles.newsletter_block} cf`}>
                                <legend className="pa0 f5 f4-ns mb3 black-80">Sign up to recieve the Project Antelope <br/> newsletter</legend>
                                <input className="br-pill f6 f5-l input-reset ba bw1 fl black-80 bg-white pa3 lh-solid w-60" placeholder="Your Email Address" type="text" name="email-address" id="email-address" />
                                <svg className="w1 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                            </div>
                        </fieldset>
                    </form>
            </div>
            <div className={`${styles.footerSocialMedia} fl w-50 `}>
                <legend className="pa0 f5 f4-ns mb3 black-80 w-100">Connect with us</legend>
            
                <a href="#">
                    <svg className="w1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                </a>
                <a href="#">
                    <svg className="w1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                </a>
                
                <br/>

                {data?.bottomLinks?.firstlevel?.map((link: LinkInterface) => <a key={link.text} href={link.text}>{link.text}</a>  )} &nbsp; All rights reserved
            </div>
        </div>
    </div>
</div>
}


FooterSectionDesktop.schema = FooterSchema;

export default FooterSectionDesktop