"use client";

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {signIn, useSession, signOut} from "next-auth/react";


export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {data: session, status} = useSession();

  const menuItems = [
    {name: "Offers", href: "/offers"},
    {name: "Pricing", href: "/subscription"},
    {name: "Contact", href: "/contact"},
    {name: "Log Out", href: "/logout"},
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/*<AcmeLogo />*/}
          <p className="font-bold text-inherit">Automotive Aggregator</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/offers">
            Offers
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/subscription" aria-current="page">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {!session && status !== "loading" ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="#" onClick={() => signIn(undefined, {callbackUrl: "/dashboard/profile"})}>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="#" onClick={() => signOut({callbackUrl: "/"})}>Logout</Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
