import {ChangeEvent, type KeyboardEvent, useState} from 'react'
import style from './editableItem.module.css'
type Props = {
    value: string
    onChange: (newTitle: string) => void
    disabled?: boolean
    type?:'text' | 'textarea'
}
export const EditableSpan = ({value, onChange, disabled,type}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(value)

    const activateEditModeHandler = () => {
        if (!disabled) {
            setEditMode(!editMode)
            if (editMode) {
                addItemHandler()
            }
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {
        if(newTitle.trim()!=='') {
            onChange(newTitle)
        }

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if(e.code === 'Enter') activateEditModeHandler()
    }
    return editMode ? (
        <input
            className={`${type==='textarea'? style.textarea: style.text}`}
            type={type}
            disabled={disabled}
            onChange={changeTitleHandler}
            value={newTitle}
            onBlur={activateEditModeHandler}
            autoFocus
            onKeyPress={onKeyPressHandler}
        />
    ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
    )
}
