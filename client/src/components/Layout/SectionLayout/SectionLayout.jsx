import styles from "./SectionLayout.module.scss";
import Container from "../Container";
import { SectionMenu } from "../SectionMenu/SectionMenu";

export const SectionLayout = ({ title, items, children }) => {
  return (
    <Container>
      <div className={styles.layout}>
        <SectionMenu title={title} items={items} />

        <section className={styles.content}>{children}</section>
      </div>
    </Container>
  );
};
