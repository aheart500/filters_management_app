import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Worker } from "../../server/Models";
import { WorkerAttributes } from "../../server/Models/Worker";
import { DELETE_WORKER, UPDATE_WORKER } from "../../utils/Queries";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";

const WorkerForm = ({ worker }: { worker: WorkerAttributes | null }) => {
  const [data, setData] = useState<WorkerAttributes | null>(
    worker
      ? {
          address: worker.address || "",
          name: worker.name || "",
          hire_date: worker.hire_date || "",
          id: worker.id,
          phone: worker.phone || "",
          marital_status: worker.marital_status || "",
        }
      : null
  );
  const [loading, setLoading] = useState(false);

  if (!worker) return <div>كود خطأ</div>;
  const [updateWorker] = useMutation(UPDATE_WORKER, { variables: data });
  const [deleteWorker] = useMutation(DELETE_WORKER, {
    variables: { id: worker.id },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleMutation = (type: "update" | "delete") => {
    if (data.name === "") {
      alert("برجاء إدخال الأسم");
      return;
    }
    setLoading(true);
    if (type === "update") {
      updateWorker().then(() => setLoading(false));
    } else {
      deleteWorker().then(() => {
        setLoading(false);
        window.location.replace("/workers");
      });
    }
  };
  return (
    <main className={styles.main}>
      <Header
        title={`الموظف: ${worker.name}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/workers" },
        ]}
      />
      <div className={styles.formContainer}>
        <h1>كود الموظف: {worker.id}</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputContainer}>
            <label>الأسم</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>رقم الهاتف</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>العنوان</label>
            <textarea
              name="address"
              value={data.address}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>الحالة الإجتماعية</label>
            <input
              type="text"
              name="marital_status"
              value={data.marital_status}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>تاريخ التعيين</label>
            <input
              type="date"
              name="hire_date"
              value={data.hire_date}
              onChange={handleChange}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className="w3-button w3-black w3-hover-green"
              onClick={() => handleMutation("update")}
              disabled={loading}
            >
              تحديث البيانات
            </button>
            <button
              className="w3-button w3-red w3-hover-green"
              onClick={() => handleMutation("delete")}
              disabled={loading}
            >
              حذف الموظف
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let worker = await Worker.findOne({
    where: {
      id: params.id,
    },
    raw: true,
  });
  return {
    props: {
      worker,
    },
  };
};

export default WorkerForm;
