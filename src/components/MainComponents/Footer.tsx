import { useNavigation } from '../../contexts/NavigationContext';

const Footer = () => {
  const { setCurrentPage } = useNavigation();

  return (
    <>
      <footer className="border-top footer text-muted">
        <div className="container">
          &copy; 2026 - heinrich_polak_4D_aspnet_2 - <a onClick={() => setCurrentPage('/privacy')} className="text-decoration-none">Privacy</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;