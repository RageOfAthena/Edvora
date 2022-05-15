import styles from "./Header.module.css";
function Header(props) {
  //It is the Component to render each header of the page
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Edvora</h1>
      <div className={styles.profile}>
        <h1 className={styles.profile_head}>{props.name}</h1>
        <img src={props.pic} alt="user" className={styles.profile_pic} />
      </div>
    </header>
  );
}
export default Header;
