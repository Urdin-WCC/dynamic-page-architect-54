
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium">Urdin Art</h3>
            <p className="text-sm text-muted-foreground">
              Diseño web moderno y efectivo para empresas y profesionales que buscan destacar en el mundo digital.
            </p>
            <div className="flex space-x-3">
              <SocialIcon icon={<Facebook size={18} />} href="https://facebook.com" />
              <SocialIcon icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialIcon icon={<Instagram size={18} />} href="https://instagram.com" />
              <SocialIcon icon={<Linkedin size={18} />} href="https://linkedin.com" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">Madrid, España</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">+34 123 456 789</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">urdin.art@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Urdin Art. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-muted-foreground hover:text-primary rounded-full transition-colors"
    >
      {icon}
    </a>
  );
};

export default Footer;
