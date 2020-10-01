import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CustomerAttributes } from "../server/Models/Customer";
import { WorkerAttributes } from "../server/Models/Worker";
import styles from "../styles/form.module.css";
import { GET_CUSTOMER } from "../utils/Queries/Customer";
import { GET_WORKER } from "../utils/Queries/Worker";
interface Person {
  name: string;
  message: string;
  loading: boolean;
  error: boolean;
}
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
  let workers: Array<Person> = [];
  let customers: Array<Person> = [];
  const [getWorker] = useMutation<{ worker: Pick<WorkerAttributes, "name"> }>(
    GET_WORKER
  );
  const [getCustomer] = useMutation<{
    customer: Pick<CustomerAttributes, "name">;
  }>(GET_CUSTOMER);
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
      workerFields.forEach((field) => {
        if (data[field.name] !== "") {
          setWorkerFields((prev) => {
            return prev.map((workerField) => {
              if (workerField.name === field.name)
                return {
                  ...workerField,
                  loading: true,
                  error: false,
                  message: "",
                };
              return workerField;
            });
          });
          getWorker({ variables: { id: data[field.name] } }).then(
            ({ data }) => {
              setWorkerFields((prev) => {
                return prev.map((workerField) => {
                  if (workerField.name === field.name)
                    return {
                      ...workerField,
                      loading: false,
                      error: false,
                      message: data.worker.name,
                    };
                  return workerField;
                });
              });
            }
          );
        }
      });
    }
    if (customerFields) {
      customerFields.forEach((field) => {
        if (data[field.name] !== "") {
          setCustomerFields((prev) => {
            return prev.map((customerFields) => {
              if (customerFields.name === field.name)
                return {
                  ...customerFields,
                  loading: true,
                  error: false,
                  message: "",
                };
              return customerFields;
            });
          });
          getCustomer({ variables: { id: data[field.name] } }).then(
            ({ data }) => {
              setCustomerFields((prev) => {
                return prev.map((customerFields) => {
                  if (customerFields.name === field.name)
                    return {
                      ...customerFields,
                      loading: false,
                      error: false,
                      message: data.customer.name,
                    };
                  return customerFields;
                });
              });
            }
          );
        }
      });
    }
  }, []);
  const handleWorker = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: typeof handleChange
  ) => {
    cb(e);
    const { name, value } = e.target;
    if (value === "") {
      setWorkerFields(
        workerFields.map((field) => {
          if (field.name === name)
            return { ...field, loading: false, error: false, message: "" };
          return field;
        })
      );
      return;
    }
    setWorkerFields(
      workerFields.map((field) => {
        if (field.name === name)
          return { ...field, loading: true, error: false, message: "" };
        return field;
      })
    );
    getWorker({ variables: { id: value } }).then(({ data }) => {
      if (data.worker) {
        setWorkerFields(
          workerFields.map((field) => {
            if (field.name === name)
              return {
                ...field,
                loading: false,
                error: false,
                message: data.worker.name,
              };
            return field;
          })
        );
      } else {
        setWorkerFields(
          workerFields.map((field) => {
            if (field.name === name)
              return { ...field, loading: false, error: true };
            return field;
          })
        );
      }
    });
  };

  const handleCustomer = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: typeof handleChange
  ) => {
    cb(e);
    const { name, value } = e.target;
    if (value === "") {
      setCustomerFields(
        customerFields.map((field) => {
          if (field.name === name)
            return { ...field, loading: false, error: false, message: "" };
          return field;
        })
      );
      return;
    }
    setCustomerFields(
      customerFields.map((field) => {
        if (field.name === name)
          return { ...field, loading: true, error: false, message: "" };
        return field;
      })
    );
    getCustomer({ variables: { id: value } }).then(({ data }) => {
      if (data.customer) {
        setCustomerFields(
          customerFields.map((field) => {
            if (field.name === name)
              return {
                ...field,
                loading: false,
                error: false,
                message: data.customer.name,
              };
            return field;
          })
        );
      } else {
        setCustomerFields(
          customerFields.map((field) => {
            if (field.name === name)
              return { ...field, loading: false, error: true };
            return field;
          })
        );
      }
    });
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
          if (field.type === "worker") {
            var thisField = workerFields.find(
              (workerField) => workerField.name === field.props.name
            );
          }
          if (field.type === "customer") {
            var thisField = customerFields.find(
              (customerField) => customerField.name === field.props.name
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
              {field.type === "customer" && (
                <>
                  <input
                    type="number"
                    {...field.props}
                    value={valueProps.value}
                    onChange={(e) => handleCustomer(e, valueProps.onChange)}
                  />
                  <span
                    className={
                      thisField.error ? styles.spanError : styles.spanName
                    }
                  >
                    {thisField.loading
                      ? "جاري التحميل ..."
                      : thisField.error
                      ? "لا يوجد عميل بهذا الكود"
                      : thisField.message
                      ? `الأسم: ${thisField.message}`
                      : ""}
                  </span>
                </>
              )}
              {field.type === "worker" && (
                <>
                  <input
                    type="number"
                    {...field.props}
                    value={valueProps.value}
                    onChange={(e) => handleWorker(e, valueProps.onChange)}
                  />
                  <span
                    className={
                      thisField.error ? styles.spanError : styles.spanName
                    }
                  >
                    {thisField.loading
                      ? "جاري التحميل ..."
                      : thisField.error
                      ? "لا يوجد موظف بهذا الكود"
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
