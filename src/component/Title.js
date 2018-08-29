import React from 'react';

const Title = (props) => <h2 className={`title ${props.showTitle ? 'show' : ''}`}>{props.title}</h2>;

export default Title;
