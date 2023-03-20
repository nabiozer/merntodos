import { useState } from 'react';
import { TablePagination } from '@mui/material';

interface IProps {
    rowsPerPageOptions?: number[];
    rowsPerPageAllText?: string;
    colSpan?: number;
    count?: number;
    rowsPerPage?: number;
    page?: number;
    onChangePage?: (page: number) => void;
    onChangeRowsPerPage?: (rows: number) => void;
    labelRowsPerPage?: string;
}

const Table = (props: IProps) => {
    const {
        rowsPerPageOptions = [5, 10, 25],
        //rowsPerPageAllText = 'All',
        colSpan,
        count = 0,
        rowsPerPage = 0,
        page = 0,
        onChangePage,
        onChangeRowsPerPage,
        labelRowsPerPage = 'Per Page:',
    } = props;

    const [selectedPerPage, setSelectedPerPage] = useState<number>(rowsPerPageOptions[0] || 5);

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedPerPage(parseInt(e.target.value, 10));
        onChangeRowsPerPage && onChangeRowsPerPage(parseInt(e.target.value, 10));
    };
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onChangePage && onChangePage(newPage);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[...rowsPerPageOptions]}
            colSpan={colSpan}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            component="div"
            SelectProps={{ value: selectedPerPage }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from} - ${to === -1 ? count : to} / ${count}`}
        />
    );
};

export default Table;
