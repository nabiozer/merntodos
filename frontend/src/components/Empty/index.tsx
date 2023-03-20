import { FC } from 'react';
import { IEmptyProps } from './type';
import { Box, Typography } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
const Empty: FC<IEmptyProps> = ({ text, loading, className, ...rest }) => {
    return (
        <Box sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            color: (theme) => theme.palette.primary.main,
        }}
            component="div" className={className}
            {...rest}>           
             {loading ? <MoreHorizOutlinedIcon /> : <Typography variant="overline">{text}</Typography>}
        </Box>);
};
Empty.defaultProps = {
    loading: false,
    className: '',
};
export default Empty;