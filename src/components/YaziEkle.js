import React from 'react';
import YaziFormu from './YaziFormu';

const YaziEkle = (props) => {
  console.log('yaziekle props=', props);

  return (
    <div>
      <h1>Yazı ekleme Formu</h1>
      <YaziFormu />
    </div>
  );
};
export default YaziEkle;
