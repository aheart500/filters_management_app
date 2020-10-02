import { useMutation } from "@apollo/client";
import { SetStateAction } from "react";
import { CustomerAttributes } from "../server/Models/Customer";
import { WorkerAttributes } from "../server/Models/Worker";
import { GET_CUSTOMER } from "./Queries/Customer";
import { GET_WORKER } from "./Queries/Worker";
export interface Person {
  name: string;
  message: string;
  loading: boolean;
  error: boolean;
}

const LoadAndSet = (
  type: "worker" | "customer",
  getFn: any,
  data: any,
  state: Person[],
  setState: (value: SetStateAction<Person[]>) => void
) => {
  state.forEach((field: any) => {
    if (data[field.name] !== "") {
      setState((prev) => {
        return prev.map((stateField) => {
          if (stateField.name === field.name)
            return {
              ...stateField,
              loading: true,
              error: false,
              message: "",
            };
          return stateField;
        });
      });
      getFn({ variables: { id: data[field.name] } }).then(({ data }) => {
        setState((prev) => {
          return prev.map((stateField) => {
            if (stateField.name === field.name)
              return {
                ...stateField,
                loading: false,
                error: false,
                message: data[type].name,
              };
            return stateField;
          });
        });
      });
    }
  });
};

const handleLoadAndSet = (
  name: string,
  value: string,
  getFn: any,
  type: "worker" | "customer",
  state: Person[],
  setState: (value: SetStateAction<Person[]>) => void
) => {
  if (value === "") {
    setState(
      state.map((field: any) => {
        if (field.name === name)
          return { ...field, loading: false, error: false, message: "" };
        return field;
      })
    );
    return;
  }
  setState(
    state.map((field: any) => {
      if (field.name === name)
        return { ...field, loading: true, error: false, message: "" };
      return field;
    })
  );
  getFn({ variables: { id: value } }).then(({ data }) => {
    if (data[type]) {
      setState(
        state.map((field: any) => {
          if (field.name === name)
            return {
              ...field,
              loading: false,
              error: false,
              message: data[type].name,
            };
          return field;
        })
      );
    } else {
      setState(
        state.map((field: any) => {
          if (field.name === name)
            return { ...field, loading: false, error: true };
          return field;
        })
      );
    }
  });
};

export { LoadAndSet, handleLoadAndSet };
