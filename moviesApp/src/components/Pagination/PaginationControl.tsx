import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationControlProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
      />
    </Stack>
  );
};

export default PaginationControl;
