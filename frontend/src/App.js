import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  Landmark, 
  Link as LinkIcon, 
  Settings, 
  Webhook, 
  Shield, 
  Code,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SettlementAccounts from './pages/SettlementAccounts';
import ComingSoon from './pages/ComingSoon';
import SettingsLayout from './pages/SettingsLayout';

function Sidebar() {
  const location = useLocation();
  const [settingsExpanded, setSettingsExpanded] = useState(
    location.pathname.startsWith('/settings')
  );

  const isActive = (path) => location.pathname === path;
  const isSettingsActive = location.pathname.startsWith('/settings');

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">VS</div>
        <div className="logo-text">VitalSwap</div>
      </div>

      <div className="menu-container">
        <div className="menu-section">
          <div className="menu-label">Main Menu</div>
          
          <Link to="/dashboard" className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          
          <Link to="/transactions" className={`menu-item ${isActive('/transactions') ? 'active' : ''}`}>
            <CreditCard size={20} />
            <span>Transactions</span>
          </Link>
          
          <Link to="/accounts" className={`menu-item ${isActive('/accounts') ? 'active' : ''}`}>
            <Landmark size={20} />
            <span>Accounts</span>
          </Link>
          
          <Link to="/payment-link" className={`menu-item ${isActive('/payment-link') ? 'active' : ''}`}>
            <LinkIcon size={20} />
            <span>Payment Link</span>
          </Link>
        </div>

        <div className="menu-section">
          <div className="menu-label">Configuration</div>
          
          <div className="menu-item-wrapper">
            <div 
              className={`menu-item ${isSettingsActive ? 'active' : ''}`}
              onClick={() => setSettingsExpanded(!settingsExpanded)}
            >
              <Settings size={20} />
              <span>Settings</span>
              {settingsExpanded ? (
                <ChevronDown size={16} className="menu-chevron" />
              ) : (
                <ChevronRight size={16} className="menu-chevron" />
              )}
            </div>
            
            {settingsExpanded && (
              <div className="submenu">
                <Link 
                  to="/settings/general" 
                  className={`submenu-item ${isActive('/settings/general') ? 'active' : ''}`}
                >
                  General
                </Link>
                <Link 
                  to="/settings/profile-team" 
                  className={`submenu-item ${isActive('/settings/profile-team') ? 'active' : ''}`}
                >
                  Profile & Team
                </Link>
                <Link 
                  to="/settings/settlement-accounts" 
                  className={`submenu-item ${isActive('/settings/settlement-accounts') ? 'active' : ''}`}
                >
                  Settlement Accounts
                </Link>
                <Link 
                  to="/settings/security" 
                  className={`submenu-item ${isActive('/settings/security') ? 'active' : ''}`}
                >
                  Security
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/webhooks" className={`menu-item ${isActive('/webhooks') ? 'active' : ''}`}>
            <Webhook size={20} />
            <span>Webhooks</span>
          </Link>
          
          <Link to="/due-diligence" className={`menu-item ${isActive('/due-diligence') ? 'active' : ''}`}>
            <Shield size={20} />
            <span>Due Diligence</span>
          </Link>
          
          <Link to="/api-docs" className={`menu-item ${isActive('/api-docs') ? 'active' : ''}`}>
            <Code size={20} />
            <span>API Docs</span>
          </Link>
        </div>
      </div>

      <div className="logout-section">
        <button className="logout-btn" onClick={() => alert('Logout functionality')}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function Header({ darkMode, switchToDarkMode }) {
  const location = useLocation();
  
  const getBreadcrumb = () => {
    const path = location.pathname;
    
    if (path === '/' || path === '/settings/settlement-accounts') {
      return { parent: 'Settings', current: 'Settlement Accounts' };
    }
    if (path === '/dashboard') return { parent: null, current: 'Dashboard' };
    if (path === '/transactions') return { parent: null, current: 'Transactions' };
    if (path === '/accounts') return { parent: null, current: 'Accounts' };
    if (path === '/payment-link') return { parent: null, current: 'Payment Link' };
    if (path === '/webhooks') return { parent: null, current: 'Webhooks' };
    if (path === '/due-diligence') return { parent: null, current: 'Due Diligence' };
    if (path === '/api-docs') return { parent: null, current: 'API Docs' };
    if (path === '/settings/general') return { parent: 'Settings', current: 'General' };
    if (path === '/settings/profile-team') return { parent: 'Settings', current: 'Profile & Team' };
    if (path === '/settings/security') return { parent: 'Settings', current: 'Security' };
    
    return { parent: 'Settings', current: 'Settlement Accounts' };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="header">
      <div className="breadcrumb">
        {breadcrumb.parent && (
          <>
            <span>{breadcrumb.parent}</span>
            <span className="breadcrumb-separator">›</span>
          </>
        )}
        <span className="breadcrumb-current">{breadcrumb.current}</span>
      </div>
      <div className="header-right">
        <div className="status-badge">
          <div className="status-dot"></div>
          ACTIVE
        </div>
        <button className="theme-toggle" onClick={switchToDarkMode}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">Akinsola Jegede</div>
            <div className="user-role">Admin</div>
          </div>
          <div className="user-avatar">AJ</div>
        </div>
      </div>
    </header>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const switchToDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <Router>
      <div className="app">
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
        />
        <Sidebar />
        <main className="main-content">
          <Header darkMode={darkMode} switchToDarkMode={switchToDarkMode} />
          <Routes>
            <Route path="/" element={<SettlementAccounts />} />
            <Route path="/dashboard" element={<ComingSoon title="Dashboard" />} />
            <Route path="/transactions" element={<ComingSoon title="Transactions" />} />
            <Route path="/accounts" element={<ComingSoon title="Accounts" />} />
            <Route path="/payment-link" element={<ComingSoon title="Payment Link" />} />
            <Route path="/settings" element={<SettingsLayout />}>
              <Route path="general" element={<ComingSoon title="General Settings" />} />
              <Route path="profile-team" element={<ComingSoon title="Profile & Team" />} />
              <Route path="settlement-accounts" element={<SettlementAccounts />} />
              <Route path="security" element={<ComingSoon title="Security Settings" />} />
            </Route>
            <Route path="/webhooks" element={<ComingSoon title="Webhooks" />} />
            <Route path="/due-diligence" element={<ComingSoon title="Due Diligence" />} />
            <Route path="/api-docs" element={<ComingSoon title="API Documentation" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;