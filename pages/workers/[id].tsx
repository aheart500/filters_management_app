import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Worker } from "../../server/Models";
import { WorkerAttributes } from "../../server/Models/Worker";
import { DELETE_WORKER, UPDATE_WORKER } from "../../utils/Queries/Worker";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
const WorkerForm = ({ worker }: { worker: WorkerAttributes | null }) => {
  let initialState = {};
  if (worker) {
    for (let key in worker) {
      initialState[key] = worker[key] || "";
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<WorkerAttributes> | null>(
    initialState
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
      <Form
        header={`كود الموظف: ${worker.id}`}
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[
          { title: "تحديث البيانات", onClick: () => handleMutation("update") },
          {
            title: "حذف الموظف",
            onClick: () => handleMutation("delete"),
            className: "w3-red",
          },
        ]}
        fields={[
          {
            label: "الأسم",
            type: "text",
            props: {
              name: "name",
            },
          },
          {
            label: "رقم الهاتف",
            type: "text",
            props: {
              name: "phone",
            },
          },
          {
            label: "العنوان",
            type: "textarea",
            props: {
              name: "address",
            },
          },
          {
            label: "الحالة الإجتماعية",
            type: "text",
            props: {
              name: "marital_status",
            },
          },
          {
            label: "تاريخ التعيين",
            type: "date",
            props: {
              name: "hire_date",
            },
          },
        ]}
      />
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
