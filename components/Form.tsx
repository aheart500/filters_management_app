import { WorkerAttributes } from "../server/Models/Worker";
import styles from "../styles/form.module.css";
interface InputFieldProps {
  placeholder?: string;
  name: string;
}
interface ButtonProps {
  title: string;
  onClick: () => void;
}
interface InputFieldContainer {
  label: string;
  type: "text" | "textarea" | "date";
  props: InputFieldProps;
}
interface FormProps {
  header?: string;
  loading?: boolean;
  data: Partial<WorkerAttributes> | null;
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
  return (
    <div className={styles.formContainer}>
      {header && <h1>{header}</h1>}
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, i) => {
          const valueProps = {
            value: data[field.props.name],
            onChange: handleChange,
          };
          return (
            <div className={styles.inputContainer} key={i}>
              <label>{field.label}</label>
              {field.type === "text" && (
                <input type="text" {...field.props} {...valueProps} />
              )}
              {field.type === "date" && (
                <input type="date" {...field.props} {...valueProps} />
              )}
              {field.type === "textarea" && (
                <textarea {...field.props} {...valueProps} />
              )}
            </div>
          );
        })}

        <div className={styles.buttonsContainer}>
          {buttons.map((button, i) => {
            return (
              <button
                key={i}
                className="w3-button w3-black w3-hover-green"
                disabled={loading}
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
