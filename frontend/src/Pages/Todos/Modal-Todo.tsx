import { Box, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import useAxios from 'axios-hooks';
import * as React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import toastMessage from '../../components/Notification/toastMessage';
import useForm from '../../_hooks/useForm';

export const ModalTodo = ({ fetchData, show, onClose, selectedTodo }) => {
  const [open, setOpen] = React.useState(show || false);
  const [upload, setUploading] = React.useState(false)
  const [imageUploaded, setImage] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));



  const { control, errors, handleSubmit, setValue } = useForm({
    defaultValues: {
      todoItem: selectedTodo ? selectedTodo.todoItem : '',
      image: selectedTodo ? selectedTodo.image : '',
      isMarked: selectedTodo ? selectedTodo.isMarket : false,

    },
    validationSchema: {},
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data } = await axios.post('/api/uploads', formData, config)

      setImage(data);
      setUploading(false)
    } catch (error) {
      console.error(error);
      setUploading(false)
    }

  }

  const handleClose = (closeStatus = false) => {
    setOpen(false);
    onClose && onClose(closeStatus);
  };


  const [{ loading, error }, addTodo] = useAxios({
    url: !selectedTodo ? '/api/todos' : `/api/todos/${selectedTodo._id}`,
    method: !selectedTodo ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    }
  }, { manual: true })

  React.useEffect(() => {
    error?.response?.data?.message && toastMessage({ message: error?.response?.data?.message, messageType: 'error' })
  }, [error?.response?.data?.message])


  const onSubmit = async (data: any) => {

    const result = await addTodo({ data: { ...data, ...(selectedTodo?.image && { image: selectedTodo?.image }) } })
    if ([200, 201].indexOf(result.status)) {
      toastMessage({ message: `New todo added`, messageType: 'success' })
      handleClose(true)
    }

  };

  React.useEffect(() => {
    setValue('image', selectedTodo.image)
    //eslint-disable-next-line
  }, [selectedTodo])

  React.useEffect(() => {
    setValue('image', imageUploaded)
    //eslint-disable-next-line
  }, [imageUploaded])

  return (
    <Box component="div">
      <Box component="div" sx={{ margin: "2rem" }}>
        <Box component="p" >
          New Todo
        </Box>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add New Todo"}
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <Box component="div" sx={{ margin: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Input id="todoItem" name="todoItem" label="todo" control={control} errors={errors} />
          </Box>
          <Box component="div" sx={{ margin: '2rem', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Box component="p">image : {selectedTodo?.image}</Box>
            <Input type='file' id="image" name="image1" control={control} errors={errors} onChange={uploadFileHandler} />
          </Box>

          <Box component="div" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DialogActions>
              <Button text="Kaydet" type="submit" />
              <Button text="Vazgeç" onClick={() => handleClose()} />
            </DialogActions>
          </Box>
        </Box>

      </Dialog>
      {(loading || upload) && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>}
    </Box>
  );
}


export default ModalTodo;