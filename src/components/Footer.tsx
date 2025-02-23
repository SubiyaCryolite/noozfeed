export const Footer: React.FC = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content min-h-20 p-4">
      <aside>
        <p>NoozFeed. Copyright © {new Date().getFullYear()} - Ifunga Ndana</p>
      </aside>
    </footer>
  );
};

export default Footer;
