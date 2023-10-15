
import { useAppSelector } from '../../redux/store/hooks';
import styles from "./choiseUser.module.scss"

export const ChoiseUser = () => {
    const { oneUser } = useAppSelector(state => state.users)
    return (
        <div className={styles.container}>
            {oneUser.name ?
                <div className={styles.user}>
                    <div>
                        <img src='./bigImg.svg' />
                    </div>
                    <div>
                        <p>{oneUser.name}</p>
                        <p><span>email</span>{oneUser.email}</p>
                        <p><span>phone</span>{oneUser.phone}</p>
                        <p>О себе</p>
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est
                            laborum.</p>
                    </div>

                </div>
                :
                <p className={styles.container_text}>Выберите сотрудника чтобы посмотреть его профиль</p>
            }
        </div >
    );
};

