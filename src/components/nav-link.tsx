import { Link, type LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      className="flex items-center gap-1.5 font-medium text-muted-foreground text-sm hover:text-foreground data-[current=true]:text-foreground"
      data-current={pathname === props.to}
      {...props}
    />
  )
}
