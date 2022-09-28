import {SuperButton} from "../../sc1-main/m1-ui/common/Button/Button";
import {SuperCheckbox} from "../../sc1-main/m1-ui/common/Checkbox/Checkbox";
import {SuperInputText} from "../../sc1-main/m1-ui/common/InputText/InputText";
import {ChangeEvent, useState} from "react";

export const Test = () => {
    const [text, setText] = useState<string>('')


    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    const showAlert = () => {
        alert("click")
    }

    return(
        <div>
            <SuperButton onClick={showAlert}>
                default
            </SuperButton>
            <SuperCheckbox checked={checked}
                           onChange={testOnChange}
            />
            <SuperInputText  value={text}
                             onChangeText={setText}
            />
        </div>
    )
}