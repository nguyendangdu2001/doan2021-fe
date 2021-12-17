import React from "react";
import { useQuery } from "react-query";
import { findStrangers } from "../services";

const useStrangers = () => {
  return useQuery(["strangers"], async () => {
    const { data } = await findStrangers();
    return data;
  });
};

export default useStrangers;
