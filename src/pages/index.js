
import React from 'react';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Popover,
  List,
  ListItem,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  
  function handleAuthorize() {
    router.push('/profile');
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
};

  const handleMenuClose = () => {
      setAnchorEl(null);
  };


  return (
    <div style={{ backgroundColor: '#f2f3f5', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
            <List>
                <ListItem button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => router.push('/chart')}
                    >
                        Ver mis estadísticas
                    </Button>
                </ListItem>
            </List>
            </Popover>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            onClick={handleMenuClick}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Tu Desempeño
          </Typography>
          {user &&
            <Button
              color="inherit"
              onClick={handleAuthorize}
            >
              Mis tareas
            </Button>
          }
          {!user ?
            <Button
              href='api/auth/login'
              color="inherit"
            >
              Iniciar sesión
            </Button>
          : 
            <Button
              href='api/auth/logout'
              color="inherit"
            >
              Salir
            </Button>
          } 
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ padding: '4rem 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <img
              src="/graficas.jpg"
              alt="graficas"
              style={{ width: '100%', borderRadius: '1rem' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom style={{fontWeight: 'bold'}}>
              Gestiona tus Tareas
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Con esta aplicacion podras gestionar tus tareas, crearlas, asignarles
              un tiempo, descripcion, eliminarlas y marcarlas como completadas para
              dividir tu seccion entre tareas activas y completadas, ademas, tendras
              disponible un historico de tus progreso de tareas!
            </Typography>
            <img
              src="/agenda.jpg"
              alt="agendas"
              style={{ width: '100%', borderRadius: '1rem' }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
