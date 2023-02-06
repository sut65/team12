
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import background from "./image/R.jpg";

function Home() {
  return (
    <div style={{ backgroundImage: `url(${background})`  ,height: 800, width: "100%", marginTop: "50px" }}>
      
    <Container maxWidth="md">

    <Typography variant="h1" gutterBottom>
        Welcome to The Inpatienting 
      </Typography>
      <Typography variant="h3" gutterBottom>
        we healing the World
      </Typography>
    </Container>
    
    </div>
  )
}

    
export default Home