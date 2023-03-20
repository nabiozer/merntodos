import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, CircularProgress, Grid, TableHead, Tooltip, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from "../../components/Button";
import Input from "../../components/Input";
import useForm from "../../_hooks/useForm";
import ModalTodo from './Modal-Todo';

const Todos = () => {

    const [modalShow, setModalShow] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [shown, setShown] = useState(null)

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const { control, errors, handleSubmit } = useForm({
        defaultValues: {
            todoItem: ''
        },
        validationSchema: {},
    });

    const [{ data, loading: loadingTodos }, fetchData] = useAxios({
        url: '/api/todos',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`,
        }
    }, { manual: true })

    const [{ loading: loadingDelete, error: errorDelete }, deleteTodo] = useAxios({
        url: '/api/todos',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`,
        }
    }, { manual: true })

    const [{ loading: loadingUpdate }, updateTodo] = useAxios({

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`,
        }
    }, { manual: true })



    useEffect(() => {
        userInfo && fetchData({ url: `/api/todos` })
            //eslint-disable-next-line
    }, [])

    useEffect(() => {
        setShown(data)
    }, [data])


    function filterByValue(array, value) {
        return array.filter((data) => data.todoItem.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
    const onSubmit = (dataForm: any) => {

        if(dataForm?.todoItem) {
            setShown(filterByValue(shown, dataForm?.todoItem))
        } else {
            setShown(data)
        }
      
    };
    const onButtonClick = (data) => {

        fetch(data).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = data;
                alink.click();
            })
        })
    }

    const renderList = () => {
        if (shown && !loadingTodos) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableCell>
                                <Button text="Add New Todo" onClick={() => setModalShow(true)} />
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {
                                shown?.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.todoItem}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Avatar alt="Remy Sharp" src={row.image} />
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="right">
                                            {row?.image && <Tooltip title="Download">
                                                <IconButton onClick={() => onButtonClick(row.image)}>
                                                    <DownloadIcon />
                                                </IconButton>
                                            </Tooltip>}
                                            <Tooltip title="Edit" sx={{ color: "blue" }}>
                                                <IconButton onClick={() =>

                                                    setModalShow(() => {
                                                        setSelectedTodo(row);
                                                        return true;
                                                    })


                                                }>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={row.marked ? "Unmark" : 'Mark'} sx={{ ...(row.marked && { color: "purple" }) }}>
                                                <IconButton onClick={async () => {
                                                    const result = await updateTodo({ url: `/api/todos/${row._id}`, data: { isMarked: !row?.isMarked } })
                                                    if (result.status === 201) {
                                                        fetchData({ url: '/api/todos/' })
                                                    }
                                                    if (errorDelete) {

                                                    }
                                                }}>
                                                    {row.isMarked ? <BookmarkAddedIcon sx={{ color: 'purple' }} /> : <BookmarkIcon />}
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" sx={{ color: "red" }}>
                                                <IconButton onClick={async () => {
                                                    const result = await deleteTodo({ url: `/api/todos/${row._id}` })
                                                    if (result.status === 200) {
                                                        fetchData({ url: '/api/todos/' })
                                                    }
                                                    if (errorDelete) {

                                                    }
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>



                                        </TableCell>
                                    </TableRow>
                                ))}

                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
                </TableContainer>
            )
        }
        else {
            return null;
        }
    }


    return (
        <>
            {userInfo ?
                <Box component="div" sx={{ width: '100vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column' }} >
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: '1rem' }}>
                        <Grid container
                            spacing={1}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ width: '100%' }}>
                            <Grid item xs={12} md={6} sm={6}>
                                <Input id="todoItem" name="todoItem" label="Todo Item" control={control} errors={errors} />
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                                <Button text="Filter" iconRight={<i className="fa fa-plus" />} type="submit" />
                            </Grid>
                        </Grid>
                    </Box>

                    {renderList()}
                    {(loadingTodos || loadingDelete  || loadingUpdate )&& <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>}
                </Box> :

                <Box component="div" sx={{ height: 'calc(100vh - 10rem) !important', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography></Typography>   <NavLink to="/login">Please Login to see your list</NavLink>
                </Box>}
            {modalShow &&
                <ModalTodo fetchData={fetchData}
                    show={modalShow} onClose={(status: any) => {
                        status && fetchData()
                        setModalShow(false)
                        setSelectedTodo(null)
                    }
                    } selectedTodo={selectedTodo} />
            }
        </>
    )
}


export default Todos;