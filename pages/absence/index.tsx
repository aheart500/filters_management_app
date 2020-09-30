import { useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { AbsenceAttributes } from "../../server/Models/Absence";
import { GET_ABSENCES } from "../../utils/Queries/Absence";

let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
            case "month":
              return { title: "الشهر", width: "150px" };
            case "year":
              return { title: "السنة", width: "150px" };
            case "notes":
              return { title: "ملاحظات", width: "200px" };
            case "price":
              return { title: "المبلغ", width: "100px" };
            case "absence_days":
              return { title: "ايام الغياب", width: "100px" };
            case "late_days":
              return { title: "ايام التأخير", width: "100px" };
            case "total_days":
              return { title: "مجموع الأيام", width: "100px" };
            case "workerId":
              return { title: "كود الموظف", width: "70px" };
            case "worker":
              return { title: "اسم الموظف", width: "150px" };
          }
        })
        .filter((key) => key)
    : [];
};

const Penalties = () => {
  const [search, setSearch] = useState("");
  const { data, loading, fetchMore } = useQuery<{
    absence: AbsenceAttributes[];
  }>(GET_ABSENCES, { variables: { search } });
  console.log(data);
  let absence = data?.absence;
  const PenaltyKeys =
    absence && absence[0]
      ? (Object.keys(absence[0]) as Array<keyof AbsenceAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.absence[data.absence.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.absence;
        if (newPenalties.length === 0) return prev;
        return {
          absence: [...prev.absence, ...newPenalties],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="الغياب"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة غياب جديد", link: "/absence/new" },
        ]}
      />

      {!loading && absence && (
        <Table
          data={absence}
          heads={keys}
          withoutId={true}
          linkBeginning="/absence"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
