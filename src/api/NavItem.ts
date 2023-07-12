import { get } from "http";
import sidebarNavItems, { navItem } from "../model/Sidebar/SidebarNavItems";

export const getNavItems = async () => {
  let items: navItem[];
  try {
    items = await new Promise<navItem[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(sidebarNavItems);
      }, 1000);
    });
  } catch (error) {
    items = [];
  }
  return items;
};

export const getNavItem = (
  id: string,
  navItems: navItem[] = sidebarNavItems,
) => {
  let navItem: navItem | undefined;
  navItem = navItems.find((item) => item.id === id);
  return navItem;
};

export const getNestedItems = (
  index: number = 0,
  navItem?: navItem,
  ...ids: string[]
) => {
  const items: navItem[] = [];
  let id = ids[index];
  if (!navItem) {
    navItem = getNavItem(id);
    if (navItem) items.push(navItem);
  } else {
    navItem = getNavItem(id, navItem.subNav);
    if (navItem) items.push(navItem);
  }
  if (navItem?.subNav && index < ids.length - 1) {
    const subItem = getNestedItems(index + 1, navItem, ...ids);
    items.push(...subItem);
  }
  return items;
};

export const resetActiveItems = (navItems?: navItem[]) => {
  if (!navItems) navItems = sidebarNavItems;
  navItems.map((navItem) => {
    navItem.isActive = false;
    if (navItem.subNav) {
      resetActiveItems(navItem.subNav);
    }
  });
  return navItems;
};