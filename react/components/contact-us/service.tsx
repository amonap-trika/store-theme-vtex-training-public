import React, { useEffect, useState } from 'react';

const ContactUsListUsingService = () => {
  let [contactListData, setContactListData] = useState<any>([]);
  const [message, setMessage] = useState<any>(null);

  const fetchContacts = async () => {
    const res = await fetch('/v0/contact');
    if (res.ok) {
      const response = await res.json();

      if(response.length == 0) {
        setMessage('No more data is available to load');
        return;
      } else {
        setContactListData(response);
      }      
    } else {
        setMessage('There is some error');
    }
  }


  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className='fl w-100 pb9'>
        <div className={`mw9 mr-auto ml-auto`}>
        <h3 className='tc'>Contact us list (Using Services)</h3>
          <table className='fl w-100' >
            <thead className='bg-rebel-pink c-danger--faded pa4 text-white'>
              <tr>
                <th>#</th>
                <th>Document Id</th>
                <th>Name</th>
                <th>Subject </th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {contactListData && contactListData.map((item: any, index: any) => (
                <tr key={index} className='bg-black-60 c-on-base--inverted text-white'>
                  <td className='tc'>{index+1}</td>
                  <td className='tc'>{item?.id}</td>
                  <td className='tc'>{item?.name}</td>
                  <td className='tc'>{item?.subject}</td>
                  <td className='tc'>{item?.age}</td>
                </tr>
              ))}
              {(message || contactListData.length == 0) && (<tr key='error-or-no-data'>
                  <td className='tc' colSpan={5}>{message ? message : 'No data found' }</td>
                </tr>
              )}
              
            </tbody>
          </table>
        </div>
    </div>
  );
}


export default ContactUsListUsingService

