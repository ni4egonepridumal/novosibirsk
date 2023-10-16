import React from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { getValueFromInput, getOneUser } from "../../redux/slices/userSlices";
import styles from "./users.module.scss";
import { User } from "../../types";
import cn from "classnames";

interface IAllUser {
    allUsers: User[],
    loader: boolean,
    error: string
}

export const Users = ({ allUsers, loader, error }: IAllUser) => {
    const dispatch = useAppDispatch()
    const { inputValue, oneUser } = useAppSelector(state => state.users)
    let memoUsers: User[];
    const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {

        const flag = memoUsers.some((item: User) => item.name === oneUser.name)
        if (inputValue.length <= 1 || flag === false) {
            dispatch(getOneUser({}))
        }
        dispatch(getValueFromInput(e.target.value))
    }
    const someFunction = () => {
        memoUsers = allUsers.map(item => item.name === oneUser.name ? { ...item, isActive: "true" } : { ...item, isActive: "false" })
        return memoUsers
    }
    const getMemoUsers = React.useMemo(() => someFunction(), [allUsers, oneUser])

    const oneUserItem = (item: User) => {
        dispatch(getOneUser(item))
    }
    return (
        <div className={styles.users}>
            <div className={styles.users_inner}>
                <label>
                    <p className={styles.users_text}>Поиск сотрудников</p>
                    <input
                        className={styles.users_input}
                        value={inputValue}
                        onChange={(e) => getInputValue(e)}
                        placeholder="Введите id или имя"
                    />
                </label>
                <p className={styles.users_text}>Результаты</p>
                <div className={styles.loader}>{loader && "Подгружаю данные ... Ожидайте"}</div>
                {error.length > 0 ? <p style={{ color: "red" }}>Попробуйте позже, ошибка на сервере</p> : null}
                <div className={styles.users_content}>
                    {
                        allUsers?.length > 0 ?
                            <div >
                                {getMemoUsers &&
                                    getMemoUsers?.map((item: User) => (
                                        <div key={item.name}
                                            className={cn(styles.users_itemInner, {
                                                [styles.users_itemActive]: item.isActive === "true",
                                                [styles.users_notActive]: item.isActive === "false"
                                            })}
                                            onClick={() => oneUserItem(item)}>
                                            <div className={styles.img}>
                                            </div>
                                            <div
                                                className={styles.users_item}
                                                key={item.id}
                                            >
                                                <p className={styles.users_name}>{item.name}</p>
                                                <p className={styles.users_email}>{item.email}</p>
                                            </div>
                                        </div>))
                                }
                            </div>
                            :
                            <>{inputValue.length > 0 ? <p>Ничего не найдено</p> : <p>начните поиск</p>}</>
                    }
                </div>
            </div>
        </div>
    );
};

