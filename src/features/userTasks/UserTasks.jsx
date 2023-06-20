import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployTask } from '../employees/employeesSlice';


export default function UserTasks({ index, modalTask, setModalTask, bool }) {
    console.log(index)
    const { users } = useSelector(state => state)
    const { modal } = users
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmployTask(index))

    }, [])

    return (
        bool ? <div>
            <div className={modalTask ? "modal isActive" : "modal"} onClick={() => setModalTask(!modalTask)}>
                <div className="modal_contnent" onClick={(e) => e.stopPropagation()}>
                <p>tasks</p>
                <pre>{JSON.stringify(modal, undefined, 3)}</pre>
                </div>

            </div>
        </div> : <div> <p>tasks</p>
            <pre>{JSON.stringify(modal, undefined, 3)}</pre></div>
    )
}
