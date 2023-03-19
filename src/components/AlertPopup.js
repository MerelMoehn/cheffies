import Alert from 'react-bootstrap/Alert';
import useAlert from '../hooks/useAlert';

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
        <Alert className='mt-2' variant={type}>
            {text}
        </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;