import React, { useEffect, useState } from 'react';
import YaziFormu from './YaziFormu';
import { api } from '../api';


const YaziDuzenle = (props) => {
  const { id } = props.match.params;
 
  const [yazi, setYazi] = useState({});
  useEffect(() => {
    api()
      .get(`/posts/${id}`)
      .then((response) => {
        console.log(' yazi düzenle response=', response);

        setYazi({
          title: response.data.title,
          content: response.data.content,
          id: response.data.id,
        });
      });
  }, []);

  console.log("yazı==",yazi);
  
  return (
    <div>
      <h1>Yazı Duzenleme Formu</h1>
      <YaziFormu yazi={yazi} />
      {/* <YorumDuzenle yazi={yazi} /> */}
    </div>
  );
};
export default YaziDuzenle;
