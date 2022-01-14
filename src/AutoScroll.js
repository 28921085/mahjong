import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import React from 'react';
const Content = (props) => {

  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
    const style={
        height:'200px'
    }
  return (
      <div style={style}onChange={scrollToBottom}>
    
      {props.sa}
    
    </div>
  );
};

export default (props) => (
  <ScrollToBottom>
    <Content sa={props.sa} />
  </ScrollToBottom>
);