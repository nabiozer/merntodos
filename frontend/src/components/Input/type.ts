import { OutlinedTextFieldProps } from '@mui/material';
import { Control } from 'react-hook-form';


export interface ICommonForm {
    control: Control;
    errors: any;
}

export interface ICommonFieldProps extends ICommonForm {
    errorText?: string;
    readOnly?: boolean;
    labelActive?: boolean;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    className?: string;
    helperText?: React.ReactNode;
    onKeyDown?: any;
    onKeyUp?: any;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    fullWidth?: boolean;
    labelPlacement?:'top'|'start';
    labelWidth?: number | 'auto' |string;
    name: string;
    id?: string;
    tabIndex?: number;
    variant?:'standart' | 'outlined' | 'filled';
    hidden?:boolean;
    design?:string;
}


export interface ITextFieldProps
    extends Omit<OutlinedTextFieldProps, 'variant' | 'size' | 'margin' | 'onKeyDown' | 'onFocus' | 'onKeyUp' | 'name'>,
        ICommonFieldProps {
    maskFormat?: any;
    maxLength?: number;
    minLength?: number;
    watch?: (val: any) => void;
}
