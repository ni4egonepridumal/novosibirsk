import { useEffect, useMemo } from "react";
import axios from "axios";
import { Users } from "./components/users";
// import { Testcomp } from "./components/testcomp";
import { useAppDispatch, useAppSelector } from "./redux/store/hooks";
import { getFilteredUsers } from "./redux/slices/userSlices";
import styles from "./App.module.scss";
import { ChoiseUser } from "./components/choiseUser";

function App() {
  const url = "https://jsonplaceholder.typicode.com/users/";
  const dispatch = useAppDispatch();
  const { choiseUsers, isLoading, inputValue } = useAppSelector(state => state.users)

  let endOfEndpoint = [];

  const endedFromAxios = (string: string) => {
    endOfEndpoint = string.split(',').map(item => +item % 1 === 0 ? `id=${item}&` : `username=${item}&`)
    return endOfEndpoint
  }

  const result = useMemo(() => endedFromAxios(inputValue), [inputValue])

  async function filteredUser() {
    try {
      const response = await axios.get(url + "?" + result.join(''))
      dispatch(getFilteredUsers(response.data))
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    filteredUser()
  }, [inputValue]);
  return (
    <div className={styles.appContainer}>
      <div className={styles.appContainer_inner}>
        <div className={styles.appContainer_header}>
          <h3>Жилфонд</h3>
          <p>Пользователи</p>
        </div>
        <div className={styles.appContainer_content}>
          {/* <Testcomp /> */}
          <div className={styles.userCart}>
            <Users allUsers={choiseUsers} loader={isLoading} />
          </div>
          <div ><ChoiseUser /></div>
        </div>
      </div>
    </div>
  );
}

export default App;





