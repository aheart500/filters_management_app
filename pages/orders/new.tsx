import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { ADD_ORDER } from "../../utils/Queries/Order";
import {
  GET_FILTERED_FIXES,
  GET_FILTERED_INSTALLMENTS,
  UPDATE_FIXES,
  UPDATE_INSTALLMENT,
  UPDATE_INSTALLMENTS,
} from "../../utils/Queries/Customer";
import { InstallmentAttributes } from "../../server/Models/Installment";
import InstallmentsTable from "../../components/InstallmentsTable";
import FixesTable from "../../components/FixesTable";

import { FixAttributes } from "../../server/Models/Fix";

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
  console.log(data);
  const [getInstallments] = useMutation(GET_FILTERED_INSTALLMENTS);
  const [getFixes] = useMutation(GET_FILTERED_FIXES);

  const [updateInstallments] = useMutation(UPDATE_INSTALLMENTS);
  const [updateFixes] = useMutation(UPDATE_FIXES);

  const [installments, setInstallments] = useState<InstallmentAttributes[]>([]);
  const [fixes, setFixes] = useState<FixAttributes[]>([]);

  const [selectedFixes, setSelectedFixes] = useState<any[]>([]);
  const selectedFixesdIds = selectedFixes.map((item) => item.id);
  const isSelectedFix = (id: string) => selectedFixesdIds.includes(id);
  const handleSelectedFix = (row: any) => {
    if (isSelectedFix(row.id)) {
      setSelectedFixes(selectedFixes.filter((item) => item.id !== row.id));
    } else {
      setSelectedFixes(selectedFixes.concat(row));
    }
  };

  const [selectedInst, setSelectedInst] = useState<any[]>([]);
  const selectedInstIds = selectedInst.map((item) => item.id);
  const isSelectedInst = (id: string) => selectedInstIds.includes(id);
  const handleSelectedInst = (row: any) => {
    if (isSelectedInst(row.id)) {
      setSelectedInst(selectedInst.filter((item) => item.id !== row.id));
    } else {
      setSelectedInst(selectedInst.concat(row));
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
      getFixes({
        variables: {
          city: data.city,
          month: parseInt(data.month),
          year: parseInt(data.year),
        },
      }).then(({ data }) => {
        setFixes(data.filteredFixes);
      });
    } else {
      setInstallments([]);
      setFixes([]);
    }
  }, [data.month, data.year, data.city]);
  useEffect(() => {
    setSelectedInst([]);
  }, [installments]);
  useEffect(() => {
    setSelectedFixes([]);
  }, [fixes]);

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
        variables: { ids: selectedInstIds, orderId: data.addOrder.id },
      });
      updateFixes({
        variables: { ids: selectedFixesdIds, orderId: data.addOrder.id },
      });
      setLoading(false);
      window.location.replace(`/orders/${data.addOrder.id}`);
    });
  };
  const RenderedInstTable = () => {
    return (
      <>
        <InstallmentsTable
          data={installments || []}
          withSelet={{ handleSelectedInst, isSelectedInst }}
        />
        <div>
          <h3>
            مجموع تحصيل الأقساط: {"    "}
            {selectedInst.reduce((t, n) => t + n.customer.installment_price, 0)}
            {"   "}
            جنيه
          </h3>
        </div>
      </>
    );
  };
  const RenderedFixTable = () => {
    return (
      <>
        <FixesTable
          data={fixes || []}
          withSelet={{ handleSelectedFix, isSelectedFix }}
        />
        <div>
          <h3>
            مجموع تحصيل الصيانات: {"    "}
            {selectedFixes.reduce((t, n) => t + n.price, 0)}
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
              value: RenderedInstTable(),
            },
          },
          {
            label: "الصيانات",
            type: "component",
            props: {
              value: RenderedFixTable(),
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
