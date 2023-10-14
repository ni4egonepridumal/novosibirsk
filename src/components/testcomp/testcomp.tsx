
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export const Testcomp = () => {
    const url = "https://jsonplaceholder.typicode.com/users/";
    const [myInput, setMyInput] = useState("");
    const [oneUser, setOneUser] = useState([]);
    const [loader, setLoader] = useState(false);
    let endofArr = [];

    const endedFromAxios = (string) => {
        endofArr = string.split(',').map(item => +item % 1 === 0 ? `id=${item}&` : `username=${item}&`)
        return endofArr

        // if (string.split(',').map(item => +item % 1 === 0 ? item : null)) {
        //   endofArr = string.split(',').map(item => `id=${item}&`)
        //   return endofArr
        // } else {
        //   endofArr = string.split(',').map(item => typeof (string) === "string" ? `username=${item}&` : null)
        //   return endofArr
        // }

    }
    const result = useMemo(() => endedFromAxios(myInput), [myInput])
    // console.log("result", result)
    async function getUserOne() {
        try {
            setLoader(true);
            const response = await axios.get(url + "?" + result.join(''));
            setOneUser(response.data);
            setLoader(false);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getUserOne()
    }, [myInput]);

    const addValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMyInput(e.target.value);
    };
    return (
        <div>
            <p>НИже тестовый без редакса</p>
            <input value={myInput} onChange={(e) => addValue(e)} />
            {loader && <div>Загрузка...</div>}
            <div>
                {oneUser &&
                    oneUser?.map((item: any) => (
                        <div key={item.id} onClick={() => console.log(item.username)}>
                            {item.name}
                        </div>
                    ))}
            </div>
        </div>
    );

};

