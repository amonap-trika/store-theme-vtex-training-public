import React, { useEffect, useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import documents from '../../graphql/getContactData.graphql'

const ContactUsList = () => {
  let [contactListData, setContactListData] = useState<any>([]);
  let [pageno, setPageNo] = useState(1);
  const [showSeeMore, setSeeMoreStatus] = useState(true);
  const [message, setMessage] = useState<any>(null);
  
  const [fetchContacts, { data,error }] = useLazyQuery(documents, {
    variables: {
      acronym: 'AM',
      fields: [
        "id",
        "name",
        "subject",
        "age",
      ],
      schema: '',
      page: pageno,
      pageSize: 1
    },
    notifyOnNetworkStatusChange: true,
    ssr: false,
  });

  useEffect(() => {
    let contactData : any = [];
    if(data){
      if(data?.documents.length == 0){
        setMessage('No more data is available to load');
        setSeeMoreStatus(false); 
        return;
      } else {
        data?.documents.map((row: any, rowInd : number)=> {
          row.fields.map((col : any)=>{
              if(!contactData[rowInd]) contactData[rowInd] = [];
              contactData[rowInd][col.key] = col.value;
          });
        });
        
        setContactListData([...contactListData,...contactData]);
      }
    }
    if (error) {
      setSeeMoreStatus(false);
      console.log(error);
      setMessage('There is some error');
    }
  }, [data, error]);


  useEffect(() => {
    fetchContacts();
  }, [pageno]);
  
  const seeMoreData = ()=>{
    pageno += 1;
    setPageNo(pageno);
  }

  return (
    <div className='fl w-100 pb9'>
        <div className={`mw9 mr-auto ml-auto`}>
          <h3 className='tc'>Contact us list (Using GraphQL)</h3>
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
                <tr key={`cs-${index}`} className='bg-black-60 c-on-base--inverted text-white'>
                  <td className='tc'>{index+1}</td>
                  <td className='tc'>{item?.id}</td>
                  <td className='tc'>{item?.name}</td>
                  <td className='tc'>{item?.subject}</td>
                  <td className='tc'>{item?.age}</td>
                </tr>
              ))}
              {(message || contactListData.length == 0) && (<tr key='cs-error-or-no-data'>
                  <td className='tc' colSpan={5}>{message ? message : 'No data found' }</td>
                </tr>
              )}
              {showSeeMore && ( <tr><td className='tc' colSpan={5}><button type="button" className='b--black-0125 bg-muted-2 br4 pa3 white' onClick={seeMoreData}>
                See More
              </button></td></tr>
              )}
              
            </tbody>
          </table>
        </div>
    </div>
  );
}


export default ContactUsList

