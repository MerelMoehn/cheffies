import Alert from 'react-bootstrap/Alert';
import useAlert from '../hooks/useAlert';
import styles from "../styles/Alert.module.css";

// This code is based on Jeffrey Yu's blog
// https://dev.to/jeffreythecoder/set-up-react-global-alert-popup-in-10mins-36l3
const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
        <Alert className={styles.FixAlert} variant={type}>
            {text}
        </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;