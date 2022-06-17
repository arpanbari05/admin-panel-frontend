import { Button, TextField } from "@mui/material";
import Select from "react-select";
import React, { memo } from "react";
import { useDefaultFilters } from "../customHooks";
import "styled-components/macro";

const sortByOptions = [
  {
    label: "Sales low to high",
    value: "sales_low_to_high",
  },
  {
    label: "Sales high to low",
    value: "sales_high_to_low",
  },
];

const salesOptions = [
  {
    label: "Less than 2000",
    value: "<2000",
  },
  {
    label: "2000 to 3000",
    value: "2000-3000",
  },
  {
    label: "3000 to 6000",
    value: "3000-6000",
  },
  {
    label: "6000 to 12000",
    value: "6000-12000",
  },
  {
    label: "Above 12000",
    value: ">12000",
  },
];

function Filters({ setFilters, filters }) {
  const { sortBy: defaultSortBy, ...defaultFilters } = useDefaultFilters();

  const { searchQuery, sortBy, salesRange } = filters;

  const dropdownStyles = {
    control: (styles) => ({
      ...styles,
      height: "56px",
      maxHeight: "100%",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  };

  console.log({ defaultFilters, filters, salesRange });

  const clearFilters = () => {
    setFilters({ ...defaultFilters, sortBy: defaultSortBy });
  };

  const handleSaleRangeChange = (opt) => {
    setFilters((prev) => ({ ...prev, salesRange: opt }));
  };

  const handleSearchQueryChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, searchQuery: value }));
  };

  const handleSortChange = (opt) => {
    setFilters((prev) => ({ ...prev, sortBy: opt }));
  };

  return (
    <div className="mb-10">
      <p className="font-medium uppercase text-gray-400 mb-3">Filters</p>
      <form
        className="flex justify-between gap-5"
        css={`
          flex-wrap: wrap;
        `}
      >
        <TextField
          className="grow"
          type="search"
          variant="outlined"
          label="Search by Employee name"
          defaultValue={searchQuery}
          onChange={handleSearchQueryChange}
        />

        <div className="grow">
          <Select
            options={sortByOptions}
            styles={dropdownStyles}
            isSearchable={false}
            value={sortBy}
            placeholder="Sort by Sales"
            defaultValue={defaultSortBy}
            onChange={handleSortChange}
          ></Select>
        </div>

        <div className="grow">
          <Select
            options={salesOptions}
            isSearchable={false}
            styles={dropdownStyles}
            value={salesRange.value ? salesRange : false}
            placeholder="Filter by Sales Range"
            onChange={handleSaleRangeChange}
          ></Select>
        </div>

        <Button type="button" variant="contained" onClick={clearFilters}>
          Clear all filters
        </Button>
      </form>
    </div>
  );
}

export default memo(Filters);
