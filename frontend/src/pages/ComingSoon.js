import React from 'react';
import { Construction } from 'lucide-react';

function ComingSoon({ title }) {
  return (
    <div className="page-content">
      <div className="coming-soon-container">
        <div className="coming-soon-icon">
          <Construction size={64} />
        </div>
        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-description">
          This feature is under development and will be available soon.
        </p>
        <div className="coming-soon-info">
          <p>In a full application, this page would contain:</p>
          <ul>
            <li>Relevant data and statistics</li>
            <li>Interactive components and forms</li>
            <li>Real-time updates and notifications</li>
            <li>Integration with backend services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
