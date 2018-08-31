import React from 'react';

const Title = (props) => 
  <div>
    <img 
      className='logo-img'
      src={'https://fiu-assets-2-syitaetz61hl2sa.stackpathdns.com/static/use-media-items/51/50841/full-1160x979/58f5bc91/Reuters%20TV%20logo%20vertical.png?resolution=0'} 
      alt={'Reuters TV'}
    />
    <h2 
      className={`title ${props.showTitle ? 'show' : ''}`}
    >
      {props.title}
    </h2>
  </div>;

export default Title;
