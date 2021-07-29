import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

const getToken = (await import('auth/GetToken')).default;
const logOut = (await import('auth/LogOut')).default;

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function get() {
      const token = await getToken();
      if (token) {
        setUser(token.user);
        setLoading(false);
      }
    }
    get();
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logOut();

    Router.push('/login');
  };

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <Navbar color="secondary navbar-dark p-4" light expand="md">
          <NavbarBrand href="#">Midway</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="#">Serviços</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Páginas</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText style={{ marginLeft: 'auto' }}>
              <div
                onClick={handleLogout}
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                Sair
              </div>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>

      <div>
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <p>Nome: {user?.name}</p>
            <p>E-mail: {user?.email}</p>
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = await getToken(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
