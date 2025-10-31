import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router';

function navbar() {
  const navigate = useNavigate();

  return (
    <NavigationMenu className="h-15 w-full min-w-screen justify-start bg-gray-200">
      <NavigationMenuList className="ml-10 flex gap-5">
        <NavigationMenuItem
          onClick={() => navigate('/')}
          className="cursor-pointer rounded-lg bg-gray-500 p-2 text-white"
        >
            User Details
        </NavigationMenuItem>
        <NavigationMenuItem
          onClick={() => navigate('/newly-added')}
          className="cursor-pointer rounded-lg bg-gray-500 p-2 text-white"
        >
            Add Users
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default navbar;
