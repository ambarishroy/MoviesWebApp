import { useState } from "react";

interface Filter {
    name: string;
    value: string;
    condition: (item: any, value: string) => boolean;
    }

const useFiltering = ( filters: Filter[]) => {
  const [filterValues, setFilterValues] = useState(() => {
    const filterInitialValues = filters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
    return filterInitialValues;
  });

  const filteringConditions = filters.map((f) => f.condition);
  const filterFunction = (collection: any) =>
    filteringConditions.reduce((data, conditionFn, index) => {
      return data.filter((item: any) => {
          return conditionFn(item, filterValues[index].value);
      });
    }, collection);

  return {
    filterValues,
    setFilterValues,
    filterFunction,
  };
};

export default useFiltering;
