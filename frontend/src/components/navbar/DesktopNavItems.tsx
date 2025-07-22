const navItems = [
  { name: "Home", slug: "" },
  { name: "Productos", slug: "productos" },
  { name: "Contacto", slug: "contacto" },
];

export default function DesktopNavItems() {
  return (
    <ul className="hidden lg:flex items-center gap-6 md:gap-8 py-3">
      {navItems.map((item) => (
        <li key={item.slug}>
          <a
            href={`/${item.slug}`}
            className="hover:text-primary-700 dark:hover:text-primary-500"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
