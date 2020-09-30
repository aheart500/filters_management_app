import { useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { BasicsAttributes } from "../../server/Models/Basics";
import { GET_BASICS } from "../../utils/Queries/Basics";

let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
            case "id":
              return { title: "الكود", width: "70px" };
            case "month":
              return { title: "الشهر", width: "50px" };
            case "year":
              return { title: "السنة", width: "50px" };
            case "notes":
              return { title: "ملاحظات", width: "200px" };
            case "price":
              return { title: "المبلغ", width: "100px" };
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
    basics: BasicsAttributes[];
  }>(GET_BASICS, { variables: { search } });

  let basics = data?.basics;
  const PenaltyKeys =
    basics && basics[0]
      ? (Object.keys(basics[0]) as Array<keyof BasicsAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.basics[data.basics.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.basics;
        if (newPenalties.length === 0) return prev;
        return {
          basics: [...prev.basics, ...newPenalties],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="اساسي المرتب"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة أساسي جديد", link: "/basics/new" },
        ]}
      />

      {!loading && basics && (
        <Table
          data={basics}
          heads={keys}
          withoutId={true}
          linkBeginning="/basics"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
