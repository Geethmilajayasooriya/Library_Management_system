import React from 'react';

function Footer(){
  return (
    <footer style={{background:'#0f172a',color:'#fff',padding:'18px 0',marginTop:30}}>
      <div className="container-main d-flex justify-content-between align-items-center">
        <div>© {new Date().getFullYear()} Library Management System</div>
        <div className="text-muted" style={{opacity:0.8}}>Built with React & Bootstrap</div>
      </div>
    </footer>
  );
}

export default Footer;