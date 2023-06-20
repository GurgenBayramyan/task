import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import './ChangeUser.scss'
import {getEmployee} from "../employees/employeesSlice";

export default function ChangeUser() {
    const {id} = useParams();
    const {person} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployee(id))
    }, [])

    return (
        <div>
            <div className="email-details">
                <p className="label">Name:</p>
                <p className="value name">{person.name}</p>

                <p className="label">Surname:</p>
                <p className="value surname">{person.surname}</p>

                <p className="label">Email:</p>
                <p className="value email">{person.email}</p>

                <p className="label">ID:</p>
                <p className="value id">{person.id}</p>

                <p className="label">Position:</p>
                <p className="value position">{person.position}</p>

            </div>

        </div>
    )
}
