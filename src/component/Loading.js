import React from 'react';
import { Spinner, Text } from 'evergreen-ui';

const Loading = (props) => {
  const { label } = props

  return (<div style={{ margin: 24 }}>
    <Spinner marginX="auto" />
    {label && <Text>{label}</Text>}
  </div>);
}

export default Loading;