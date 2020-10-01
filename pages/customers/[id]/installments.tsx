import { useMutation, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Header from "../../../components/Header";
import { Customer } from "../../../server/Models";
import { CustomerAttributes } from "../../../server/Models/Customer";
import { InstallmentAttributes } from "../../../server/Models/Installment";
import {
  GET_INSTALLMENTS,
  UPDATE_INSTALLMENT,
} from "../../../utils/Queries/Customer";

const Installments = ({ customer }: { customer: CustomerAttributes }) => {
  if (!customer || customer.payment_type === "كاش")
    return (
      <div>
        <h1>هذه الصفحة غير متاحة</h1>
      </div>
    );
  const { data, refetch } = useQuery<{ installments: InstallmentAttributes[] }>(
    GET_INSTALLMENTS,
    { variables: { customerId: customer.id } }
  );

  const [updateInstallment] = useMutation(UPDATE_INSTALLMENT);
  const handleChange = (id: number, type: "fixed" | "paid", state: boolean) => {
    updateInstallment({ variables: { id, [type]: state } }).then(() =>
      refetch()
    );
  };
  const paidInstallments =
    data?.installments.filter((install) => install.paid).length || 0;
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
      {data && data.installments && (
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
                <th>تمت الصيانة؟</th>
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
                        name={"" + installment.id}
                        checked={installment.fixed}
                        onChange={(e) =>
                          handleChange(
                            installment.id,
                            "fixed",
                            e.target.checked
                          )
                        }
                      />
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
