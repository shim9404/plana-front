import { Input, InputNumber } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

export const DebounceInput = ({defaultValue, onChangeEvent, ...rest}) => {
  const [inputValue, setInputValue] = useState("");
  const timerRef = useRef(null);  // timer를 ref로 관리

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (defaultValue === null) return;
    setInputValue(defaultValue);
  }, [defaultValue])
  
  const processChange = useCallback((v) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChangeEvent?.(v);
    }, 150);
  }, [onChangeEvent]);

  return (
    <Input {...rest} onChange={handleOnChange} value={inputValue} onKeyUp={(e) => processChange(e.target.value)}/>
  )
}

export const DebounceInputNumber = ({defaultValue, onChangeEvent, ...rest}) => {
  const [inputValue, setInputValue] = useState("");
  const timerRef = useRef(null);  // timer를 ref로 관리

  const handleOnChange = (v) => {
    setInputValue(v);
  }

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue])
  
  const processChange = useCallback((v) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChangeEvent?.(v);
    }, 150);
  }, [onChangeEvent]);

  return (
    <InputNumber {...rest} onChange={handleOnChange} value={inputValue} onKeyUp={(e) => processChange(e.target.value)}/>
  )
}