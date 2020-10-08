import { useMutation, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Customer } from "../../../server/Models";
import { CustomerAttributes } from "../../../server/Models/Customer";
import { FixAttributes } from "../../../server/Models/Fix";
import { InstallmentAttributes } from "../../../server/Models/Installment";
import {
  GET_FIXES,
  GET_INSTALLMENTS,
  UPDATE_Fix,
  UPDATE_INSTALLMENT,
} from "../../../utils/Queries/Customer";

const Installments = ({ customer }: { customer: CustomerAttributes }) => {
  if (!customer)
    return (
      <div>
        <h1>هذه الصفحة غير متاحة</h1>
      </div>
    );
  const { data, refetch } = useQuery<{ installments: InstallmentAttributes[] }>(
    GET_INSTALLMENTS,
    { variables: { customerId: customer.id } }
  );
  const { data: fixData, refetch: fixRefetch } = useQuery<{
    fixes: FixAttributes[];
  }>(GET_FIXES, { variables: { customerId: customer.id } });
  const [fixes, setFixes] = useState<FixAttributes[]>([]);
  const [updateInstallment] = useMutation(UPDATE_INSTALLMENT);
  const [updateFix] = useMutation(UPDATE_Fix);
  useEffect(() => {
    if (fixData) {
      setFixes(
        fixData.fixes.map((fix) => ({
          ...fix,
          done: fix.done || false,
          price: fix.price || 0,
        }))
      );
    }
  }, [fixData]);

  const handleChange = (id: number, type: "fixed" | "paid", state: boolean) => {
    if (type === "paid") {
      updateInstallment({ variables: { id, [type]: state } }).then(() =>
        refetch()
      );
    } else {
      updateFix({ variables: { id, done: state } }).then(() => fixRefetch());
    }
  };
  const paidInstallments =
    data?.installments.filter((install) => install.paid).length || 0;
  const handleFixPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixes(
      fixes.map((fix) => {
        if (fix.id.toString() === e.target.name)
          return { ...fix, price: parseFloat(e.target.value) };
        return fix;
      })
    );
  };
  const handleFixPriceSave = (id: number, price: number) => {
    updateFix({ variables: { id, price } }).then(() => fixRefetch());
  };
  return (
    <main>
      <Header
        title={`اقساط : ${customer.name}`}
        buttons={[
          {
            link: "/customers/" + customer.id,
            title: "العودة لبيانات العميل",
          },
          {
            link: "/",
            title: "الصفحة الرئيسية",
          },
        ]}
      />
      <div></div>
      {data && data.installments.length > 0 && (
        <div
          style={{
            margin: "1rem auto",
            width: "80%",
          }}
        >
          <h2>{`تم دفع ${paidInstallments} قسط وباقي ${
            data.installments.length - paidInstallments
          } قسط`}</h2>
          <table className="w3-table-all w3-centered w3-hoverable">
            <thead>
              <tr className="w3-green">
                <th>التاريخ</th>
                <th>تم الدفع؟</th>
              </tr>
            </thead>
            <tbody>
              {data.installments.map((installment) => {
                return (
                  <tr key={installment.id}>
                    <td>
                      {installment.year} - {installment.month}
                    </td>
                    <td>
                      <input
                        className="w3-check"
                        type="checkbox"
                        checked={installment.paid}
                        onChange={(e) =>
                          handleChange(installment.id, "paid", e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {fixData && fixData.fixes.length > 0 && (
        <div
          style={{
            margin: "1rem auto",
            width: "80%",
          }}
        >
          <table className="w3-table-all w3-centered w3-hoverable">
            <thead>
              <tr className="w3-red">
                <th>التاريخ</th>
                <th>تمت الصيانة؟</th>
                <th>السعر</th>
              </tr>
            </thead>
            <tbody>
              {fixes.map((fix) => {
                return (
                  <tr key={fix.id}>
                    <td>
                      {fix.year} - {fix.month}
                    </td>
                    <td>
                      <input
                        className="w3-check"
                        type="checkbox"
                        checked={fix.done}
                        onChange={(e) =>
                          handleChange(fix.id, "fixed", e.target.checked)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={fix.price}
                        name={"" + fix.id}
                        onChange={handleFixPriceChange}
                      />
                      <button
                        onClick={() => handleFixPriceSave(fix.id, fix.price)}
                      >
                        حفظ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  const customer = await Customer.findOne({ where: { id }, raw: true });

  return {
    props: {
      customer,
    },
  };
};
export default Installments;
