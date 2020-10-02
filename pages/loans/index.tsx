import { useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { LoanAttributes } from "../../server/Models/Loan";
import { GET_LOANS } from "../../utils/Queries/Loan";
let keysTranslated = (keys: string[]) => {
  keys.splice(8, 0, "rest");
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
            case "month":
              return { title: "الشهر", width: "50px" };
            case "year":
              return { title: "السنة", width: "50px" };
            case "notes":
              return { title: "ملاحظات", width: "200px" };
            case "price":
              return { title: "مبلغ القرض", width: "100px" };
            case "paid":
              return { title: "المسدد", width: "100px" };
            case "rest":
              return { title: "المتبقي", width: "100px" };
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
    loans: LoanAttributes[];
  }>(GET_LOANS, { variables: { search } });

  let loans = data?.loans;
  const PenaltyKeys =
    loans && loans[0]
      ? (Object.keys(loans[0]) as Array<keyof LoanAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.loans[data.loans.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.loans;
        if (newPenalties.length === 0) return prev;
        return {
          loans: [...prev.loans, ...newPenalties],
        };
      },
    });
  };

  return (
    <div>
      <Header
        title="القروض"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة قرض جديد", link: "/loans/new" },
        ]}
      />

      {!loading && loans && (
        <Table
          data={loans.map((loan) => {
            const rest = loan.paid ? loan.price - loan.paid : loan.price;
            return {
              id: loan.id,
              workerId: loan.workerId,
              worker: loan.worker,
              month: loan.month,
              year: loan.year,
              price: loan.price,
              paid: loan.paid,
              rest,
              notes: loan.notes,
            };
          })}
          heads={keys}
          withoutId={true}
          linkBeginning="/loans"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
