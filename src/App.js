import React,{useState} from 'react';
import logo from './logo.svg';
import {ReactComponent as BellIcon} from './icons/bell.svg';
import {ReactComponent as  CaretSideIcon} from './icons/caret_up.svg';
import {ReactComponent as  MailIcon} from './icons/mail.svg';
import {ReactComponent as PlusIcon} from './icons/plus.svg';
import {ReactComponent as  CaretDownIcon} from './icons/down-arrow.svg';
import {ReactComponent as SettingsIcon} from './icons/settings.svg';
import {ReactComponent as ProfileIcon} from './icons/person.svg';

import {CSSTransition} from 'react-transition-group';

import './App.css';

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon/>}/>
      <NavItem icon={<MailIcon/>}/>
      <NavItem icon={<BellIcon/>}/>
      

      <NavItem icon={<CaretSideIcon/>}>
{/* Drop down logic */}
<DropdownMenu/>


      </NavItem>

    </Navbar>
  );
}

function Navbar(props){
  return(
<nav className="navbar">
  <ul className="navbar-nav">
{props.children}
  </ul>
</nav>
  );
}

function NavItem(props){
const [open,setOpen] =useState(false);

  return(
<li className="nav-item">
  <a href="#" className="icon-button" onClick={()=>setOpen(!open)}>
  {props.icon}
  </a>
{open && props.children}

</li>
  );
}


function DropdownMenu(){
  const [activeMenu,setActiveMenu] = useState('main');
  const [menuHeight,setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height =el.offsetHeight;
    setMenuHeight(height);
    
  }


  function DropdownItem(props) {
    return(
<a href="#" className="menu-item" onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}>
  <span className="icon-button">{props.leftIcon}</span>

{props.children}

<span className="icon-right">{props.rightIcon}</span>
</a>
    );


  }
  return(
<div className="dropdown" style={{height: menuHeight}}>
  <CSSTransition in={activeMenu==='main'} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>

    <div className="menu">

<DropdownItem  leftIcon={<ProfileIcon/>}>
    My Profile
</DropdownItem>
<DropdownItem leftIcon={<SettingsIcon/>} rightIcon={<CaretDownIcon/>} goToMenu="settings">
  Settings
  
</DropdownItem>
</div>
</CSSTransition>

<CSSTransition in={activeMenu==='settings'} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>

    <div className="menu">
<DropdownItem  leftIcon={<MailIcon/>} goToMenu="main"/>
<DropdownItem>General Settings</DropdownItem>
<DropdownItem>Video Settings</DropdownItem>
<DropdownItem>Audio Settings</DropdownItem>
<DropdownItem>Personal Settings</DropdownItem>
<DropdownItem>Display Settings</DropdownItem>

</div>
</CSSTransition>
</div>
  );
}


export default App;
