'use client';

import Link from "next/link";
import { useLayoutEffect, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LOADING_STATES, NavigationContext } from "@/context/NavigationContext";

type NavigateProps = {
  href: string;
  children: React.ReactNode;
  disabled? : boolean;
};

export default function Navigate({ href, children, disabled }: NavigateProps) {
  const { goToRoute, setLoading } = useContext(NavigationContext)
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.getAll('page');
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToRoute(href);
  };

  useLayoutEffect(() => {
    setLoading(LOADING_STATES.LOADED);
  }, [pathname, query, setLoading]);


  return (
    <Link href={href} prefetch passHref legacyBehavior>
      <a onClick={handleClick}  className = {disabled ? 'pointer-events-none' : ""} >{children}</a>
    </Link>
  );
}
