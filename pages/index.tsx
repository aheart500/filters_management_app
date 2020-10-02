import Link from "next/link";
import styles from "../styles/home.module.css";
const Home = () => {
  return (
    <main className={styles.main + " w3-container"}>
      <h1>الصفحة الرئيسية</h1>
      <div className={styles.buttons}>
        <Link href="/workers">
          <button> الموظفون</button>
        </Link>
        <Link href="/workers/new">
          <button>إضافة موظف</button>
        </Link>
        <Link href="/customers">
          <button> العملاء</button>
        </Link>
        <Link href="/customers/new">
          <button>إضافة عميل</button>
        </Link>
        <Link href="/penalties">
          <button>الجزاءات</button>
        </Link>
        <Link href="/penalties/new">
          <button>إضافة جزاء</button>
        </Link>
        <Link href="/rewards">
          <button> المكافاءات</button>
        </Link>
        <Link href="/rewards/new">
          <button>إضافة مكافأة</button>
        </Link>
        <Link href="/absence">
          <button> الغياب</button>
        </Link>
        <Link href="/absence/new">
          <button>إضافة غياب</button>
        </Link>
        <Link href="/basics">
          <button> أساسي مرتب</button>
        </Link>
        <Link href="/basics/new">
          <button>إضافة أساسي مرتب</button>
        </Link>
        <Link href="/borrow">
          <button> سلف</button>
        </Link>
        <Link href="/borrow/new">
          <button>إضافة سلف</button>
        </Link>
        <Link href="/installationFees">
          <button> عمولات التركيب</button>
        </Link>
        <Link href="/installationFees/new">
          <button>إضافة عمولة تركيب</button>
        </Link>
        <Link href="/sellingFees">
          <button> عمولات البيع</button>
        </Link>
        <Link href="/sellingFees/new">
          <button>إضافة عمولة بيع</button>
        </Link>
        <Link href="/loans">
          <button>القروض</button>
        </Link>
        <Link href="/loans/new">
          <button>إضافة قرض</button>
        </Link>
        <Link href="/orders">
          <button>الأوردرات</button>
        </Link>
        <Link href="/orders/new">
          <button>إضافة اوردر</button>
        </Link>
      </div>
    </main>
  );
};
export const getServerSideProps = async () => {
  return {
    props: {
      name: "h",
    },
  };
};

export default Home;
