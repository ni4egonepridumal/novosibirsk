import React from 'react';
import { useAppSelector } from '../../redux/store/hooks';

export const ChoiseUser = () => {
    const { oneUser, test } = useAppSelector(state => state.users)
    return (
        <div>
            {/* <p>{oneUser.name}</p> */}
            {test.map(item => <p>{item.name}</p>)}
        </div>
    );
};

