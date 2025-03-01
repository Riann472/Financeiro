import { Link } from 'react-router-dom';
import sadFace from '../../assets/sad_face.svg';

const NotFound = () => {
    return (
        <div className='notFound'>
            <img src={sadFace} alt="Sad Face Image" />
            <h1>Não foi possivel encontrar essa página, volte para pagina principal</h1>
            {sessionStorage.getItem('token') ? (
                <Link to="/home">Inicio</Link>
            ) : (
                <Link to="/">Login</Link>
            )}
        </div>
    );
}

export default NotFound;