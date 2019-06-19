import * as React from 'react';
import VideoPreview from './render/VideoPreview';


interface Props {
  type: string;
  args: any;
  rest?: any;
  closeModal: any;
}

const RenderModal: React.FC<Props> = ({ type, args, ...rest }) => {
  switch (type) {
    case 'video':
      return <VideoPreview {...args} {...rest} />;
    default:
      return null;
  }
};

export default RenderModal;
