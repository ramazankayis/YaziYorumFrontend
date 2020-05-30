import React, { useEffect, useState } from 'react';
import { api } from '../api';
import YaziYorumlari from './YaziYorumlari';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SilModal from './SilModal';

const YaziDetayi = (props) => {
  const { id } = props.match.params;
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);
  console.log('YaziDetayi props=', props);
  const handleCommentSubmit = (event, yorum) => {
    event.preventDefault();
    api()
      .post(`/posts/${id}/comments`, yorum)
      .then((response) => {
        setYorumlar([...yorumlar, response.data]);
        //setYorum(YORUM_BASLANGIC);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
      .then((responses) => {
        setYaziDetayi(responses[0].data);
        setYorumlar(responses[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>

      <div className="ui buttons">
        <Link to={`/posts/${yaziDetayi.id}/edit`} className="ui teal button">
          Düzenle
        </Link>
        <SilModal yazi={yaziDetayi} push={props.history.push} />
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari
        yorumlar={yorumlar}
        handleCommentSubmit={handleCommentSubmit}
        yaziDetayi={yaziDetayi}
        id={id}
        push={props.history.push}
      />
    </React.Fragment>
  );
};
export default YaziDetayi;
