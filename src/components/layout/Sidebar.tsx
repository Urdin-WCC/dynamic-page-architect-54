
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={cn("w-full lg:w-72 bg-sidebar border-r border-sidebar-border", className)}>
      <div className="p-6 space-y-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-medium">Sobre Nosotros</h3>
          <p className="text-sm text-muted-foreground">
            Diseñamos experiencias digitales únicas que transmiten la esencia de tu marca y conectan con tu audiencia.
          </p>
          
          {/* Social Icons */}
          <div className="flex flex-wrap gap-2">
            <SocialIconButton icon={<Facebook size={18} />} href="https://facebook.com" />
            <SocialIconButton icon={<Twitter size={18} />} href="https://twitter.com" />
            <SocialIconButton icon={<Instagram size={18} />} href="https://instagram.com" />
            <SocialIconButton icon={<Linkedin size={18} />} href="https://linkedin.com" />
            <SocialIconButton icon={<Globe size={18} />} href="https://urdinart.com" />
          </div>
        </div>
        
        {/* Latest Posts Section */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-medium">Últimas Publicaciones</h3>
          <div className="space-y-3">
            {['Diseño Web Moderno', 'Tendencias UX/UI', 'Optimización SEO'].map((title, i) => (
              <div key={i} className="group">
                <Link to="/blog" className="text-sm hover:text-primary transition-colors">
                  {title}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date().toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Portfolio Highlights */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-medium">Trabajo Destacado</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <Link 
                key={item} 
                to="/portfolio" 
                className="aspect-square bg-secondary rounded-md flex items-center justify-center overflow-hidden group hover:opacity-90 transition-opacity"
              >
                <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Proyecto {item}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

const SocialIconButton = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-white text-muted-foreground hover:text-primary border border-border rounded-md transition-colors"
    >
      {icon}
    </a>
  );
};

export default Sidebar;
