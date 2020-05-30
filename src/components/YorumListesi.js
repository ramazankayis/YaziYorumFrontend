import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import SilModal from './SilModal';
//import { withRouter } from 'react-router-dom';

const YorumListesi = (props) => {
  const [duzenlenecekYorum, setDuzenlenecekYorum] = useState(null);
  const [iptal, setIptal] = useState(false);
  const [yazi, setYazi] = useState({
    display_name: '',
    body: '',
  });
  const [hata, setHata] = useState('');

  const onInputChange = (event) => {
    setYazi({ ...yazi, [event.target.name]: event.target.value });
  };

  const yorumEdit = (id) => {
    setDuzenlenecekYorum(id);
  };

  const onYorumSubmit = (event) => {
    event.preventDefault();
    setHata('');

    if (duzenlenecekYorum) {
      api()
        .put(`/posts/${props.yaziDetay_id}/comments/${duzenlenecekYorum}`, yazi)
        .then((response) => {
          setDuzenlenecekYorum(null);
          console.log('response', response);
          window.location.reload();
        })
        .catch((error) => {
          setHata('Başlık ve yazı içeriği alanları zorunludur');
        });
    }
  };
  useEffect(() => {
    if (props.yorumlar?.display_name && props.yorumlar?.body) {
      setYazi(props.yorumlar);
    }
  }, [props.yorumlar]);

  return (
    <React.Fragment>
      <h3>Yorumlar</h3>
      {props.yorumlar.map((yorum) => {
        if (duzenlenecekYorum === yorum.id) {
          //yorum editleme formu
          return (
            <div className="ui form" key={yorum.id}>
              <div className="field">
                <label>Kullanıcı ismi</label>
                <input
                  type="text"
                  name="display_name"
                  onChange={onInputChange}
                  placeholder="Kullanıcı başlığı..."
                  value={yorum.display_name}
                  disabled
                />
              </div>
              <div className="field">
                <label>Yorum İçeriği</label>
                <textarea
                  rows="3"
                  name="body"
                  onChange={onInputChange}
                  placeholder="Yorum içeriği"
                  value={yazi.body}
                ></textarea>
              </div>
              <button className="ui primary button" onClick={onYorumSubmit}>
                Kaydet
              </button>
              <button className="ui button">İptal et</button>
            </div>
          );
        } else {
          return (
            <div className="ui relaxed list" key={yorum.id}>
              <div className="item">
                {/* <img
                className="ui avatar image"
                src="/images/avatar/small/daniel.jpg"
              /> */}
                <div className="content">
                  <span className="header">{yorum.display_name}</span>
                  <div className="description">{yorum.body}</div>
                  <div className="ui buttons">
                    <button
                      className="ui teal button"
                      onClick={() => yorumEdit(yorum.id)}
                    >
                      Düzenle
                    </button>
                    <SilModal yazi={yazi} push={props.push} />
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </React.Fragment>
  );
};
export default YorumListesi;
