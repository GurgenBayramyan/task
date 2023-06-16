import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import './ChangeUser.scss'
export default function ChangeUser() {
    const { id } = useParams();
    const { users } = useSelector(state => state);
    const index = users.employees.findIndex(el => el.id == id);
    const person = users.employees[index]
    console.log(person)
    return (
        <div>
            <div class="email-details">
                <p class="label">Name:</p>
                <p class="value name">{person.name}</p>
                
                <p class="label">Surname:</p>
                <p class="value surname">{person.surname}</p>

                <p class="label">Email:</p>
                <p class="value email">{person.email}</p>

                <p class="label">ID:</p>
                <p class="value id">{person.id}</p>

                <p class="label">Position:</p>
                <p class="value position">{person.position}</p>

            </div>

        </div>
    )
}
