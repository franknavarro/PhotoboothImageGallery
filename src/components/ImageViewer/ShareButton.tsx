import { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import ShareIcon from '@material-ui/icons/Share';

interface ShareButtonProps {
  link: string;
  className?: string;
}

const ShareButton: FC<ShareButtonProps> = ({ link, className = '' }) => {
  if (!!navigator.share) {
    return (
      <IconButton
        className={className}
        onClick={() => {
          navigator.share({
            title: 'Photobooth Image',
            text: 'Check out my photobooth image',
            url: link,
          });
        }}
      >
        <ShareIcon />
      </IconButton>
    );
  }
  return (
    <IconButton className={className} href={link} download>
      <SaveAltRoundedIcon />
    </IconButton>
  );
};

export default ShareButton;
