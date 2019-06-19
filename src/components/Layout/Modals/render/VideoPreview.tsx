import * as React from 'react';
import styled from 'styled-components';
// CONSTANTS
import { URL_YOUTUBE } from 'lib/constants/searchConfig';
// ASSETS
import { media } from 'lib/styles';

interface Props {
  trailerLink: string;
}
// EXPORTED COMPONENT
const VideoPreview: React.FC<Props> = ({ trailerLink }) => {
  return (
    <Content>
      <iframe src={URL_YOUTUBE + trailerLink} title="trailer" allowFullScreen />
    </Content>
  );
};

export default VideoPreview;

const Content = styled.div`
  display: grid;
  grid-gap: 20px;
  align-content: center;
  justify-items: center;

  iframe {
    height: 400px;
    width: 90%;

    ${media.smallPhone`
      height: 300px;
      width: 85%;
    `};
  }
`;
