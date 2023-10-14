import React from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { getValueFromInput, getOneUser, testUseSlice } from "../../redux/slices/userSlices";
import styles from "./users.module.scss"
import cn from "classnames";

interface IUsers {
    allUsers: []
    loader: boolean
}
export const Users = ({ allUsers, loader }) => {
    const dispatch = useAppDispatch()
    const { inputValue, choiseUsers, oneUser, test } = useAppSelector(state => state.users)
    const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const flag = allUsers.some(item => item.name == oneUser.name);
        if (flag === false) {
            dispatch(getOneUser({}))
        }
        dispatch(getValueFromInput(e.target.value))
    }
    // console.log("choiseUsers", choiseUsers, "oneUser", oneUser)
    let memoUsers;
    const someFunction = () => {
        memoUsers = allUsers.map(item => item.name === oneUser.name ? { ...item, isActive: "true" } : { ...item, isActive: "false" })
        return memoUsers
    }
    const getMemoUsers = React.useMemo(() => someFunction(), [choiseUsers, oneUser])

    const oneUserItem = (item) => {

        let nwArr = getMemoUsers.filter(user => user.isActive !== item.isActive)
        //пробую через массив начало
        console.log(nwArr)
        dispatch(testUseSlice(nwArr))


        // 
        dispatch(getOneUser(item))

        // dispatch(getOneUser(nwArr))

        // allUsers = allUsers.map(item => item.name === oneUser.name ? { ...item, isActive: true } : { ...item, isActive: false })
    }
    return (
        <div className={styles.users}>
            <div className={styles.users_inner}>
                <label>
                    <p className={styles.users_text} onClick={() => dispatch(getValueFromInput(''))}>Поиск сотрудников</p>
                    <input
                        className={styles.users_input}
                        value={inputValue}
                        onChange={(e) => getInputValue(e)}
                        placeholder="Введите id или имя"
                    />
                </label>
                <p className={styles.users_text}>Результаты</p>
                <div className={styles.loader}>{loader && "Подгружаю данные из Юзеров"}</div>
                <div className={styles.users_content}>
                    {
                        choiseUsers?.length > 0 ?
                            <div >
                                {getMemoUsers &&
                                    getMemoUsers?.map((item: any) => (
                                        <div className={styles.users_itemInner}>
                                            <img src="/img.svg" />
                                            <div
                                                className={cn({
                                                    [styles.users_itemActive]: item.isActive === "true"
                                                })}
                                                key={item.id}
                                                onClick={() => oneUserItem(item)}
                                            >
                                                <p className={styles.users_name}>{item.name}</p>
                                                <p className={styles.users_email}>{item.email}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            :
                            <p>начните поиск</p>
                    }
                </div>
            </div>
        </div>
    );
};

