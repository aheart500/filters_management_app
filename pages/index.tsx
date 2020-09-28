import Link from "next/link";
import styles from "../styles/home.module.css";
const Home = () => {
  return (
    <main className={styles.main}>
      <h1>الصفحة الرئيسية</h1>
      <div className={styles.buttons}>
        <Link href="/workers">
          <button> الموظفون</button>
        </Link>
        <Link href="/workers/new">
          <button>إضافة موظف</button>
        </Link>
        <Link href="/workers">
          <button> العملاء</button>
        </Link>
        <Link href="/workers">
          <button>إضافة عميل</button>
        </Link>
      </div>
    </main>
  );
};
export default Home;
