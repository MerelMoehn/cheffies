import Alert from 'react-bootstrap/Alert';
import useAlert from '../hooks/useAlert';
import styles from "../styles/Alert.module.css";

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