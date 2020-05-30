import React from 'react';
import YorumListesi from './YorumListesi';
import YorumFormu from './YorumFormu';

const YaziYorumlari = (props) => {
  return (
    <React.Fragment>
      <YorumListesi
        yorumlar={props.yorumlar}
        yorum={props.yorum}
        yaziDetayi={props.yaziDetayi}
        yaziDetay_id={props.id}
        push={props.push}
      />
      <YorumFormu
        handleCommentSubmit={props.handleCommentSubmit}
        yaziDetayi={props.yaziDetayi}
        yorumlar={props.yorumlar}
        yorum={props.yorum}
      />
    </React.Fragment>
  );
};
export default YaziYorumlari;
