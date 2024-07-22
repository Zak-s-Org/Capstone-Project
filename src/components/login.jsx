import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const style = {
    backgroundColor : "black"
}

const welcome = {
    color: "#a1a1aa"
}

export default function Login (){
    return (
        <div className="login" style={style}>
            <div className="welcome">
            <h1 style={welcome}>welcome</h1>
            <HomeIcon sx={{ color: pink[500] , width:"100px" , height:"100px" }} />
            </div>
            <hr></hr>    
      </div>
    )
}