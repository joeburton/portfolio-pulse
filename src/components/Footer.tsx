import React from "react";

import styles from "../css/Footer.module.css";

interface FooterProps {
  content: any;
}
const Footer = ({ content }: FooterProps) => {
  if (!content) {
    return <div />;
  }

  return (
    <footer data-testid="footer" className={styles.footer}>
      <p>
        <span>{content.copy}</span>
      </p>
    </footer>
  );
};

export default Footer;
