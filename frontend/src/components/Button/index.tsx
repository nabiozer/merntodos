import { Button as MuiButton, CircularProgress } from "@mui/material";
import { useEffect, useRef } from "react";
import { IButtonProps } from "./type";

export default (props: IButtonProps) => {
  const {
    id,
    name,
    text,
    className,
    style,
    loading,
    onRef,
    disabled,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth,
    centerRipple,
    onClick,
    iconLeft,
    iconRight,
    href,
    type,
    component,
    outlined,
    upperCase,
    size = "medium",
    color = "secondary",
    variant='contained'
  } = props;

  const button = useRef();

  useEffect(() => {
    onRef && onRef(button);
  }, []);

  return (
      <MuiButton
        id={id}
        name={name}
        variant={variant}
        disabled={disabled}
        disableFocusRipple={disableFocusRipple}
        disableRipple={disableRipple}
        href={href}
        outlined={outlined}
        fullWidth={fullWidth}
        centerRipple={centerRipple}
        type={type}
        className={`${size} ${color || "default"} 
      ${outlined ? "outlined" : ""} 
      ${className || ""}   
        ${upperCase ? "upparcase" : ""}
       `}
        style={style}
        //eslint-disabled-next-line
        onClick={(e: any) => {
          onClick && onClick(e);
        }}
        buttonref={button}
        component={component}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <span className="MuiButton-label">
            {iconLeft || null}
            {text}
            {iconRight || null}
          </span>
        )}
      </MuiButton>

  );
};
