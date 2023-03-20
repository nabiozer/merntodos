import { ButtonGroupProps } from '@mui/material';
import React from 'react';


export interface IButtonProps {
    id?: string;
    name?: string;
    text?: string;
    className?: string;
    style?: any;
    readOnly?: boolean;
    loading?: boolean;
    onRef?: (val: any) => void;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    centerRipple?: boolean;
    onClick?: (e?: any) => void;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    href?: string;
    type?: 'submit' | 'reset' | 'button';
    component?: any;
    tabIndex?: number;
    buttonRef?: any;
    outlined?: boolean;
    upperCase?: boolean;
    link?: string;
    variant?: any;
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    color?: 'default' | 'error' | 'warning' | 'info' | 'succes' | 'danger' | 'light' | 'white';
}


export interface IButtonGroupProps extends Pick<ButtonGroupProps, 'children' | 'className' | 'disabled'| 'fullWidth' | 'ref' | 'orientation' | 'sx' >{}