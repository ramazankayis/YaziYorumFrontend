import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { api } from '../api';

const YaziFormu = (props) => {
  const [yazi, setYazi] = useState({
    title: '',
    content: '',
  });
  const [hata, setHata] = useState('');

  const onInputChange = (event) => {
    setYazi({ ...yazi, [event.target.name]: event.target.value });
  };

  console.log('yazi formu1  :>> ', yazi);
  console.log('props :>> ', props.yazi);
  const onFormSubmit = (event) => {
    event.preventDefault();
    setHata('');
    // console.log('yazı formu =', props.yazi.title);

    if (props.yazi?.title) {
      api()
        .put(`/posts/${props.match.params.id}`, yazi)
        .then((response) => {
          props.history.push(`/posts/${props.match.params.id}`);
        })
        .catch((error) => {
          setHata('Başlık ve yazı içeriği alanları zorunludur');
        });
    } else {
      api()
        .post(`/posts/`, yazi)
        .then((response) => {
          props.history.push('/');
        })
        .catch((error) => {
          setHata('Başlık ve yazı içeriği alanları zorunludur');
        });
    }
  };

  useEffect(() => {
    if (props.yazi?.title && props.yazi?.content) {
      setYazi(props.yazi);
      console.log('yazi formu2  :>> ', yazi);
    }
  }, [props.yazi]);

  console.log(props.yazi);

  return (
    <React.Fragment>
      {hata && (
        <div className="ui error message">
          <div className="header">Hata</div>
          <p>{hata}</p>
        </div>
      )}

      <div className="ui form">
        <div className="field">
          <label>Yazı Başlığı</label>
          <input
            type="text"
            name="title"
            onChange={onInputChange}
            placeholder="yazı başlığı..."
            value={yazi.title}
          />
        </div>
        <div className="field">
          <label>Yazi İçeriği</label>
          <textarea
            rows="3"
            name="content"
            onChange={onInputChange}
            placeholder="yazi içeriği"
            value={yazi.content}
          ></textarea>
        </div>
        <button className="ui primary button" onClick={onFormSubmit}>
          Gönder
        </button>
        <button className="ui button">İptal et</button>
        <Link to="/">Anasayfaya dön</Link>
      </div>
    </React.Fragment>
  );
};
export default withRouter(YaziFormu);
