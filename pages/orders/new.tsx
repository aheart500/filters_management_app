import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { ADD_ORDER } from "../../utils/Queries/Order";
import {
  GET_FILTERED_INSTALLMENTS,
  UPDATE_INSTALLMENT,
  UPDATE_INSTALLMENTS,
} from "../../utils/Queries/Customer";
import { InstallmentAttributes } from "../../server/Models/Installment";
import InstallmentsTable from "../../components/InstallmentsTable";

const WorkerForm = () => {
  const [data, setData] = useState({
    day: "",
    month: "",
    notes: "",
    year: "",
    workerId: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [add] = useMutation(ADD_ORDER, {
    variables: {
      ...data,
      year: parseInt(data.year),
    },
  });
  const [getInstallments] = useMutation(GET_FILTERED_INSTALLMENTS);
  const [updateInstallments] = useMutation(UPDATE_INSTALLMENTS);
  const [installments, setInstallments] = useState<InstallmentAttributes[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const selectedIds = selected.map((item) => item.id);
  const isSelected = (id: string) => selectedIds.includes(id);
  const handleSelected = (row: any) => {
    if (isSelected(row.id)) {
      setSelected(selected.filter((item) => item.id !== row.id));
    } else {
      setSelected(selected.concat(row));
    }
  };

  useEffect(() => {
    if (data.month !== "" && data.year !== "" && data.city !== "") {
      getInstallments({
        variables: {
          city: data.city,
          month: parseInt(data.month),
          year: parseInt(data.year),
        },
      }).then(({ data }) => {
        setInstallments(data.filteredInstallments);
      });
    } else {
      setInstallments([]);
    }
  }, [data.month, data.year, data.city]);
  useEffect(() => {
    setSelected([]);
  }, [installments]);
  console.log(selected);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    if (data.workerId === "") {
      alert("برجاء إدخال كود الموظف");
      return;
    }
    if (data.city === "") {
      alert("برجاء إدخال القرية");
      return;
    }
    setLoading(true);
    add().then(({ data }) => {
      updateInstallments({
        variables: { ids: selectedIds, orderId: data.addOrder.id },
      });
      setLoading(false);
      window.location.replace(`/orders/${data.addOrder.id}`);
    });
  };
  const RenderedTable = () => {
    return (
      <>
        <InstallmentsTable
          data={installments || []}
          withSelet={{ handleSelected, isSelected }}
        />
        <div>
          <h3>
            مجموع التحصيل: {"    "}
            {selected.reduce((t, n) => t + n.customer.installment_price, 0)}
            {"   "}
            جنيه
          </h3>
        </div>
      </>
    );
  };
  return (
    <main className={styles.main}>
      <Header
        title="إضافة اوردر جديد"
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/orders" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[{ title: "حفظ البيانات", onClick: handleSave }]}
        fields={[
          {
            label: "كود الموظف",
            type: "worker",
            props: {
              name: "workerId",
            },
          },
          {
            label: "القرية",
            type: "text",
            props: {
              name: "city",
            },
          },
          {
            label: "اليوم",
            type: "number",
            props: {
              name: "day",
            },
          },
          {
            label: "الشهر",
            type: "number",
            props: {
              name: "month",
            },
          },
          {
            label: "السنة",
            type: "number",
            props: {
              name: "year",
            },
          },
          {
            label: "الأقساط",
            type: "component",
            props: {
              value: RenderedTable(),
            },
          },
          {
            label: "ملاحظات",
            type: "textarea",
            props: {
              name: "notes",
            },
          },
        ]}
      />
    </main>
  );
};

export default WorkerForm;
