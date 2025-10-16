import beachImage from '../assets/beach.jpg';
import '../assets/style.css';
export function PostCard( {title,description} ){

    const cardStyle ={
        width: '80%',
        backgroundColor: 'lightblue',
        padding: '16px',
        boderRadius: '8px',
        textAlign: 'center',
        margin: '0 auto',
        boxShadow: '0 2px 8px black'
        }

    return(
    <div className='card'style={cardStyle}>
        <img className='card-image' src={beachImage} alt='Beach' title='Beach' />
        <h2>{title}</h2>
        <p>{description}</p>        
    </div>
)
}