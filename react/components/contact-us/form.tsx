import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import ReCAPTCHA from 'react-google-recaptcha';
import uploadFile from '../../graphql/mutation/uploadFileFromContactUs.graphql';
import createDocument from '../../graphql/mutation/postContactUsData.graphql';
import appSettings from '../../graphql/getAppSettings.graphql'; 

const ContactUsForm = () => {
    const intialFormData = {
        name: "",
        email: "",
        age: "",
        subject: "",
        comment: "",
        attachment: ""
    }

    const captchaRef = useRef(null)
    const [token, setToken] = useState('')
    const [formValid, setFormStatus] = useState(false);
    const [sitekey, setSitekey] = useState('')
    const [formData, setFormData] = useState({...intialFormData});
    const [save] = useMutation(createDocument)
    const [uploadfle] = useMutation(uploadFile)

    /* Google Captcha Start */
    const handleRecaptchaChange = (value: any) => {
        if (value) {
            setToken(value)
        }
    }
   
    const { data } = useQuery(appSettings, {
        variables: {
          version: process.env.VTEX_APP_VERSION,
        },
        ssr: false,
    });
    
    useEffect(() => {
    let siteKey = data ? JSON.parse(data?.publicSettingsForApp?.message)?.recaptchaKey : '';
    if(siteKey){
        setSitekey(siteKey);
    }
    }, [data])

     /* Google Captcha End */


    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setFormData((prevProps) => ({
            ...prevProps, [name]: value
        }))
    };
    
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target as any;
        let fileUrl = '';

        if( files.length > 0 ) {
            const { data } = await uploadfle({
                variables: { file: files[0] },
            });
            fileUrl = data.uploadFile.fileUrl;
            setFormStatus(true);
        } else {
            setFormStatus(false);
        } 

        setFormData((prevProps) => ({
            ...prevProps, attachment: fileUrl
        }))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setFormStatus(true);
        const object: any = {
            fields: Object.keys(formData).map((key: string) => {
                let val = formData[key as keyof typeof formData];
                if(!val) {
                    setFormStatus(false);
                    alert(`Please provide ${key} field`);
                    return;
                } 
                return({ key, value: formData[key as keyof typeof formData] })
            })
        }

        if(!formValid) return;   

        if(!token) {
            alert("Please validate google captcha");
            return;
        }

        try {
            const formData = save({
                variables: {
                    document: object,
                    schema: '',
                    dataEntity: "Contact Form-AKM",
                    account: "trika",
                    acronym: "AM"
                }
            }).then((e)=>{
                console.log(e); // This will give an docuement id in return
                if (formData !== undefined) {
                    setFormData({...intialFormData})
                }
            })
            
        } catch (err) {
            console.log(err)
            alert("This is some error, Please check console");
        }
    }

    return (
        <div className='pa4 block-80'>
            <form className='measure center' onSubmit={handleSubmit}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Contact Us</legend>
                    <div className="mt4">
                        <input className="br-pill f6 f5-l input-reset ba bw1 bg-white pa3 lh-solid w-100" type="text" name="name" id="name"
                            value={formData.name}
                            placeholder='Name'
                            onChange={handleInputChange} ></input>
                    </div>

                    <div className="mt4">
                        <input className="br-pill f6 f5-l input-reset ba bw1 bg-white pa3 lh-solid w-100" type="text" name="age" id="age"
                            value={formData.age}
                            placeholder='Age'
                            onChange={handleInputChange} ></input>
                    </div>
                    <div className="mt4">
                        <input className="br-pill f6 f5-l input-reset ba bw1 bg-white pa3 lh-solid w-100" type="text" name="email" id="email"
                            value={formData.email}
                            placeholder='Email'
                            onChange={handleInputChange} ></input>
                    </div>
                    <div className="mt4">
                        <input className="br-pill f6 f5-l input-reset ba bw1 bg-white pa3 lh-solid w-100" type="text" name="subject" id="subject"
                            value={formData.subject}
                            placeholder='Subject'
                            onChange={handleInputChange} ></input>
                    </div>
                    <div className="mt4">
                        <textarea className="br-pill f6 f5-l input-reset ba bw1 bg-white pa3 lh-solid w-100" name="comment" id="comment"
                            value={formData.comment}
                            placeholder='Message/Comments'
                            onChange={handleInputChange} ></textarea>
                    </div>

                    <div className="mt4">
                        <input className="b pa2 input-reset ba bg-transparent" type="file" name="attachment" id="attachment"
                            onChange={(e) => { handleFileChange(e) }} />
                    </div>
                    <div className="mt4">
                        {sitekey && <ReCAPTCHA onChange={(e) => { handleRecaptchaChange(e) }}
                            sitekey={sitekey}
                            ref={captchaRef}
                        />}
                    </div>
                    <div className="mt4">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit" disabled={!token || !formValid}></input>
                    </div>

                </fieldset>
            </form>
        </div>
    )
};

export default ContactUsForm;