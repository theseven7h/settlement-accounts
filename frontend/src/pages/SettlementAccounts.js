import React, { useState, useEffect } from 'react';
import { 
  Info,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Landmark,
  Globe
} from 'lucide-react';
import { toast } from 'react-toastify';

function SettlementAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3001/api/accounts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setAccounts(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch accounts');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
  try {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch (error) {
    toast.error("Failed to copy!");
  }
};


  return (
    <div className="page-content">
      <div className="header-actions">
        <div className="page-header">
          <h1 className="page-title">Settlement Accounts</h1>
          <p className="page-description">
            Manage the bank accounts where your settlements are paid out.
          </p>
        </div>
        <button className="add-account-btn">
          <Plus size={20} />
          Add New Account
        </button>
      </div>

      {/* Info Box */}
      <div className="info-box">
        <div className="info-icon">
          <Info size={20} />
        </div>
        <div className="info-content">
          <h3>About Settlement Accounts</h3>
          <p>
            Settlement accounts are external bank accounts where you receive payouts from your wallet. 
            Ensure the account name matches your registered business name to avoid delays. Changes to 
            settlement accounts may require additional verification.
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading accounts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container">
          <h3 className="error-title">Error Loading Accounts</h3>
          <p className="error-message">{error}</p>
          <button onClick={fetchAccounts} style={{marginTop: '12px', padding: '8px 16px', cursor: 'pointer'}}>
            Retry
          </button>
        </div>
      )}

      {/* Accounts Display */}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
          <div className="accounts-section">
            <h2 className="section-title">Your Linked Accounts</h2>
            <div className="accounts-grid">
              {accounts.map((account) => (
                <div key={account.id} className="account-card">
                  <div className="account-icon">
                    {account.icon === 'globe' ? <Globe size={24} /> : <Landmark size={24} />}
                  </div>
                  <div className="account-details">
                    <div className="account-header">
                      <h3 className="account-bank">{account.bankName}</h3>
                      {account.isPrimary && (
                        <span className="primary-badge">PRIMARY</span>
                      )}
                    </div>
                    <p className="account-holder">{account.accountHolder}</p>
                    <div className="account-number">
                      {account.accountNumber}
                      <button 
                        className="copy-btn" 
                        onClick={() => copyToClipboard(account.accountNumber)}
                        title="Copy account number"
                      >
                        <Copy size={16} />
                      </button>
                      {account.currency === 'USD' && (
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#6b7280', 
                          fontWeight: '500',
                          marginLeft: '4px'
                        }}>
                          USD
                        </span>
                      )}
                    </div>
                    <div className="account-meta">
                      <div className="verified-status">
                        <div className="verified-dot"></div>
                        Verified
                      </div>
                      <span className="settlement-type">{account.settlementType}</span>
                    </div>
                  </div>
                  <div className="account-actions">
                    {!account.isPrimary && (
                      <button className="set-primary-btn">Set as Primary</button>
                    )}
                    <button className="icon-btn">
                      <Edit2 size={18} />
                    </button>
                    <button className="icon-btn delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Card */}
          <div className="help-card">
            <h3 className="help-title">Need help?</h3>
            <p className="help-description">
              Having trouble adding an account or receiving settlements?
            </p>
            <button className="contact-support-btn">Contact Support</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettlementAccounts;
