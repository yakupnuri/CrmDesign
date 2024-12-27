import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const LogoImage = styled('img')({
  height: 50,
  marginRight: 16,
});

const StyledToolbar = styled(Toolbar)({
  background: '#ffffff',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <StyledToolbar>
        <Box display="flex" alignItems="center" flex={1}>
          <LogoImage src="/egao-logo.png" alt="Egao Lab Logo" />
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
