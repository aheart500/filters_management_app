import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CustomerAttributes } from "../server/Models/Customer";
import { WorkerAttributes } from "../server/Models/Worker";
import styles from "../styles/form.module.css";
import { GET_CUSTOMER } from "../utils/Queries/Customer";
import { GET_WORKER } from "../utils/Queries/Worker";
import { Person, LoadAndSet, handleLoadAndSet } from "../utils/LoadField";
interface InputFieldProps {
  placeholder?: string;
  name: string;
  values?: string[];
  disabled?: boolean;
}
interface ButtonProps {
  title: string;
  className?: string;
  onClick: () => void;
}
interface InputFieldContainer {
  label: string;
  type:
    | "text"
    | "textarea"
    | "date"
    | "number"
    | "select"
    | "worker"
    | "customer";
  props: InputFieldProps;
}
interface FormProps {
  header?: string;
  loading?: boolean;
  data: any;

  handleChange: (e: any) => void;
  fields: InputFieldContainer[];
  buttons: ButtonProps[];
}
const Form = ({
  data,
  handleChange,
  buttons,
  loading,
  header,
  fields,
}: FormProps) => {
  const [getWorker] = useMutation<{ worker: Pick<WorkerAttributes, "name"> }>(
    GET_WORKER
  );
  const [getCustomer] = useMutation<{
    customer: Pick<CustomerAttributes, "name">;
  }>(GET_CUSTOMER);

  let workers: Array<Person> = [];
  let customers: Array<Person> = [];

  fields.forEach((field) => {
    const theField = {
      name: field.props.name,
      message: "",
      loading: false,
      error: false,
    };
    if (field.type === "worker") workers.push(theField);
    if (field.type === "customer") customers.push(theField);
  });
  const [workerFields, setWorkerFields] = useState(
    workers.length > 0 ? workers : null
  );
  const [customerFields, setCustomerFields] = useState(
    customers.length > 0 ? customers : null
  );

  useEffect(() => {
    if (workerFields) {
      LoadAndSet("worker", getWorker, data, workerFields, setWorkerFields);
    }
    if (customerFields) {
      LoadAndSet(
        "customer",
        getCustomer,
        data,
        customerFields,
        setCustomerFields
      );
    }
  }, []);
  const handleFieldsWithQuery = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: typeof handleChange,
    type: "customer" | "worker"
  ) => {
    cb(e);
    const { name, value } = e.target;
    handleLoadAndSet(
      name,
      value,
      type === "worker" ? getWorker : getCustomer,
      type,
      type === "worker" ? workerFields : customerFields,
      type === "worker" ? setWorkerFields : setCustomerFields
    );
  };

  return (
    <div className={styles.formContainer}>
      {header && <h1>{header}</h1>}
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, i) => {
          const valueProps = {
            value: data[field.props.name],
            onChange: handleChange,
          };
          if (["worker", "customer"].includes(field.type)) {
            const theSearchArr =
              field.type === "worker" ? workerFields : customerFields;
            var thisField = theSearchArr.find(
              (theSearchArr) => theSearchArr.name === field.props.name
            );
          }

          return (
            <div className={styles.inputContainer} key={i}>
              <label>{field.label}</label>
              {field.type === "text" && (
                <input type="text" {...field.props} {...valueProps} />
              )}
              {field.type === "date" && (
                <input type="date" {...field.props} {...valueProps} />
              )}
              {field.type === "number" && (
                <input type="number" {...field.props} {...valueProps} />
              )}
              {["worker", "customer"].includes(field.type) && (
                <>
                  <input
                    type="number"
                    {...field.props}
                    value={valueProps.value}
                    onChange={(e) =>
                      handleFieldsWithQuery(
                        e,
                        valueProps.onChange,
                        field.type as "customer" | "worker"
                      )
                    }
                  />
                  <span
                    className={
                      thisField.error ? styles.spanError : styles.spanName
                    }
                  >
                    {thisField.loading
                      ? "جاري التحميل ..."
                      : thisField.error
                      ? `لا يوجد ${
                          field.type === "customer" ? "عميل" : "موظف"
                        } بهذا الكود`
                      : thisField.message
                      ? `الأسم: ${thisField.message}`
                      : ""}
                  </span>
                </>
              )}
              {field.type === "textarea" && (
                <textarea {...field.props} {...valueProps} />
              )}
              {field.type === "select" && (
                <select
                  className="w3-select"
                  style={{
                    width: "200px",
                    outline: "none",
                    border: "none",
                    padding: "9px 0.5rem",
                  }}
                  disabled={field.props.disabled || false}
                  name={field.props.name}
                  placeholder={field.props.placeholder}
                  {...valueProps}
                >
                  {field.props.values.map((value, i) => (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}

        <div className={styles.buttonsContainer}>
          {buttons.map((button, i) => {
            const disabled =
              loading ||
              (workerFields &&
                workerFields.length > 0 &&
                !workerFields.every(
                  (field) => !field.loading && !field.error
                )) ||
              (customerFields &&
                customerFields.length > 0 &&
                !customerFields.every(
                  (field) => !field.loading && !field.error
                ));
            return (
              <button
                key={i}
                className={`w3-button w3-hover-green ${
                  button.className ? button.className : "w3-black"
                } `}
                disabled={disabled}
                onClick={button.onClick}
              >
                {button.title}
              </button>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default Form;
