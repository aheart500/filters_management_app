import { useQuery } from "@apollo/client";
import { useState } from "react";
import { WorkerAttributes } from "../../server/Models/Worker";
import { GET_WORKERS } from "../../utils/Queries/Worker";
import Header from "../../components/Header";
import Table from "../../components/Table";
let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
            case "name":
              return { title: "الأسم", width: "150px" };
            case "phone":
              return { title: "الرقم", width: "150px" };
            case "hire_date":
              return { title: "تاريخ التعيين", width: "150px" };
            case "marital_status":
              return { title: "الحالة الإجتماعية", width: "200px" };
            case "address":
              return { title: "العنوان", width: "500px" };
          }
        })
        .filter((key) => key)
    : [];
};

const Workers = () => {
  const [search, setSearch] = useState("");
  const { data, loading, fetchMore } = useQuery<{
    workers: WorkerAttributes[];
  }>(GET_WORKERS, { variables: { search } });

  let workers = data?.workers;
  const workerKeys =
    workers && workers[0]
      ? (Object.keys(workers[0]) as Array<keyof WorkerAttributes>)
      : [];
  const keys = keysTranslated(workerKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.workers[data.workers.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newWorkers = fetchMoreResult.workers;
        if (newWorkers.length === 0) return prev;
        return {
          workers: [...prev.workers, ...newWorkers],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="الموظفون"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة موظف جديد", link: "/workers/new" },
        ]}
      />

      {!loading && workers && (
        <Table
          data={workers}
          heads={keys}
          linkBeginning="/workers"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Workers;
