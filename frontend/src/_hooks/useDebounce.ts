import { useEffect,useState } from "react";


const useDebounce = <T>(value:T,delay?:number) :any => {
     const defaultDelay:number = 500;
     const [debouncedValue,setDebouncedValue] = useState<T>(value);   

     useEffect(() => {
        const timer = setTimeout(() =>setDebouncedValue(value),delay || defaultDelay);

        return () => {
            clearTimeout(timer);
        }
     },[value,delay]);
     return debouncedValue;
}

export default useDebounce;