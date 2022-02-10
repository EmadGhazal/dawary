import { Navbar, Container } from 'react-bootstrap';
import { Image, Menu, MenuButton, Avatar, MenuList ,Text, Button, MenuItem} from '@chakra-ui/react';
import hoverButton from "../assets/hover-button.png";
import defaultButton from "../assets/default-button.png";



function MyNavbar({active, address, onClickLogin, onClickLogout}) {
  return (

    <Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand>Sports' Day NFT</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {active &&
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
             <Text color='white'>{address}</Text>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=> onClickLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
          }
          {!active && <Image src={defaultButton} 
          onMouseOver={(e)=> e.currentTarget.src=hoverButton}
          onMouseOut={(e)=> e.currentTarget.src=defaultButton}
          onClick={()=>onClickLogin()}
          />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar;