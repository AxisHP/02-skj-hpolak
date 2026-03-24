import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="border-top footer text-muted">
        <div className="container">
          &copy; 2026 - heinrich_polak_4D_aspnet_2 - <Link to="/privacy" className="text-decoration-none">Privacy</Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;