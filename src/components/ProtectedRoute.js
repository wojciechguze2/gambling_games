import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    if (!user || !user.token) {
        return navigate('/login')
    }
};

export default ProtectedRoute; // todo: test this