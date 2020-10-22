import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import StudentService from '../api/StudentService'

const useFetchStudents = () => {
    const [students, setStudents] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        //encadenamiento de promesas
        StudentService.fetchStudents().then((response) => {
            setStudents(response)
        })
        .catch((error) => {
            toast.error(error)
        })
        
        setLoading(false)
    }, [])

    return [students, loading]
}

export default useFetchStudents
