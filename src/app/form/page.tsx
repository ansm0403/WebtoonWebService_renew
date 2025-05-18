'use client'

import React, { ChangeEvent, MouseEvent, useState, DragEvent } from 'react';

interface FormType {
    name : string
    birth : string
    gender : string
    hobby : string[]
    photo? : File
}

export default function TestPage() {

    const [formValue, setFormValue] = useState<FormType>({
        name : "",
        birth : "",
        gender : "",
        hobby : [],
        photo : undefined
    })

    const handleInputValue = (e : ChangeEvent<HTMLInputElement>) => {
        const value = 
        e.target.name === "photo" 
        ? (e.target.files?.[0] ?? undefined)
        : e.target.value

        setFormValue((prev) => ({
            ...prev,
            [e.target.name] : value
        }));
    }

    const handleCheckBox = (e : ChangeEvent<HTMLInputElement>) => {
        const hobby = e.target.name;
        const value = e.target.value;
        const isChecked = e.target.checked;

        if(isChecked){
            setFormValue((prev)=>({
                ...prev,
                [hobby] : [...prev.hobby, value]
            }))

            return;
        }
        if(!isChecked && formValue.hobby.includes(value)) {
            setFormValue((prev)=>({
                ...prev,
                [hobby] : prev.hobby.filter((item) => item !== value)
            }))

            return;
        }
        return;
    }

    const handleDragOver = (e : DragEvent<HTMLInputElement> ) => {
        e.preventDefault();
    }

    const handleDrop = (e : DragEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if(files && files[0]){
            setFormValue((prev)=>({
                ...prev,
                [e.target?.name] : files[0]
            }))
        } 
    }

    const handleSubmit = (e : MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(formValue).forEach(([Key, value]) => {
            formData.append(Key, value);
        }) 

        fetch('/api/form', {
            method : 'POST',
            body : formData
        }).then(res => {
            if(!res.ok) {
                return new Error(`${res.status} ${res.statusText}`)
            }
        })
    }

    return (
        <div className='test__container'>
            <form className='test__form'>
                <label className = 'test__label'>
                    이름
                    <input className = 'test__input__text' type = "text" name = "name" value = {formValue.name} onChange={handleInputValue}/>
                </label>
                <label className = 'test__label'>
                    생년월일
                    <input type = "date" name = "birth" className = 'test__input__date' value = {formValue.birth} onChange={handleInputValue}/>
                </label>
                <div className='flex gap-3'>
                    <label className='flex gap-3'>
                        <input type = "radio" name = "gender" value = "남성" onChange = {handleInputValue} />남성
                    </label>
                    <label className='flex gap-3'>
                        <input type = "radio" name = "gender" value = "여성" onChange = {handleInputValue} />여성
                    </label>
                </div>
                <div className='flex gap-3'>
                    <label className='flex gap-3'>
                        <input type = "checkbox" name = "hobby" value = "게임" onChange={handleCheckBox} /><span>게임</span>
                    </label>
                    <label className='flex gap-3'>
                        <input type = "checkbox" name = "hobby" value = "영화" onChange={handleCheckBox} /><span>영화</span>
                    </label>
                    <label className='flex gap-3'>
                        <input type = "checkbox" name = "hobby" value = "독서" onChange={handleCheckBox} /><span>독서</span>
                    </label>
                </div>
                <input 
                    type = "file" 
                    name = "photo" 
                    accept='image/*' 
                    onChange = {handleInputValue} 
                    onDragOver={handleDragOver} 
                    onDrop={handleDrop} 
                />
                <button className='test__button' onClick = {handleSubmit}>제출</button>
            </form>
        </div>
  )
}
