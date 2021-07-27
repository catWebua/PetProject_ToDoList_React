import React, {KeyboardEvent, ChangeEvent, useState} from 'react';

type EdiTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EdiTableSpan = (props: EdiTableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMod, setEditMod] = useState<boolean>(false)
    const onEditMode = () => setEditMod(true)
    const offEditMod = () => {
        setEditMod(false)
        props.changeTitle(title)
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMod
            ? <input
                autoFocus={true}
                onBlur={offEditMod}
                value={title}
                onChange={onTitleChangeHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
}

export default EdiTableSpan;
