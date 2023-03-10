import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

// This code is from Code Institute Walkthrough project Moments
const Asset = ({ spinner, src, message }) => {
  return (
    <div data-testid="asset" className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" data-testid="spinner" />}
      {src && <img className={styles.Image} src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;