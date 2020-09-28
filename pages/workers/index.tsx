import { useQuery } from "@apollo/client";
import { useState } from "react";
import { WorkerAttributes } from "../../server/Models/Worker";
import { GET_WORKERS } from "../../utils/Queries";
import { Waypoint } from "react-waypoint";
import Header from "../../components/Header";
let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { name: "الكود", width: "70px" };
            case "name":
              return { name: "الأسم", width: "150px" };
            case "phone":
              return { name: "الرقم", width: "150px" };
            case "hire_date":
              return { name: "تاريخ التعيين", width: "150px" };
            case "marital_status":
              return { name: "الحالة الإجتماعية", width: "200px" };
            case "address":
              return { name: "العنوان", width: "500px" };
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
        <table className="w3-table-all w3-hoverable custom-table">
          <thead>
            <tr className="w3-green">
              {keys.map((key) => (
                <th key={key.name} style={{ width: key.width || "" }}>
                  {key.name}{" "}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, i) => {
              const {
                id,
                address,
                name,
                phone,
                hire_date,
                marital_status,
              } = worker;
              return (
                <tr
                  key={id}
                  onClick={() => window.location.replace(`/workers/${id}`)}
                >
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>{address}</td>
                  <td>{hire_date}</td>
                  <td>
                    {marital_status}
                    {i === workers.length - 1 && (
                      <Waypoint onEnter={() => loadMore()} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Workers;
